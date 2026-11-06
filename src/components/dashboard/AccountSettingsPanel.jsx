"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell, Shield, Trash2, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, Card, EmptyState, Input, Label, Skeleton, Switch } from "@/components/ui";
import PasswordInput from "@/components/shared/PasswordInput";
import PageHeader from "@/components/shared/PageHeader";
import BotSaveBar from "./BotSaveBar";

const sections = [
  { key: "profile", label: "Profile", icon: UserRound },
  { key: "security", label: "Security", icon: Shield },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "danger", label: "Danger zone", icon: Trash2 },
];
const preferences = [
  {
    key: "newLead",
    label: "New lead captured",
    description: "Email me when your bot captures a lead.",
  },
  { key: "usageWarning", label: "Plan limit", description: "Email me when usage reaches 80%." },
  {
    key: "weeklySummary",
    label: "Weekly summary",
    description: "A short recap of conversations and leads.",
  },
];
const emptyPasswords = { currentPassword: "", newPassword: "", confirmPassword: "" };
const initials = (name) =>
  (name || "")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
const editable = (data) => ({
  name: data?.name || "",
  email: data?.email || "",
  notifications: data?.notifications || {},
});

function passwordStrength(value) {
  const variety = [/[a-z]/, /[A-Z]/, /\d/, /[^a-zA-Z0-9]/].filter((pattern) =>
    pattern.test(value),
  ).length;
  if (value.length >= 12 && variety >= 3) return { label: "Strong", bars: 3, color: "bg-success" };
  if (value.length >= 8 && variety >= 3) return { label: "OK", bars: 2, color: "bg-primary" };
  return { label: "Weak", bars: 1, color: "bg-warning" };
}

export default function AccountSettingsPanel({
  account,
  planName,
  planLoading,
  loading,
  error,
  onRetry,
  onSave,
  onPassword,
}) {
  const [active, setActive] = useState("profile");
  const [draft, setDraft] = useState(null);
  const [passwords, setPasswords] = useState(emptyPasswords);
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    const syncHash = () => {
      const key = window.location.hash.slice(1);
      setActive(sections.some((section) => section.key === key) ? key : "profile");
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
    };
  }, []);

  const data = draft || account;
  const dirty = Boolean(
    draft && JSON.stringify(editable(draft)) !== JSON.stringify(editable(account)),
  );
  const editableSection = active === "profile" || active === "notifications";
  const passwordValid = Boolean(
    passwords.currentPassword &&
    passwords.newPassword.length >= 8 &&
    passwords.newPassword.length <= 255 &&
    /[a-z]/.test(passwords.newPassword) &&
    /[A-Z]/.test(passwords.newPassword) &&
    /\d/.test(passwords.newPassword) &&
    passwords.newPassword !== passwords.currentPassword &&
    passwords.newPassword === passwords.confirmPassword,
  );
  const strength = passwordStrength(passwords.newPassword);
  const profileValid = Boolean(
    data?.name?.trim() &&
    data.name.length <= 80 &&
    data.email?.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email),
  );
  const joined = account?.createdAt || account?.created_at;
  const memberSince =
    joined && !Number.isNaN(new Date(joined).getTime())
      ? new Date(joined).toLocaleDateString(undefined, { month: "long", year: "numeric" })
      : null;

  const update = (patch) => {
    setDraft((current) => ({ ...(current || account), ...patch }));
    setSaveError("");
  };
  const save = async () => {
    if (!dirty || !profileValid || saving) return;
    setSaving(true);
    setSaveError("");
    try {
      const saved = await onSave(editable(data));
      setDraft(saved);
      toast.success("Settings saved.");
    } catch (requestError) {
      setSaveError(requestError.message || "Could not save your settings.");
    } finally {
      setSaving(false);
    }
  };
  const submitPassword = async (event) => {
    event.preventDefault();
    if (!passwordValid || passwordSaving) return;
    setPasswordErrors({});
    setPasswordSuccess("");
    setPasswordSaving(true);
    try {
      await onPassword(passwords);
      setPasswords(emptyPasswords);
      setPasswordSuccess("Password updated successfully.");
    } catch (requestError) {
      const errors = requestError.errors || {};
      setPasswordErrors({
        currentPassword: errors.current_password?.[0],
        newPassword: errors.password?.[0],
        confirmPassword: errors.password_confirmation?.[0],
        form: requestError.message || "Could not update password.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };

  return (
    <div className={`space-y-6 ${editableSection ? "pb-24" : ""}`}>
      <PageHeader
        title="Settings"
        description="Manage your account and notification preferences."
      />
      {loading ? (
        <div
          className="grid gap-6 md:grid-cols-[12rem_minmax(0,1fr)]"
          aria-label="Loading account settings"
        >
          <Skeleton className="h-12 md:h-52" />
          <Skeleton className="h-96" />
        </div>
      ) : error ? (
        <Card>
          <p role="alert" className="text-destructive">
            {error}
          </p>
          <Button className="mt-4" onClick={onRetry}>
            Retry
          </Button>
        </Card>
      ) : !data ? (
        <EmptyState title="Account unavailable" body="Please retry loading your account." />
      ) : (
        <div className="grid min-w-0 gap-6 md:grid-cols-[12rem_minmax(0,1fr)]">
          <nav
            aria-label="Settings sections"
            className="flex min-w-0 gap-2 overflow-x-auto pb-2 md:flex-col md:self-start md:overflow-visible md:pb-0"
          >
            {sections.map(({ key, label, icon: Icon }) => (
              <a
                key={key}
                href={`#${key}`}
                aria-current={active === key ? "page" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  window.history.pushState(null, "", `#${key}`);
                  setActive(key);
                }}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:rounded-lg ${active === key ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>
          <div className="min-w-0">
            {active === "profile" && (
              <section aria-label="Profile" className="space-y-4">
                <Card title="Profile" subtitle="Your personal details and account email.">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <Avatar className="size-20">
                        <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                          {initials(data.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="break-words font-semibold">{data.name}</p>
                        {memberSince && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            Member since {memberSince}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="account-name">Name</Label>
                        <Input
                          id="account-name"
                          autoComplete="name"
                          maxLength={80}
                          value={data.name}
                          disabled={saving}
                          onChange={(event) => update({ name: event.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="account-email">Email</Label>
                        <Input
                          id="account-email"
                          type="email"
                          autoComplete="email"
                          maxLength={254}
                          value={data.email}
                          disabled={saving}
                          aria-describedby="email-help"
                          onChange={(event) => update({ email: event.target.value })}
                        />
                        <p
                          id="email-help"
                          className="text-xs leading-relaxed text-muted-foreground"
                        >
                          We will send a verification link to the new address.
                        </p>
                      </div>
                    </div>
                    <div className="flex min-h-10 flex-wrap items-center justify-between gap-3 border-t pt-5">
                      {planLoading ? (
                        <Skeleton className="h-5 w-28" />
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          {planName ? (
                            <>
                              Plan: <span className="font-medium text-foreground">{planName}</span>
                            </>
                          ) : (
                            "Plan details unavailable"
                          )}
                        </p>
                      )}
                      <Link
                        href="/dashboard/billing"
                        className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Manage plan
                      </Link>
                    </div>
                  </div>
                </Card>
              </section>
            )}
            {active === "security" && (
              <section aria-label="Security">
                <Card title="Password" subtitle="Keep your account secure with a unique password.">
                  <form className="max-w-lg space-y-5" onSubmit={submitPassword}>
                    {["currentPassword", "newPassword", "confirmPassword"].map((key) => (
                      <div key={key} className="space-y-2">
                        <Label htmlFor={key}>
                          {key === "currentPassword"
                            ? "Current password"
                            : key === "newPassword"
                              ? "New password"
                              : "Confirm new password"}
                        </Label>
                        <PasswordInput
                          id={key}
                          autoComplete={
                            key === "currentPassword" ? "current-password" : "new-password"
                          }
                          value={passwords[key]}
                          disabled={passwordSaving}
                          maxLength={key === "currentPassword" ? undefined : 255}
                          aria-invalid={Boolean(passwordErrors[key])}
                          aria-describedby={
                            passwordErrors[key]
                              ? `${key}-error`
                              : key === "newPassword"
                                ? "password-hint"
                                : undefined
                          }
                          onChange={(event) => {
                            setPasswords((current) => ({ ...current, [key]: event.target.value }));
                            setPasswordErrors({});
                            setPasswordSuccess("");
                          }}
                        />
                        {passwordErrors[key] && (
                          <p id={`${key}-error`} className="text-sm text-destructive" role="alert">
                            {passwordErrors[key]}
                          </p>
                        )}
                        {key === "newPassword" && (
                          <>
                            <p id="password-hint" className="text-xs text-muted-foreground">
                              At least 8 characters, with uppercase and lowercase letters and a
                              number. Use a different password from your current one.
                            </p>
                            <div className="min-h-6" aria-live="polite">
                              {passwords.newPassword && (
                                <div className="flex items-center gap-3">
                                  <div className="flex w-24 gap-1" aria-hidden="true">
                                    {[1, 2, 3].map((bar) => (
                                      <span
                                        key={bar}
                                        className={`h-1 flex-1 rounded-full ${bar <= strength.bars ? strength.color : "bg-muted"}`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {strength.label}
                                  </span>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                        {key === "confirmPassword" &&
                          passwords.confirmPassword &&
                          passwords.newPassword !== passwords.confirmPassword && (
                            <p className="text-xs text-destructive">New passwords do not match.</p>
                          )}
                      </div>
                    ))}
                    {passwordErrors.form && (
                      <p role="alert" className="text-sm text-destructive">
                        {passwordErrors.form}
                      </p>
                    )}
                    {passwordSuccess && (
                      <p role="status" className="text-sm text-success-foreground">
                        {passwordSuccess}
                      </p>
                    )}
                    <Button type="submit" disabled={!passwordValid || passwordSaving}>
                      {passwordSaving ? "Updating…" : "Update password"}
                    </Button>
                  </form>
                </Card>
              </section>
            )}
            {active === "notifications" && (
              <section aria-label="Notifications" className="space-y-4">
                <Card title="Email notifications" subtitle="Choose which updates you receive.">
                  <div className="divide-y divide-border">
                    {preferences.map(({ key, label, description }) => (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-4 py-5 first:pt-0 last:pb-0"
                      >
                        <div>
                          <Label htmlFor={`notification-${key}`}>{label}</Label>
                          <p
                            id={`notification-${key}-help`}
                            className="mt-1 text-sm text-muted-foreground"
                          >
                            {description}
                          </p>
                        </div>
                        <Switch
                          id={`notification-${key}`}
                          aria-label={label}
                          aria-describedby={`notification-${key}-help`}
                          checked={Boolean(data.notifications?.[key])}
                          disabled={saving}
                          onChange={(value) =>
                            update({ notifications: { ...data.notifications, [key]: value } })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </Card>
                <p className="text-sm text-muted-foreground">
                  Per-bot recipients are set in each bot&apos;s Settings.{" "}
                  <Link
                    href="/dashboard/bots"
                    className="font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Open Bots
                  </Link>
                </p>
              </section>
            )}
            {active === "danger" && (
              <section aria-label="Danger zone">
                <Card title="Danger zone">
                  <div className="space-y-4 rounded-xl border border-destructive/30 p-5">
                    <h2 className="text-base font-semibold">Delete account</h2>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Deleting your account cancels your subscription and permanently removes your
                      bots, conversations and leads.
                    </p>
                    <Button variant="destructive" disabled>
                      Delete account
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      <a
                        href="mailto:support@tellvira.com"
                        className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        Contact support to delete your account.
                      </a>
                    </p>
                  </div>
                </Card>
              </section>
            )}
            {saveError && editableSection && (
              <p role="alert" className="mt-4 text-sm text-destructive">
                {saveError}
              </p>
            )}
          </div>
        </div>
      )}
      {editableSection && data && !loading && !error && (
        <BotSaveBar
          dirty={dirty}
          saving={saving}
          invalid={!profileValid}
          onDiscard={() => {
            setDraft(null);
            setSaveError("");
          }}
          onSave={save}
        />
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import PasswordInput from "@/components/shared/PasswordInput";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, Card, EmptyState, Input, Label, Skeleton, Switch } from "@/components/ui";
import PageHeader from "@/components/shared/PageHeader";

const initials = (name) =>
  (name || "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function AccountSettingsPanel({
  account,
  loading,
  error,
  onRetry,
  onSave,
  onPassword,
}) {
  const [draft, setDraft] = useState(null);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [saving, setSaving] = useState(false);
  const data = draft || account;
  const dirty = useMemo(
    () => Boolean(draft && JSON.stringify(draft) !== JSON.stringify(account)),
    [draft, account],
  );
  if (loading) return <Skeleton className="h-96 rounded-xl" />;
  if (error)
    return (
      <Card>
        <p className="text-destructive">{error}</p>
        <Button className="mt-4" onClick={onRetry}>
          Retry
        </Button>
      </Card>
    );
  if (!data || typeof data.name !== "string")
    return <EmptyState title="Account unavailable" body="Please retry loading your account." />;
  const update = (patch) => setDraft((current) => ({ ...(current || account), ...patch }));
  const save = async () => {
    setSaving(true);
    try {
      const saved = await onSave(draft || account);
      setDraft(saved);
      toast.success("Profile saved.");
    } catch (nextError) {
      toast.error(nextError.message || "Could not save your profile.");
    } finally {
      setSaving(false);
    }
  };
  const submitPassword = async (event) => {
    event.preventDefault();
    setPasswordErrors({});
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordErrors({ confirmPassword: "New passwords do not match." });
      return;
    }
    setPasswordSaving(true);
    try {
      const response = await onPassword(passwords);
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success(response?.message || "Password updated.");
    } catch (nextError) {
      const errors = nextError?.errors || {};
      setPasswordErrors({
        currentPassword: errors.current_password?.[0],
        newPassword: errors.password?.[0],
        confirmPassword: errors.password_confirmation?.[0],
        form: Object.keys(errors).length ? "" : nextError.message || "Could not update password.",
      });
    } finally {
      setPasswordSaving(false);
    }
  };
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account and notification preferences."
      />
      <nav
        className="flex gap-2 overflow-x-auto border-b border-border pb-3"
        aria-label="Settings sections"
      >
        {["Profile", "Security", "Notifications"].map((item) => (
          <a
            key={item}
            href={"#" + item.toLowerCase().replace(" ", "-")}
            className="shrink-0 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {item}
          </a>
        ))}
      </nav>
      <section id="profile">
        <Card title="Profile">
          <div className="grid gap-5 sm:grid-cols-[auto_1fr]">
            <Avatar className="size-16">
              <AvatarFallback className="bg-accent text-lg text-primary">
                {initials(data.name)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-4 sm:grid-cols-2">
              <Label className="space-y-2">
                <span>Name</span>
                <Input
                  value={data.name}
                  onChange={(event) => update({ name: event.target.value })}
                />
              </Label>
              <Label className="space-y-2">
                <span>Email</span>
                <Input value={data.email} readOnly />
              </Label>
            </div>
          </div>
        </Card>
      </section>
      <section id="security">
        <Card title="Security" subtitle="Use a strong password with at least 8 characters.">
          <form className="grid gap-4 sm:max-w-md" onSubmit={submitPassword}>
            {["currentPassword", "newPassword", "confirmPassword"].map((key) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key}>
                  <span>
                    {key === "currentPassword"
                      ? "Current password"
                      : key === "newPassword"
                        ? "New password"
                        : "Confirm password"}
                  </span>
                </Label>
                <PasswordInput
                  id={key}
                  autoComplete={key === "currentPassword" ? "current-password" : "new-password"}
                  value={passwords[key]}
                  aria-invalid={Boolean(passwordErrors[key])}
                  aria-describedby={passwordErrors[key] ? `${key}-error` : undefined}
                  onChange={(event) => {
                    setPasswords({ ...passwords, [key]: event.target.value });
                    if (passwordErrors[key]) {
                      setPasswordErrors((current) => ({ ...current, [key]: "", form: "" }));
                    }
                  }}
                />
                {passwordErrors[key] ? (
                  <span id={`${key}-error`} className="block text-sm text-destructive" role="alert">
                    {passwordErrors[key]}
                  </span>
                ) : null}
              </div>
            ))}
            {passwordErrors.form ? (
              <p className="text-sm text-destructive" role="alert">
                {passwordErrors.form}
              </p>
            ) : null}
            <p className="text-xs text-muted-foreground">
              Use 8 or more characters with a mix of letters and numbers.
            </p>
            <Button
              type="submit"
              disabled={
                !passwords.currentPassword ||
                passwords.newPassword.length < 8 ||
                !passwords.confirmPassword ||
                passwordSaving
              }
            >
              {passwordSaving ? "Updating..." : "Update password"}
            </Button>
          </form>
        </Card>
      </section>
      <section id="notifications">
        <Card title="Notifications" subtitle="These preferences apply across your bots.">
          <div className="space-y-4">
            <Switch
              label="Email me when a new lead is captured"
              checked={Boolean(data.notifications?.newLead)}
              onChange={(value) =>
                update({ notifications: { ...data.notifications, newLead: value } })
              }
            />
            <Switch
              label="Email me when the plan limit reaches 80%"
              checked={Boolean(data.notifications?.usageWarning)}
              onChange={(value) =>
                update({ notifications: { ...data.notifications, usageWarning: value } })
              }
            />
            <Switch
              label="Weekly summary"
              checked={Boolean(data.notifications?.weeklySummary)}
              onChange={(value) =>
                update({ notifications: { ...data.notifications, weeklySummary: value } })
              }
            />
          </div>
        </Card>
      </section>
      <div className="flex items-center justify-between border-t border-border bg-background/95 py-4 backdrop-blur sm:sticky sm:bottom-0">
        <span className="text-sm text-muted-foreground">
          {dirty ? "Unsaved changes" : "All changes saved"}
        </span>
        <div className="flex gap-2">
          <Button variant="secondary" disabled={!dirty || saving} onClick={() => setDraft(account)}>
            Discard
          </Button>
          <Button disabled={!dirty || saving || !data.name.trim()} onClick={save}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

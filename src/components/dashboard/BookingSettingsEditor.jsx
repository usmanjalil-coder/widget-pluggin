"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Plus, Search, Trash2 } from "lucide-react";
import { Button, Card, Input, Label, Switch } from "@/components/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FIELD_TYPES = ["text", "phone", "email", "date"];
const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const FALLBACK_TIMEZONES = ["UTC", "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Karachi", "Asia/Dubai", "Asia/Tokyo", "Australia/Sydney"];
const TIMEZONES = typeof Intl.supportedValuesOf === "function"
  ? ["UTC", ...Intl.supportedValuesOf("timeZone")]
  : FALLBACK_TIMEZONES;
const BOOKING_FIELDS = [
  { id: "name", label: "Full name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: false },
  { id: "phone", label: "Phone", type: "phone", required: false },
  { id: "preferred_time", label: "Preferred date", type: "date", required: false },
  { id: "interest", label: "Service or interest", type: "text", required: false },
];

export default function BookingSettingsEditor({ settings, updateDraftField }) {
  const [timezoneSearch, setTimezoneSearch] = useState("");
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [activeTimezoneIndex, setActiveTimezoneIndex] = useState(0);
  const timezonePickerRef = useRef(null);
  const fields = settings.bookingFields ?? [];
  const hours = settings.workingHours ?? {};
  const availableTimezones = settings.timezone && !TIMEZONES.includes(settings.timezone)
    ? [settings.timezone, ...TIMEZONES]
    : TIMEZONES;
  const matchingTimezones = availableTimezones.filter((timezone) =>
    timezone.toLowerCase().includes(timezoneSearch.trim().toLowerCase()),
  );
  useEffect(() => {
    if (timezoneOpen) {
      timezonePickerRef.current
        ?.querySelector(`#timezone-option-${activeTimezoneIndex}`)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [activeTimezoneIndex, timezoneOpen]);
  useEffect(() => {
    if (!timezoneOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!timezonePickerRef.current?.contains(event.target)) {
        setTimezoneOpen(false);
        setTimezoneSearch("");
      }
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [timezoneOpen]);
  const selectTimezone = (timezone) => {
    updateDraftField("settings", "timezone", timezone);
    setTimezoneOpen(false);
    setTimezoneSearch("");
    setActiveTimezoneIndex(0);
  };
  const updateFields = (value) => updateDraftField("settings", "bookingFields", value);
  const updateField = (index, patch) => {
    updateFields(fields.map((field, i) => (i === index ? { ...field, ...patch } : field)));
  };
  const updateHours = (day, patch) => {
    updateDraftField("settings", "workingHours", {
      ...hours,
      [day]: { ...hours[day], ...patch },
    });
  };
  const nextField = BOOKING_FIELDS.find(
    ({ id }) => !fields.some((field) => field.id === id),
  );

  return (
    <>
      <Card
        title="Booking form fields"
        subtitle="Fields visitors see when requesting an appointment"
      >
        <div className="space-y-4">
          {fields.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No booking fields yet. Add the details you need from visitors.
            </p>
          )}
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-lg border p-4">
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_140px]">
                <div className="space-y-2">
                  <Label htmlFor={`booking-label-${field.id}`}>Field label</Label>
                  <Input
                    id={`booking-label-${field.id}`}
                    value={field.label}
                    required
                    maxLength={80}
                    pattern=".*\S.*"
                    title="Enter a field label."
                    onChange={(event) => updateField(index, { label: event.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`booking-type-${field.id}`}>Type</Label>
                  <Select value={field.type} onValueChange={(type) => updateField(index, { type })}>
                    <SelectTrigger id={`booking-type-${field.id}`} className="w-full capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {FIELD_TYPES.map((type) => (
                        <SelectItem key={type} value={type} className="capitalize">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Switch
                  label="Required"
                  aria-label={`${field.label || "Field"} required`}
                  checked={field.required}
                  onChange={(required) => updateField(index, { required })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  aria-label={`Remove ${field.label || "field"}`}
                  onClick={() => updateFields(fields.filter((_, i) => i !== index))}
                >
                  <Trash2 className="size-4" /> Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              disabled={fields.length >= BOOKING_FIELDS.length || !nextField}
              onClick={() => nextField && updateFields([...fields, nextField])}
            >
              <Plus className="size-4" /> Add field
            </Button>
            <span className="text-xs text-muted-foreground">{fields.length}/5 fields</span>
          </div>
        </div>
      </Card>
      <Card title="Working hours" subtitle="Availability shown on the booking form">
        <div className="space-y-3">
          {Object.hasOwn(settings, "timezone") && (
            <div className="space-y-2">
              <Label htmlFor="working-hours-timezone">Timezone</Label>
              <div
                ref={timezonePickerRef}
                className="relative"
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setTimezoneOpen(false);
                    setTimezoneSearch("");
                  }
                }}
              >
                <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  id="working-hours-timezone"
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={timezoneOpen}
                  aria-controls="working-hours-timezone-options"
                  aria-activedescendant={timezoneOpen && matchingTimezones.length
                    ? `timezone-option-${activeTimezoneIndex}` : undefined}
                  autoComplete="off"
                  placeholder="Select timezone"
                  className="pl-9"
                  value={timezoneOpen ? timezoneSearch : (settings.timezone ?? "")}
                  onFocus={() => {
                    setTimezoneOpen(true);
                    setTimezoneSearch("");
                    setActiveTimezoneIndex(0);
                  }}
                  onChange={(event) => {
                    setTimezoneSearch(event.target.value);
                    setActiveTimezoneIndex(0);
                    setTimezoneOpen(true);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setTimezoneOpen(false);
                      setTimezoneSearch("");
                    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                      event.preventDefault();
                      setTimezoneOpen(true);
                      setActiveTimezoneIndex((index) => Math.max(0, Math.min(
                        matchingTimezones.length - 1,
                        index + (event.key === "ArrowDown" ? 1 : -1),
                      )));
                    } else if (event.key === "Enter" && timezoneOpen && matchingTimezones.length) {
                      event.preventDefault();
                      selectTimezone(matchingTimezones[activeTimezoneIndex]);
                    }
                  }}
                />
                {timezoneOpen && (
                  <div
                    id="working-hours-timezone-options"
                    role="listbox"
                    aria-label="Timezones"
                    className="absolute z-20 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md"
                  >
                    {settings.timezone && !timezoneSearch && (
                      <button type="button" className="w-full rounded-md px-3 py-2 text-left text-sm text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={() => selectTimezone(null)}
                      >Clear timezone</button>
                    )}
                    {matchingTimezones.map((timezone, index) => (
                      <button
                        key={timezone}
                        id={`timezone-option-${index}`}
                        type="button"
                        role="option"
                        aria-selected={settings.timezone === timezone}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${index === activeTimezoneIndex ? "bg-accent" : "hover:bg-accent"}`}
                        onMouseEnter={() => setActiveTimezoneIndex(index)}
                        onClick={() => selectTimezone(timezone)}
                      >
                        {timezone}
                        {settings.timezone === timezone && <Check aria-hidden="true" className="size-4 text-primary" />}
                      </button>
                    ))}
                    {!matchingTimezones.length && (
                      <p className="px-3 py-2 text-sm text-muted-foreground">No matching timezones.</p>
                    )}
                  </div>
                )}
              </div>
              {!settings.timezone && (
                <Button type="button" variant="link" size="sm" className="px-0"
                  onClick={() => updateDraftField(
                    "settings", "timezone", Intl.DateTimeFormat().resolvedOptions().timeZone,
                  )}
                >
                  Use my browser timezone
                </Button>
              )}
              <p className="text-xs text-muted-foreground">Working hours are shown in this timezone.</p>
              {!settings.timezone && Object.values(hours).some((day) => !day.closed) && (
                <p className="text-xs text-warning-foreground">
                  Set a timezone so booking times are clear to visitors.
                </p>
              )}
            </div>
          )}
          {hours.monday && (
            <Button type="button" variant="secondary" size="sm"
              disabled={hours.monday.closed || !hours.monday.open || !hours.monday.close}
              onClick={() => updateDraftField("settings", "workingHours",
                Object.fromEntries(Object.entries(hours).map(([day, schedule]) => [
                  day, schedule.closed ? schedule : {
                    ...schedule, open: hours.monday.open, close: hours.monday.close,
                  },
                ])),
              )}
            >
              Copy Monday&apos;s hours to all open days
            </Button>
          )}
          {Object.entries(hours).map(([day, schedule]) => (
            <div key={day} className="space-y-3 rounded-lg border p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium capitalize">{day}</span>
                <Switch
                  label={schedule.closed ? "Closed" : "Open"}
                  aria-label={`${day} open`}
                  checked={!schedule.closed}
                  onChange={(open) =>
                    updateHours(
                      day,
                      open ? { closed: false } : { closed: true, open: null, close: null },
                    )
                  }
                />
              </div>
              {!schedule.closed && (
                <div className="grid grid-cols-2 gap-3">
                  {["open", "close"].map((key) => (
                    <div key={key} className="min-w-0 space-y-2">
                      <Label htmlFor={`hours-${day}-${key}`}>
                        {key === "open" ? "Opening time" : "Closing time"}
                      </Label>
                      <Input
                        id={`hours-${day}-${key}`}
                        aria-label={`${day} ${key === "open" ? "opening" : "closing"} time`}
                        type="time"
                        required
                        value={schedule[key] ?? ""}
                        onChange={(event) =>
                          updateHours(day, { [key]: event.target.value || null })
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {Object.keys(hours).length === 0 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">No working hours configured.</p>
              <Button
                type="button"
                variant="secondary"
                onClick={() =>
                  updateDraftField(
                    "settings",
                    "workingHours",
                    Object.fromEntries(
                      DAYS.map((day) => [day, { open: null, close: null, closed: true }]),
                    ),
                  )
                }
              >
                <Plus className="size-4" /> Set working hours
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}

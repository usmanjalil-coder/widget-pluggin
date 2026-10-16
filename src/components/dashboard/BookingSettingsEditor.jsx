"use client";

import { Plus, Trash2 } from "lucide-react";
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

export default function BookingSettingsEditor({ settings, updateDraftField }) {
  const fields = settings.bookingFields ?? [];
  const hours = settings.workingHours ?? {};
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
              disabled={fields.length >= 10}
              onClick={() =>
                updateFields([
                  ...fields,
                  {
                    id: crypto.randomUUID(),
                    label: "",
                    type: "text",
                    required: false,
                  },
                ])
              }
            >
              <Plus className="size-4" /> Add field
            </Button>
            <span className="text-xs text-muted-foreground">{fields.length}/10 fields</span>
          </div>
        </div>
      </Card>
      <Card title="Working hours" subtitle="Availability shown on the booking form">
        <div className="space-y-3">
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

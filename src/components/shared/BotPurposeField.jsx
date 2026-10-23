import { Label, Select } from "@/components/ui";

export const BOT_PURPOSES = [
  ["support", "Customer support"],
  ["leads", "Lead generation"],
  ["both", "Customer support & lead generation"],
];

export function botPurpose(bot) {
  if (!bot?.features?.leadCapture) return "support";
  return bot?.settings?.purpose === "leads" ? "leads" : "both";
}

export default function BotPurposeField({ value, onChange, disabled, id = "bot-purpose" }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        Bot purpose <span className="text-destructive">*</span>
      </Label>
      <Select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        required
        aria-describedby={`${id}-help`}
      >
        {BOT_PURPOSES.map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </Select>
      <p id={`${id}-help`} className="text-xs text-muted-foreground">
        Customer support answers visitor questions without collecting leads. Lead generation
        enables contact and appointment forms. You can change this in Bot Settings.
      </p>
    </div>
  );
}

import { HEX_COLOR } from "@/lib/limits";

export function validUrl(value) {
  if (!value) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateStep(step, state, assistant) {
  if (step === 0 && !state.businessName.trim()) return "Enter your business name to continue.";
  if (step === 0 && !validUrl(state.websiteUrl))
    return "Enter a valid website URL or leave it blank.";
  if (step === 2 && !assistant.trim()) return "Enter an assistant name to continue.";
  if (step === 2 && !HEX_COLOR.test(state.primaryColor)) return "Enter a valid hex color.";
  return "";
}

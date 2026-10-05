export const TEXT_LIMITS = Object.freeze({
  botName: 40,
  launcherLabel: 24,
  greetingMessage: 200,
  inputPlaceholder: 60,
  offlineMessage: 200,
  starterQuestion: 60,
  starterQuestions: 4,
  avatarUrl: 2048,
});

export const HEX_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

export function validateBotText(payload = {}) {
  const texts = payload.texts || {};
  if (payload.name !== undefined && (typeof payload.name !== "string" || payload.name.length > TEXT_LIMITS.botName))
    return `name must be text of at most ${TEXT_LIMITS.botName} characters.`;
  for (const [key, max] of Object.entries(TEXT_LIMITS)) {
    if (key === "starterQuestion" || key === "starterQuestions") continue;
    for (const value of [texts[key], payload[key]]) {
      if (value !== undefined && (typeof value !== "string" || value.length > max))
        return `${key} must be text of at most ${max} characters.`;
    }
  }
  if (texts.starterQuestions !== undefined) {
    if (!Array.isArray(texts.starterQuestions) || texts.starterQuestions.length > TEXT_LIMITS.starterQuestions)
      return `starterQuestions must contain at most ${TEXT_LIMITS.starterQuestions} questions.`;
    if (texts.starterQuestions.some((item) => typeof item !== "string" || item.length > TEXT_LIMITS.starterQuestion))
      return `Each starter question must be text of at most ${TEXT_LIMITS.starterQuestion} characters.`;
  }
  if (texts.avatarUrl && !/^https:\/\//i.test(texts.avatarUrl)) return "avatarUrl must use HTTPS.";
  if (payload.theme?.primaryColor !== undefined && !HEX_COLOR.test(payload.theme.primaryColor))
    return "primaryColor must be a valid #RGB or #RRGGBB hex color.";
  return null;
}

"use client";

import CharLimitInput from "./CharLimitInput";

export default function AssistantRulesField({ value, onChange, id = "assistant-rules" }) {
  return (
    <CharLimitInput
      id={id}
      label="Assistant instructions"
      multiline
      rows={5}
      maxLength={2000}
      value={value || ""}
      onChange={onChange}
      placeholder="Describe how your assistant should respond and any business rules to follow."
    />
  );
}

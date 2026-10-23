"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { botQueryKey } from "@/lib/query-client";
import { toast as notify } from "sonner";
import { getBot, updateBot } from "@/lib/api/bots.api";
import { useDashboard } from "./dashboard-context";
import { HEX_COLOR } from "@/lib/limits";

const textValue = (value) => (typeof value === "string" ? value : "");

function appearancePayload(draft) {
  const texts = draft.texts || {};
  const theme = draft.theme || {};

  return {
    theme: {
      primaryColor: textValue(theme.primaryColor),
      mode: textValue(theme.mode) || "light",
      position: textValue(theme.position) || "right",
      borderRadius: Number.isInteger(theme.borderRadius) ? theme.borderRadius : 16,
      fontFamily: textValue(theme.fontFamily) || "system",
    },
    texts: {
      botName: textValue(texts.botName),
      avatarUrl: textValue(texts.avatarUrl),
      greetingMessage: textValue(texts.greetingMessage),
      inputPlaceholder: textValue(texts.inputPlaceholder),
      launcherLabel: textValue(texts.launcherLabel),
      starterQuestions: Array.isArray(texts.starterQuestions)
        ? texts.starterQuestions
            .map(textValue)
            .map((question) => question.trim())
            .filter(Boolean)
        : [],
      offlineMessage: textValue(texts.offlineMessage),
    },
    branding: {
      showBadge: Boolean(draft.branding?.showBadge),
    },
    settings: {
      assistantRules: textValue(draft.settings?.assistantRules),
    },
  };
}

function requiredAppearanceErrors(payload) {
  const errors = {};
  if (!payload.texts.botName.trim()) errors["texts.botName"] = ["Bot name is required."];
  if (!payload.texts.greetingMessage.trim()) {
    errors["texts.greetingMessage"] = ["Greeting message is required."];
  }
  if (!payload.texts.inputPlaceholder.trim()) {
    errors["texts.inputPlaceholder"] = ["Input placeholder is required."];
  }
  if (!HEX_COLOR.test(payload.theme.primaryColor)) {
    errors["theme.primaryColor"] = ["Enter a valid #RGB or #RRGGBB color."];
  }

  return errors;
}

export default function useBotEditor({ selectedBotId, setBots }) {
  const { registerNavigationGuard } = useDashboard();
  const {
    data: bot = null,
    isPending,
    error,
    refetch: reload,
  } = useQuery({
    queryKey: botQueryKey(selectedBotId),
    queryFn: () => getBot(selectedBotId),
    enabled: Boolean(selectedBotId),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });
  // Draft edits stay local; both tabs share only the saved server response.
  const [draftState, setDraftState] = useState(null);
  const draft = draftState?.id === selectedBotId ? draftState.value : bot;
  const setDraft = useCallback(
    (update) => {
      setDraftState((current) => {
        const value = current?.id === selectedBotId ? current.value : bot;
        return {
          id: selectedBotId,
          value: typeof update === "function" ? update(value) : update,
        };
      });
    },
    [selectedBotId, bot],
  );
  const loading = Boolean(selectedBotId) && isPending;
  const detailError = error?.message || "";
  const [savingAppearance, setSavingAppearance] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsErrors, setSettingsErrors] = useState({});
  const [appearanceErrors, setAppearanceErrors] = useState({});
  const [logoState, setLogoState] = useState(null);
  const logoFile = logoState?.id === selectedBotId ? logoState.file : null;
  const setLogoFile = useCallback(
    (file) => {
      setLogoState({ id: selectedBotId, file });
      setAppearanceErrors({});
    },
    [selectedBotId],
  );
  const dirty = useMemo(
    () =>
      Boolean(
        bot &&
        draft &&
        (logoFile ||
          JSON.stringify({
            theme: draft.theme,
            texts: draft.texts,
            branding: draft.branding,
            rules: draft.settings?.assistantRules || "",
          }) !==
            JSON.stringify({
              theme: bot.theme,
              texts: bot.texts,
              branding: bot.branding,
              rules: bot.settings?.assistantRules || "",
            })),
      ),
    [bot, draft, logoFile],
  );

  const unsavedChanges = dirty || Boolean(bot && draft && (
    JSON.stringify(draft.settings) !== JSON.stringify(bot.settings)
    || JSON.stringify(draft.features) !== JSON.stringify(bot.features)
  ));

  useEffect(() => {
    return registerNavigationGuard(() => !unsavedChanges || window.confirm("Discard unsaved bot changes?"));
  }, [unsavedChanges, registerNavigationGuard]);

  useEffect(() => {
    if (!unsavedChanges) return;
    const beforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    const onClick = (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target.closest?.("a[href]");
      if (
        !anchor ||
        anchor.origin !== window.location.origin ||
        anchor.href === window.location.href
      )
        return;
      if (!window.confirm("Discard unsaved bot changes?")) {
        event.preventDefault();
        event.stopPropagation();
      } else setDraft(bot);
    };
    const currentUrl = window.location.href;
    const onPopState = () => {
      if (!window.confirm("Discard unsaved bot changes?"))
        window.history.pushState(null, "", currentUrl);
      else setDraft(bot);
    };
    window.addEventListener("beforeunload", beforeUnload);
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [unsavedChanges, bot, setDraft]);

  const updateDraftField = useCallback(
    (group, key, value) => {
      setDraft((current) => {
        if (!current || Object.is(current[group]?.[key], value)) return current;
        return {
          ...current,
          [group]: {
            ...current[group],
            [key]: value,
          },
        };
      });
    },
    [setDraft],
  );

  const saveAppearance = useCallback(async () => {
    if (!selectedBotId || !draft) return;
    const payload = appearancePayload(draft);
    const validationErrors = requiredAppearanceErrors(payload);
    if (Object.keys(validationErrors).length > 0) {
      setAppearanceErrors(validationErrors);
      notify("Please correct the highlighted appearance fields.");
      return;
    }
    setSavingAppearance(true);
    setAppearanceErrors({});
    try {
      if (logoFile) delete payload.texts.avatarUrl;
      const saved = await updateBot(selectedBotId, payload, logoFile);
      setDraft(saved);
      setLogoFile(null);
      setBots((current) =>
        current.map((item) =>
          String(item.public_id ?? item.id) === String(selectedBotId)
            ? {
                ...item,
                id: saved.public_id ?? saved.id ?? item.id,
                name: saved.texts?.botName || saved.name || item.name,
                status: saved.status ?? item.status,
              }
            : item,
        ),
      );
      notify("Appearance saved. The public widget is updated.");
    } catch (error) {
      setAppearanceErrors(error.errors ?? {});
      notify(error.message || "Unable to save this appearance yet.");
    } finally {
      setSavingAppearance(false);
    }
  }, [selectedBotId, draft, logoFile, setLogoFile, setBots, setDraft]);

  const resetAppearance = useCallback(() => {
    setDraft(bot);
    setLogoFile(null);
    setAppearanceErrors({});
  }, [bot, setDraft, setLogoFile]);
  const saveSettings = useCallback(async () => {
    if (!draft || !selectedBotId) return;
    setSettingsErrors({});
    setSavingSettings(true);
    try {
      const saved = await updateBot(selectedBotId, {
        settings: draft.settings,
        features: { leadCapture: Boolean(draft.features?.leadCapture) },
      });
      setDraft(saved);
      notify("Settings saved.");
    } catch (error) {
      setSettingsErrors(error.errors ?? {});
      notify(error.message || "Unable to save settings.");
    } finally {
      setSavingSettings(false);
    }
  }, [draft, selectedBotId, setDraft]);

  return {
    bot,
    draft,
    setDraft,
    loading,
    detailError,
    reload,
    dirty,
    updateDraftField,
    saveAppearance,
    resetAppearance,
    saveSettings,
    savingAppearance,
    savingSettings,
    settingsErrors,
    appearanceErrors,
    logoFile,
    setLogoFile,
  };
}

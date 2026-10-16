"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { botQueryKey } from "@/lib/query-client";
import { toast as notify } from "sonner";
import { getBot, updateBot } from "@/lib/api/bots.api";
import { useDashboard } from "./dashboard-context";
import { HEX_COLOR } from "@/lib/limits";

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
  const dirty = useMemo(
    () =>
      Boolean(
        bot &&
        draft &&
        JSON.stringify({ theme: draft.theme, texts: draft.texts, branding: draft.branding }) !==
          JSON.stringify({ theme: bot.theme, texts: bot.texts, branding: bot.branding }),
      ),
    [bot, draft],
  );

  useEffect(() => {
    return registerNavigationGuard(
      () => !dirty || window.confirm("Discard unsaved appearance changes?"),
    );
  }, [dirty, registerNavigationGuard]);

  useEffect(() => {
    if (!dirty) return;
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
      if (!window.confirm("Discard unsaved appearance changes?")) {
        event.preventDefault();
        event.stopPropagation();
      } else setDraft(bot);
    };
    const currentUrl = window.location.href;
    const onPopState = () => {
      if (!window.confirm("Discard unsaved appearance changes?"))
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
  }, [dirty, bot, setDraft]);

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
    if (!HEX_COLOR.test(draft.theme.primaryColor)) {
      notify("Enter a valid hex color before saving.");
      return;
    }
    setSavingAppearance(true);
    try {
      const saved = await updateBot(selectedBotId, {
        ...draft,
        name: draft.texts.botName.trim() || draft.name,
      });
      setDraft(saved);
      setBots((current) =>
        current.map((item) =>
          String(item.public_id ?? item.id) === String(selectedBotId)
            ? {
                ...item,
                id: saved.public_id ?? saved.id,
                name: saved.name,
                status: saved.status ?? item.status,
              }
            : item,
        ),
      );
      notify("Appearance saved. The public widget is updated.");
    } catch (error) {
      notify(error.message || "Unable to save this appearance yet.");
    } finally {
      setSavingAppearance(false);
    }
  }, [selectedBotId, draft, setBots, setDraft]);

  const resetAppearance = useCallback(() => {
    setDraft(bot);
  }, [bot, setDraft]);
  const saveSettings = useCallback(async () => {
    if (!draft || !selectedBotId) return;
    setSettingsErrors({});
    setSavingSettings(true);
    try {
      const saved = await updateBot(selectedBotId, { settings: draft.settings });
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
  };
}

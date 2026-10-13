"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast as notify } from "sonner";
import { getBot, updateBot } from "@/lib/api/bots.api";
import { useDashboard } from "./dashboard-context";
import { HEX_COLOR } from "@/lib/limits";

export default function useBotEditor({ selectedBotId, setBots }) {
  const { registerNavigationGuard } = useDashboard();
  const [bot, setBot] = useState(null);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailError, setDetailError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [savingAppearance, setSavingAppearance] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
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
  const reload = useCallback(() => setReloadKey((value) => value + 1), []);

  useEffect(() => {
    if (!selectedBotId) return;
    let active = true;
    async function load() {
      setBot(null);
      setDraft(null);
      setLoading(true);
      setDetailError("");
      try {
        const nextBot = await getBot(selectedBotId);
        if (!active) return;
        setBot(nextBot);
        setDraft(nextBot);
      } catch (error) {
        if (active) setDetailError(error.message || "Could not load this bot's data.");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [selectedBotId, reloadKey]);

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
  }, [dirty, bot]);

  const updateDraftField = useCallback((group, key, value) => {
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
  }, []);

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
      setBot(saved);
      setDraft(saved);
      setBots((current) =>
        current.map((item) =>
          item.id === selectedBotId ? { id: saved.id, name: saved.name } : item,
        ),
      );
      notify("Appearance saved. The public widget is updated.");
    } catch (error) {
      notify(error.message || "Unable to save this appearance yet.");
    } finally {
      setSavingAppearance(false);
    }
  }, [selectedBotId, draft, setBots]);

  const resetAppearance = useCallback(() => {
    setDraft(bot);
  }, [bot]);
  const saveSettings = useCallback(async () => {
    if (!draft || !selectedBotId) return;
    setSavingSettings(true);
    try {
      const saved = await updateBot(selectedBotId, { settings: draft.settings });
      setBot(saved);
      setDraft(saved);
      notify("Settings saved.");
    } catch {
      notify("Unable to save settings.");
    } finally {
      setSavingSettings(false);
    }
  }, [draft, selectedBotId]);

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
  };
}

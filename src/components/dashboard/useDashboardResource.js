"use client";

import { useCallback, useEffect, useState } from "react";

// The caller supplies a stable loader. A new loader or retry invalidates old responses.
export default function useDashboardResource(loader, enabled = true) {
  const [state, setState] = useState({ data: null, error: "", loading: true });
  const [version, setVersion] = useState(0);
  const reload = useCallback(() => setVersion((value) => value + 1), []);
  const setData = useCallback((update) => {
    setState((current) => ({
      ...current,
      data: typeof update === "function" ? update(current.data) : update,
    }));
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let active = true;
    async function load() {
      setState({ data: null, error: "", loading: true });
      try {
        const data = await loader();
        if (active) setState({ data, error: "", loading: false });
      } catch (error) {
        if (active)
          setState({
            data: null,
            error: error.message || "Could not load data. Please try again.",
            loading: false,
          });
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [loader, enabled, version]);

  return { ...state, loading: enabled && state.loading, reload, setData };
}

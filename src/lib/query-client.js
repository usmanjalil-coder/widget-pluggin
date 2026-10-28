import { QueryClient } from "@tanstack/react-query";

let browserClient;
let browserToken;

export function getQueryClient() {
  if (typeof window === "undefined") return new QueryClient();
  browserClient ??= new QueryClient();
  const token = window.localStorage.getItem("token");
  if (token !== browserToken) {
    browserClient.clear();
    browserToken = token;
  }
  return browserClient;
}

export const BOTS_QUERY_KEY = ["bots"];
export const botQueryKey = (botId) => ["bot", String(botId)];

export async function updateBotCache(botId, update) {
  if (!browserClient) return;
  const queryKey = botQueryKey(botId);
  await browserClient.cancelQueries({ queryKey });
  browserClient.setQueryData(queryKey, update);
}

export function removeBotCache(botId) {
  browserClient?.removeQueries({ queryKey: botQueryKey(botId) });
}

export function clearQueryCache() {
  browserClient?.clear();
}

export async function invalidateBotsCache() {
  if (!browserClient) return;
  await browserClient.cancelQueries({ queryKey: BOTS_QUERY_KEY });
  return browserClient.invalidateQueries({ queryKey: BOTS_QUERY_KEY, refetchType: "none" });
}

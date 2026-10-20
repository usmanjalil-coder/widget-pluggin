import callApi from "@/lib/api";
import {
  botQueryKey,
  getQueryClient,
  invalidateBotsCache,
  removeBotCache,
  updateBotCache,
} from "@/lib/query-client";

const request = (url, options = {}) => callApi({ url, toastr: false, ...options });
const botPath = (botId) => `bot/${encodeURIComponent(botId)}`;
const documentsPath = (botId) => `${botPath(botId)}/documents`;

// Bots routes
export const getBots = async () => {
  const response = await request("bots");
  return response?.data?.data;
};
export const getBot = async (botId) => (await request(botPath(botId))).data;
export const updateBot = async (botId, data, logoFile = null) => {
  let body = data;
  if (logoFile) {
    body = new FormData();
    body.append("config", JSON.stringify(data));
    body.append("logo", logoFile);
  }
  const response = await request(`bots/${encodeURIComponent(botId)}/config`, {
    method: logoFile ? "POST" : "PUT",
    data: body,
  });
  const current = getQueryClient().getQueryData(botQueryKey(botId));
  const saved = { ...current, ...response.data };
  await updateBotCache(botId, saved);
  await invalidateBotsCache();
  return saved;
};
export const createBot = async (data) => {
  const response = await request("bot", { method: "POST", data });
  await invalidateBotsCache();
  return response.data;
};
export const deleteBot = async (botId) => {
  const response = await request(`bot/${encodeURIComponent(botId)}`, { method: "DELETE" });
  removeBotCache(botId);
  await invalidateBotsCache();
  return response;
};
export const toggleBotStatus = async (botId) => {
  const response = await request(`bot/${encodeURIComponent(botId)}/status`);
  await updateBotCache(botId, (bot) =>
    bot ? { ...bot, status: response.data.status } : undefined,
  );
  await invalidateBotsCache();
  return response.data;
};

// Documents routes
export const listDocuments = async (botId, params = {}, signal) =>
  (await request(documentsPath(botId), { data: params, signal })).data;
export const addDocument = async (botId, data) =>
  (await request(documentsPath(botId), { method: "POST", data })).data;
export const updateDocument = async (botId, documentId, action) =>
  (await request(documentsPath(botId), { method: "PATCH", data: { documentId, action } })).data;
export const deleteDocument = (botId, documentId) =>
  request(`${documentsPath(botId)}?documentId=${encodeURIComponent(documentId)}`, {
    method: "DELETE",
  });
export const listConversations = async (botId) =>
  (await request(`${botPath(botId)}/conversations`)).data;

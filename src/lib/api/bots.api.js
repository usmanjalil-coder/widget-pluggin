import callApi from "@/lib/api";

const request = (url, options = {}) => callApi({ url, toastr: false, ...options });
const botPath = (botId) => `bots/${encodeURIComponent(botId)}`;
const documentsPath = (botId) => `${botPath(botId)}/documents`;

// Bots routes
export const getBots = async () => {
  const response = await request("bots");
  return Array.isArray(response?.data?.data) ? response.data.data : [];
};
export const getBot = async (botId) => (await request(botPath(botId))).data;
export const updateBot = async (botId, data) =>
  (await request(botPath(botId), { method: "PUT", data })).data;
export const createBot = async (data) => (await request("bot", { method: "POST", data })).data;
export const deleteBot = (botId) => request(`bot/${encodeURIComponent(botId)}`, { method: "DELETE" });
export const toggleBotStatus = async (botId) => {
  const response = await request("bot/status", { data: { bot_id: botId } });
  return response?.data ?? null;
};

// Documents routes
export const listDocuments = async (botId) => (await request(documentsPath(botId))).data;
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

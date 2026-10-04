const base = process.env.NEXT_PUBLIC_API_BASE || "";

async function request(path, options = {}) {
  const response = await fetch(`${base}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }

  if (
    response.status === 204 ||
    response.headers.get("content-length") === "0"
  ) {
    return null;
  }

  return response.json();
}

export const getBots = () => request("/api/bots");
export const getBot = (id) => request(`/api/bots/${id}`);
export const updateBot = (id, patch) =>
  request(`/api/bots/${id}`, { method: "PUT", body: JSON.stringify(patch) });
export const createBot = (body) =>
  request("/api/bots", { method: "POST", body: JSON.stringify(body) });
export const deleteBot = (id) =>
  request(`/api/bots/${id}`, { method: "DELETE" });
export const listLeads = (botId) =>
  request(`/api/leads?botId=${encodeURIComponent(botId)}`);
export const submitLead = (botId, payload) =>
  request(`/api/leads/${botId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
export const getUsage = () => request("/api/usage");
export const getOnboarding = () => request("/api/onboarding");
export const updateOnboarding = (payload) =>
  request("/api/onboarding", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
export const listDocuments = (botId) => request(`/api/bots/${botId}/documents`);
export const listConversations = (botId) =>
  request(`/api/bots/${botId}/conversations`);
export const addDocument = (botId, payload) =>
  request(`/api/bots/${botId}/documents`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

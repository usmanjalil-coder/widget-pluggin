import callApi from "@/lib/api";

const request = (url, options = {}) => callApi({ url, toastr: false, ...options });

const leadsPath = (botId) => `bot/${encodeURIComponent(botId)}/leads`;

export const listLeads = async (botId, params = {}, signal) =>
  (await request(leadsPath(botId), { data: params, cache: "no-store", signal })).data;
export const getLead = async (botId, leadId, signal) =>
  (await request(`${leadsPath(botId)}/${encodeURIComponent(leadId)}`, {
    cache: "no-store",
    signal,
  })).data;
export const updateLeadStatus = async (botId, leadId, status) =>
  (await request(`${leadsPath(botId)}/${encodeURIComponent(leadId)}`, {
    method: "PATCH",
    data: { status },
  })).data;

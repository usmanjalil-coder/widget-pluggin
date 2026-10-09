import callApi from "@/lib/api";

const request = (url, options = {}) => callApi({ url, toastr: false, ...options });

export const listLeads = (botId) => request("leads", { data: botId ? { botId } : undefined });
export const updateLeadStatus = (leadId, status) =>
  request(`leads/${encodeURIComponent(leadId)}`, { method: "PATCH", data: { status } });
export const submitLead = (botId, data) =>
  request(`leads/${encodeURIComponent(botId)}`, { method: "POST", data });

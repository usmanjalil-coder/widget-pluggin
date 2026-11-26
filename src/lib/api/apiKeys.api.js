import callApi from "@/lib/api";

const request = (url, options = {}) => callApi({ url, toastr: false, ...options });

export const listApiKeys = async (signal) =>
  (await request("api-keys", { cache: "no-store", signal })).data || [];

export const createApiKey = async (name) =>
  (await request("api-keys", { method: "POST", data: { name } })).data;

export const revokeApiKey = async (id) =>
  (await request(`api-keys/${encodeURIComponent(id)}`, { method: "DELETE" })).data;

import callApi from "@/lib/api";

export async function getDashboard() {
  const response = await callApi({ url: "dashboard", toastr: false, cache: "no-store" });
  const payload = response?.data?.data ?? response?.data ?? {};

  return {
    bots: Array.isArray(payload.bots)
      ? payload.bots.map(({ id, name }) => ({ id, name }))
      : [],
    usage: payload.usage ?? null,
    account: payload.account ?? payload.user ?? null,
  };
}

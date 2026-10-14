import callApi from "@/lib/api";

export async function getDashboard() {
  const response = await callApi({ url: "dashboard/overview", toastr: false, cache: "no-store" });
  const payload = response.data;

  return {
    bots: payload.bots,
    usage: { percent: payload.usage_prcnt },
    account: payload.account,
  };
}

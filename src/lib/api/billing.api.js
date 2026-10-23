import callApi from "@/lib/api";

export const getBillingOverview = async (signal) =>
  (await callApi({ url: "billing/overview", cache: "no-store", signal, toastr: false })).data;

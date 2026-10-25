import callApi from "@/lib/api";

export const getBillingOverview = async (signal) =>
  (await callApi({ url: "billing/overview", cache: "no-store", signal, toastr: false })).data;

export const getBillingInvoices = async (signal) =>
  (await callApi({ url: "billing/invoices", cache: "no-store", signal, toastr: false })).data;

export const changeBillingPlan = async (planKey) =>
  (await callApi({ url: "billing/change-plan", method: "POST", data: { planKey }, toastr: false })).data;

export const cancelBillingPlan = async () =>
  (await callApi({ url: "billing/cancel", method: "POST", data: {}, toastr: false })).data;

export const resumeBillingPlan = async () =>
  (await callApi({ url: "billing/resume", method: "POST", data: {}, toastr: false })).data;

export const getPaymentMethodUrl = async () =>
  (await callApi({ url: "billing/payment-method", method: "POST", data: {}, toastr: false })).data.url;

export const getInvoicePdfUrl = async (invoiceId) =>
  (await callApi({ url: `billing/invoices/${invoiceId}/pdf`, cache: "no-store", toastr: false })).data.url;

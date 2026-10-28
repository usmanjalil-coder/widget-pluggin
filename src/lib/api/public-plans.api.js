import callApi from "@/lib/api";

export async function getPublicPlans({ cache = "no-store", next } = {}) {
  const response = await callApi({ url: "plans", cache, next, toastr: false });
  if (!Array.isArray(response?.data)) {
    throw new Error("Pricing information is unavailable.");
  }

  return response.data;
}

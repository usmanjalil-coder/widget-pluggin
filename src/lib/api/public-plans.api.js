import callApi from "@/lib/api";

export async function getPublicPlans() {
  const response = await callApi({ url: "plans", cache: "no-store", toastr: false });
  if (!Array.isArray(response?.data)) {
    throw new Error("Pricing information is unavailable.");
  }

  return response.data;
}

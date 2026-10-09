import callApi from "@/lib/api";

export const getUsage = async () => (await callApi({ url: "auth/me", toastr: false })).data.usage;

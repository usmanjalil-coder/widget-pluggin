import callApi from "@/lib/api";

const request = (url, options = {}) => callApi({ url, toastr: false, ...options });

export const completeOnboarding = (state) =>
  request("onboarding/complete", {
    method: "POST",
    data: state,
  });

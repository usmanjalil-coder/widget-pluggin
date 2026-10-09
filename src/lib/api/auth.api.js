import callApi from "@/lib/api";

const post = (url, data) => callApi({ url, method: "POST", data, toastr: false });

export function getAccessToken(result) {
  return result?.data?.access_token || result?.access_token || null;
}

export function establishAuthSession(result) {
  const token = getAccessToken(result);
  if (!token) {
    throw new Error("The authentication response did not include an access token.");
  }
  window.localStorage.setItem("token", JSON.stringify(token));
}

export async function endAuthSession() {
  try {
    await post("auth/logout");
  } catch {
    // The browser session still ends if the backend is temporarily unavailable.
  } finally {
    window.localStorage.removeItem("token");
  }
}

export const login = (data) => post("auth/login", data);
export const getCurrentUser = () => callApi({ url: "auth/me", toastr: false, cache: "no-store" });
export const forgotPassword = (email) => post("auth/forgot-password", { email });
export const resetPassword = (data) => post("auth/reset-password", data);
export const register = (data) => post("auth/register", data);
export const verifyRegistration = (data) => post("auth/verify-email", data);
export const resendRegistrationCode = (data) => post("auth/resend-email-verification", data);

import callApi from "@/lib/api";
import { clearQueryCache } from "@/lib/query-client";

const post = (url, data) => callApi({ url, method: "POST", data, toastr: false });

export function getAccessToken(result) {
  return result?.data?.access_token || null;
}

export function establishAuthSession(result) {
  const token = getAccessToken(result);
  if (!token) {
    throw new Error("The authentication response did not include an access token.");
  }
  clearQueryCache();
  window.localStorage.setItem("token", JSON.stringify(token));
}

export async function endAuthSession() {
  try {
    await post("auth/logout");
  } catch {

  } finally {
    clearQueryCache();
    window.localStorage.removeItem("token");
  }
}

export const googleLogin = (credential) =>
  callApi({ prefix: "/api", url: "auth/google", method: "POST", data: { credential }, toastr: false });
export async function completeLogin(result, router, destination) {
  establishAuthSession(result);
  const { pathname } = new URL(destination, window.location.origin);
  // Protected layouts already verify the session before showing their content.
  if (!/^\/(?:dashboard(?:\/|$)|onboarding\/?$)/.test(pathname)) {
    try {
      await getCurrentUser();
    } catch (error) {
      window.localStorage.removeItem("token");
      throw error;
    }
  }
  router.replace(destination);
}

export const login = (data) => post("auth/login", data);
export const getCurrentUser = () => callApi({ url: "auth/me", toastr: false, cache: "no-store" });
export const forgotPassword = (email) => post("auth/forgot-password", { email });
export const resetPassword = (data) => post("auth/reset-password", data);
export const register = (data) => post("auth/register", data);
export const verifyRegistration = (data) => post("auth/verify-email", data);
export const resendRegistrationCode = (data) => post("auth/resend-email-verification", data);

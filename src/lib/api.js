import { toast } from "sonner";

const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
const apiPrefix = "/api/v1";

function getToken() {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem("token");
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function createUrl(url, data, method) {
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL is required for Laravel API requests.");
  const endpoint = `${base}${apiPrefix}/${String(url || "").replace(/^\/+/, "")}`;
  if (!["GET", "HEAD"].includes(method) || !data) return endpoint;
  const query = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) query.set(key, String(value));
  });
  return query.size ? `${endpoint}?${query}` : endpoint;
}

async function parseResponse(response, responseType) {
  if (response.status === 204 || response.headers.get("content-length") === "0") return null;
  if (responseType === "blob") return response.blob();
  if (responseType === "text") return response.text();
  return response.json();
}

function createApiError(response, payload) {
  const error = new Error(payload?.message || payload?.error || payload?.code || "Request failed");
  error.status = response.status;
  error.code = payload?.code || payload?.error_code || "";
  error.retryAfter = payload?.retry_after ?? payload?.retry_after_seconds ?? null;
  error.errors = payload?.errors || null;
  error.payload = payload;
  return error;
}

function showValidationErrors(errors) {
  if (!errors || typeof window === "undefined") return;
  Object.values(errors)
    .flat()
    .forEach((message) => toast.error(String(message)));
}

/**
 * Fetch API client for browser and server components. GET requests retain
 * Next.js fetch caching defaults; pass `cache` or `next` to override them.
 */
export default async function callApi({
  url,
  data,
  method = "GET",
  responseType = "json",
  headers = {},
  toastr = true,
  cache,
  next,
  signal,
} = {}) {
  const requestMethod = method.toUpperCase();
  const isBrowser = typeof window !== "undefined";
  const token = getToken();
  const loadingToast = toastr && isBrowser ? toast.loading("Loading...") : null;

  try {
    const response = await fetch(createUrl(url, data, requestMethod), {
      method: requestMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body:
        ["GET", "HEAD"].includes(requestMethod) || data === undefined
          ? undefined
          : JSON.stringify(data),
      ...(cache !== undefined ? { cache } : {}),
      ...(next !== undefined ? { next } : {}),
      ...(signal ? { signal } : {}),
    });
    const payload = await parseResponse(response, responseType);
    if (!response.ok || payload?.success === false || Number(payload?.responseCode) >= 400) {
      throw createApiError(response, payload);
    }

    if (toastr && isBrowser && payload?.responseCode === 200 && payload.message) {
      toast.success(payload.message, { id: loadingToast });
    } else if (loadingToast) {
      toast.dismiss(loadingToast);
    }
    return payload;
  } catch (error) {
    if (loadingToast) toast.dismiss(loadingToast);
    if (toastr && isBrowser) {
      if (error?.payload?.status === "ERROR") toast.error(error.message);
      showValidationErrors(error?.payload?.errors);
    }
    throw error;
  }
}

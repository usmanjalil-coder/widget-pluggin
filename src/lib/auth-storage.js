export const AUTH_TOKEN_KEY = "token";

export function syncAuthAppearance() {
  let hasToken = false;
  try {
    hasToken = window.localStorage.getItem(AUTH_TOKEN_KEY) !== null;
  } catch {}

  if (hasToken) document.documentElement.dataset.auth = "in";
  else delete document.documentElement.dataset.auth;
}

export function storeAuthToken(token) {
  window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
  syncAuthAppearance();
}

export function removeAuthToken() {
  try {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {}
  delete document.documentElement.dataset.auth;
}

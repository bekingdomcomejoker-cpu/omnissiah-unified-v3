export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Hard-hardened URL validation to prevent production crashes
 */
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const rawOauthUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const oauthPortalUrl = isValidUrl(rawOauthUrl) ? rawOauthUrl : "https://oauth.example.com";
  const appId = import.meta.env.VITE_APP_ID || "omnissiah-unified-v3";
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  try {
    // Ensure we always have a valid base for the URL constructor
    const baseUrl = oauthPortalUrl.endsWith('/') ? oauthPortalUrl : `${oauthPortalUrl}/`;
    const url = new URL('app-auth', baseUrl);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  } catch (e) {
    console.error("[Auth] Critical URL Failure:", e);
    return "#";
  }
};

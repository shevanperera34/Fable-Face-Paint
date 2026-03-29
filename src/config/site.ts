declare global {
  interface Window {
    __FFP_BASE_PATH__?: string;
  }
}

/** Public URL prefix without trailing slash, e.g. "" or "/Fable-Face-Paint". */
export function getBasePath(): string {
  if (typeof window !== "undefined" && window.__FFP_BASE_PATH__ !== undefined) {
    return window.__FFP_BASE_PATH__;
  }
  const fromEnv = typeof process !== "undefined" ? (process.env.BASE_PATH ?? "") : "";
  return fromEnv.replace(/\/$/, "");
}

export function getSiteUrl(): string {
  if (typeof process !== "undefined" && process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "https://fablefacepaint.com";
}

export function withBasePath(path: string): string {
  const base = getBasePath();
  if (!path.startsWith("/")) path = `/${path}`;
  if (!base) return path;
  return `${base}${path === "/" ? "" : path}`;
}

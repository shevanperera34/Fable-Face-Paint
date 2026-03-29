/** Next.js static image imports resolve to `{ src, width, height, ... }` or a string URL. */
export type BundledImageSrc = string | { src: string };

function toUrlString(url: BundledImageSrc): string {
  return typeof url === "string" ? url : url.src;
}

/**
 * Encode each path segment of a same-origin static asset URL.
 * Bundled filenames may contain spaces, "+", or literal "%…" sequences; raw strings in
 * `src` can 404 on CDNs that decode "+" as space or mishandle spaces / percent signs.
 * Accepts Next.js `StaticImageData`-style objects ({ src }) from static imports.
 */
export function encodePublicAssetPath(url: BundledImageSrc): string {
  const s = toUrlString(url);
  if (!s) return s;
  if (s.startsWith("data:") || s.startsWith("blob:")) return s;
  if (/^https?:\/\//i.test(s) || s.startsWith("//")) return s;
  if (!s.startsWith("/")) return s;

  const pathPart = s.slice(1);
  if (!pathPart) return "/";

  return (
    "/" +
    pathPart
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")
  );
}

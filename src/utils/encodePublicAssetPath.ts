/**
 * Encode each path segment of a same-origin static asset URL.
 * Bundled filenames may contain spaces, "+", or literal "%…" sequences; raw strings in
 * `src` can 404 on CDNs that decode "+" as space or mishandle spaces / percent signs.
 */
export function encodePublicAssetPath(url: string): string {
  if (!url) return url;
  if (url.startsWith("data:") || url.startsWith("blob:")) return url;
  if (/^https?:\/\//i.test(url) || url.startsWith("//")) return url;
  if (!url.startsWith("/")) return url;

  const pathPart = url.slice(1);
  if (!pathPart) return "/";

  return (
    "/" +
    pathPart
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")
  );
}

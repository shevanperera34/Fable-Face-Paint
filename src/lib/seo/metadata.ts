import type { Metadata } from "next";
import { absoluteUrl, seoForPathname } from "@/lib/seo/routeMeta";
import { getBasePath } from "@/config/site";

export function metadataForPath(path: string): Metadata {
  const basePath = getBasePath();
  const seo = seoForPathname(path, basePath);
  const canonical = absoluteUrl(seo.path);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: "Fable Face Paint",
      type: "website",
      locale: "en_CA",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

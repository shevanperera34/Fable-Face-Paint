import type { Metadata } from "next";
import { Suspense } from "react";
import GalleryPage from "@/views/GalleryPage";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/gallery");

export default function Page() {
  return (
    <Suspense fallback={null}>
      <GalleryPage />
    </Suspense>
  );
}

import type { Metadata } from "next";
import AboutPage from "@/views/AboutPage";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/about");

export default function Page() {
  return <AboutPage />;
}

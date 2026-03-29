import type { Metadata } from "next";
import FaqPage from "@/views/FaqPage";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/faq");

export default function Page() {
  return <FaqPage />;
}

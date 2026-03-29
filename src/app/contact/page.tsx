import type { Metadata } from "next";
import ContactPage from "@/views/ContactPage";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/contact");

export default function Page() {
  return <ContactPage />;
}

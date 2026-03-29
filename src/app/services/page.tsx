import type { Metadata } from "next";
import ServicesPage from "@/views/ServicesPage";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/services");

export default function Page() {
  return <ServicesPage />;
}

import type { Metadata } from "next";
import LargeEventsPage from "@/views/LargeEventsPage";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/large-events");

export default function Page() {
  return <LargeEventsPage />;
}

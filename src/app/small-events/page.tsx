import type { Metadata } from "next";
import SmallEventsPage from "@/views/SmallEventsPage";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/small-events");

export default function Page() {
  return <SmallEventsPage />;
}

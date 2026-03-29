import type { Metadata } from "next";
import HomePage from "@/HomePage";
import { metadataForPath } from "@/lib/seo/metadata";

export const metadata: Metadata = metadataForPath("/");

export default function Page() {
  return <HomePage />;
}

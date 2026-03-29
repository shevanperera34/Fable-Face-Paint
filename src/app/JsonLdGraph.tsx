import { jsonLdOrganizationAndWebsite } from "@/lib/seo/routeMeta";

export default function JsonLdGraph() {
  const data = jsonLdOrganizationAndWebsite();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

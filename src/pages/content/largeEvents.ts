import type { BuilderPage } from "./types";

export const largeEventsPage: BuilderPage = {
  slug: "corporate",
  navLabel: "Large Events",
  seo: {
    title: "Corporate Event Entertainment | Fable Face Paint",
    description: "High-volume entertainment for corporate events and activations. Scalable staffing + smooth flow.",
  },
  blocks: [
    {
      id: "c-hero",
      type: "Hero",
      headline: "High-volume event art that runs smoothly",
      subhead: "Built for planners: throughput, staffing scalability, clean logistics.",
      primaryCta: { label: "Request a quote", to: "contact" },
    },
    {
      id: "c-pricing",
      type: "Pricing",
      title: "Corporate minimums (baseline)",
      subtitle: "Final quote depends on attendance, venue, and staffing needs.",
      cards: [
        { name: "1 artist", priceLine: "$500 / 2 hours", bullets: ["Minimum booking", "+$100 per additional hour"] },
        { name: "2+ artists", priceLine: "$400 / 2 hours (per artist)", bullets: ["Scales for volume", "+$100 per additional hour"] },
        { name: "Travel", priceLine: "Included ~60 min", bullets: ["Beyond that: travel fee", "Parking covered by client"] },
      ],
    },
    {
      id: "c-form",
      type: "HoneyBookForm",
      title: "Corporate Inquiry",
      kind: "corporate",
      honeyBookEmbedId: "HB_CORPORATE_FORM_ID",
      tag: "corporate",
    },
  ],
};

import type { BuilderPage } from "./types";

export const smallEventsPage: BuilderPage = {
  slug: "birthdays",
  navLabel: "Small Events",
  seo: {
    title: "Birthday Face Painting | Fable Face Paint",
    description: "Premium birthday face painting and add-ons. Time-based bookings with a calm, professional setup.",
  },
  blocks: [
    {
      id: "b-hero",
      type: "Hero",
      headline: "Birthday face painting that feels like a storybook",
      subhead: "Magical artistry with a calm, professional setup.",
      primaryCta: { label: "Check availability", to: "contact" },
    },
    {
      id: "b-pricing",
      type: "Pricing",
      title: "Birthday pricing (time-based)",
      subtitle: "Book by time, not guest count.",
      cards: [
        { name: "1 hour", priceLine: "$175", bullets: ["Best for small groups", "Approx 10–12 designs/hour"] },
        { name: "2+ hours", priceLine: "$125/hr", bullets: ["Better flow", "More guests, less rush"] },
        { name: "Travel + setup", priceLine: "Varies", bullets: ["Travel included ~30 min GTA", "Parking covered by client", "Shade required outdoors"] },
      ],
    },
    {
      id: "b-form",
      type: "HoneyBookForm",
      title: "Birthday / Private Party Inquiry",
      kind: "privateParty",
      honeyBookEmbedId: "HB_PRIVATE_PARTY_FORM_ID",
      tag: "private_party",
    },
  ],
};

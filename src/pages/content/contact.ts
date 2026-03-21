import type { BuilderPage } from "./types";

export const contactPage: BuilderPage = {
  slug: "contact",
  navLabel: "Book",
  seo: { title: "Book / Contact | Fable Face Paint", description: "Birthday/private party and corporate inquiries route separately." },
  blocks: [
    {
      id: "ct-hero",
      type: "HeroSplit",
      headline: "Book / Contact",
      subhead: "Choose the right funnel so leads route cleanly into HoneyBook.",
      leftCta: { label: "Private Party Inquiry", to: "birthdays" },
      rightCta: { label: "Corporate Inquiry", to: "corporate" },
    },
    {
      id: "ct-trust",
      type: "TrustBar",
      items: ["Forms feed HoneyBook", "Automations trigger", "Funnels separated", "Analytics tracks conversions"],
    },
  ],
};

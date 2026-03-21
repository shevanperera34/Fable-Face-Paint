import type { BuilderPage } from "./types";

export const homePage: BuilderPage = {
  slug: "home",
  navLabel: "Home",
  seo: {
    title: "Fable Face Paint | Mobile Face Painting & Event Art (GTA)",
    description: "Premium, whimsical event art with professional reliability. Birthdays + corporate events.",
  },
  blocks: [
    {
      id: "h-hero",
      type: "HeroSplit",
      headline: "Mobile Face Painting & Event Art in the GTA",
      subhead: "Two clear paths. Parents get warmth. Planners get logistics.",
      leftCta: { label: "Birthdays & Small Events", to: "birthdays" },
      rightCta: { label: "Corporate & Large Events", to: "corporate" },
      mediaLabels: ["Hero photo: birthday", "Hero photo: corporate"],
    },
    {
      id: "h-trust",
      type: "TrustBar",
      items: ["Liability insured", "Scalable staffing", "Photo-ready setup", "Clear booking process"],
    },
    {
      id: "h-services",
      type: "ServiceGrid",
      title: "Services",
      subtitle: "Grounded magic. Not sterile corporate. Not carnival chaos.",
      services: [
        { name: "Face Painting", bestFor: "Birthdays + family events", speedBadge: "10–12/hr" },
        { name: "Speed Face Painting", bestFor: "High-volume corporate events", speedBadge: "13–25/hr" },
        { name: "Bling Bar", bestFor: "Corporate + older kids + festivals", speedBadge: "10–30/hr" },
        { name: "Balloon Twisting", bestFor: "Fast lines + take-home fun", speedBadge: "15–20/hr" },
        { name: "Glitter Tattoos", bestFor: "Festivals + outdoor events", speedBadge: "10–15/hr" },
        { name: "Matte Tattoos", bestFor: "Clean tattoo-style look", speedBadge: "10–15/hr" },
      ],
    },
    {
      id: "h-process",
      type: "ProcessSteps",
      title: "How booking works",
      steps: [
        { title: "Submit inquiry", desc: "Choose Birthday or Corporate funnel" },
        { title: "Confirm details", desc: "We align on service + logistics" },
        { title: "Deposit", desc: "Locks your time slot" },
        { title: "Event day", desc: "Smooth setup + guest flow" },
        { title: "Final balance", desc: "Paid at end of service window" },
      ],
    },
    {
      id: "h-gallery",
      type: "GalleryTeaser",
      title: "Gallery",
      subtitle: "Real work. Real events. No stock-photo pretending.",
      tiles: ["Close-up face paint", "Festival glam", "Corporate station", "Balloon art"],
      cta: { label: "View Gallery", to: "gallery" },
    },
    {
      id: "h-cta",
      type: "CTASection",
      title: "Ready to book?",
      subtitle: "Pick the right form. Faster quote. Less back-and-forth.",
      primary: { label: "Book / Contact", to: "contact" },
      secondary: { label: "View Services", to: "services" },
    },
  ],
};

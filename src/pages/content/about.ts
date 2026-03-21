import type { BuilderPage } from "./types";

export const aboutPage: BuilderPage = {
  slug: "about",
  navLabel: "About",
  seo: { title: "About | Fable Face Paint", description: "Meet Fable Face Paint and how we design memorable event experiences." },
  blocks: [
    {
      id: "a-hero",
      type: "Hero",
      headline: "About Fable Face Paint",
      subhead: "Creative event artistry with polished execution, guest-first flow, and reliable planning from first message to final photo.",
    },
    {
      id: "a-values",
      type: "TrustBar",
      items: ["Professional setup", "Fast line management", "Cosmetic-grade products", "Service tailored to your event"],
    },
    {
      id: "a-process",
      type: "ProcessSteps",
      title: "How We Work With You",
      steps: [
        { title: "Plan", desc: "We align on event type, guest count, timing, and service mix to build a clean run-of-show." },
        { title: "Prepare", desc: "We prep designs, supplies, and setup requirements so the day feels easy for you and your team." },
        { title: "Set Up", desc: "Our station is styled and organized for guest flow, visibility, and a premium on-site experience." },
        { title: "Deliver", desc: "We provide high-quality artistry while keeping pace with event energy and line movement." },
        { title: "Wrap", desc: "We close out efficiently, leaving your space clean and your guests with great memories." },
      ],
    },
    {
      id: "a-cta",
      type: "CTASection",
      title: "Want to build your ideal event setup?",
      subtitle: "Tell us your event size, timing, and vibe. We will recommend the right services and flow.",
      primary: { label: "Start Booking", to: "contact" },
      secondary: { label: "View Services", to: "services" },
    },
  ],
};

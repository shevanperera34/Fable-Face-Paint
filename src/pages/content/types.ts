export type PageSlug =
  | "home"
  | "birthdays"
  | "corporate"
  | "services"
  | "gallery"
  | "about"
  | "faq"
  | "contact";

export type SEO = {
  title: string;
  description: string;
};

export type CTA = { label: string; to: PageSlug };

export type ApprovedBlockType =
  | "HeroSplit"
  | "Hero"
  | "TrustBar"
  | "ServiceGrid"
  | "ProcessSteps"
  | "Pricing"
  | "GalleryTeaser"
  | "GalleryGrid"
  | "Testimonials"
  | "FAQPolicies"
  | "HoneyBookForm"
  | "CTASection";

export type BlockBase = { id: string; type: ApprovedBlockType };

export type HeroSplitBlock = BlockBase & {
  type: "HeroSplit";
  headline: string;
  subhead: string;
  leftCta: CTA;
  rightCta: CTA;
  mediaLabels?: string[];
};

export type HeroBlock = BlockBase & {
  type: "Hero";
  headline: string;
  subhead: string;
  primaryCta?: CTA;
};

export type TrustBarBlock = BlockBase & {
  type: "TrustBar";
  items: string[];
};

export type ServiceGridBlock = BlockBase & {
  type: "ServiceGrid";
  title?: string;
  subtitle?: string;
  services: { name: string; bestFor: string; speedBadge?: string; note?: string }[];
};

export type ProcessStepsBlock = BlockBase & {
  type: "ProcessSteps";
  title: string;
  steps: { title: string; desc: string }[];
};

export type PricingBlock = BlockBase & {
  type: "Pricing";
  title: string;
  subtitle?: string;
  cards: { name: string; priceLine: string; bullets: string[] }[];
};

export type GalleryTeaserBlock = BlockBase & {
  type: "GalleryTeaser";
  title: string;
  subtitle?: string;
  tiles: string[];
  cta: CTA;
};

export type GalleryGridBlock = BlockBase & {
  type: "GalleryGrid";
  title: string;
  filters: string[];
  items: { label: string; tag: string }[];
};

export type TestimonialsBlock = BlockBase & {
  type: "Testimonials";
  title: string;
  items: { quote: string; name: string }[];
};

export type FAQPoliciesBlock = BlockBase & {
  type: "FAQPolicies";
  title: string;
  groups: { heading: string; items: { q: string; a: string }[] }[];
};

export type HoneyBookFormBlock = BlockBase & {
  type: "HoneyBookForm";
  title: string;
  kind: "privateParty" | "corporate";
  honeyBookEmbedId: string;
  tag: string;
};

export type CTASectionBlock = BlockBase & {
  type: "CTASection";
  title: string;
  subtitle?: string;
  primary: CTA;
  secondary?: CTA;
};

export type ApprovedBlock =
  | HeroSplitBlock
  | HeroBlock
  | TrustBarBlock
  | ServiceGridBlock
  | ProcessStepsBlock
  | PricingBlock
  | GalleryTeaserBlock
  | GalleryGridBlock
  | TestimonialsBlock
  | FAQPoliciesBlock
  | HoneyBookFormBlock
  | CTASectionBlock;

export type BuilderPage = {
  slug: PageSlug;
  navLabel: string;
  seo: SEO;
  blocks: ApprovedBlock[];
};

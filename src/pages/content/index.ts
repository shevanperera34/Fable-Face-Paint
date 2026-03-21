export { homePage } from "./home";
export { smallEventsPage } from "./smallEvents";
export { largeEventsPage } from "./largeEvents";
export { servicesPage } from "./services";
export { galleryPage } from "./gallery";
export { aboutPage } from "./about";
export { faqPage } from "./faq";
export { contactPage } from "./contact";

import { aboutPage } from "./about";
import { contactPage } from "./contact";
import { faqPage } from "./faq";
import { galleryPage } from "./gallery";
import { homePage } from "./home";
import { largeEventsPage } from "./largeEvents";
import { servicesPage } from "./services";
import { smallEventsPage } from "./smallEvents";
import type { BuilderPage } from "./types";

export type {
  ApprovedBlock,
  CTASectionBlock,
  FAQPoliciesBlock,
  GalleryGridBlock,
  GalleryTeaserBlock,
  HeroBlock,
  HeroSplitBlock,
  HoneyBookFormBlock,
  PageSlug,
  PricingBlock,
  ProcessStepsBlock,
  ServiceGridBlock,
  TestimonialsBlock,
  TrustBarBlock,
} from "./types";

export const CONTENT: BuilderPage[] = [
  homePage,
  smallEventsPage,
  largeEventsPage,
  servicesPage,
  galleryPage,
  aboutPage,
  faqPage,
  contactPage,
];

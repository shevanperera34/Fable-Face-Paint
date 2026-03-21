import type { BuilderPage } from "./types";

const detailSourceHint = "Edit full service sections in src/pages/service-details/index.ts";

export const servicesPage: BuilderPage = {
  slug: "services",
  navLabel: "Services",
  seo: {
    title: "Services | Fable Face Paint",
    description: "Face painting, speed painting, bling bar, balloons, glitter tattoos, matte tattoos, and more.",
  },
  blocks: [
    { id: "s-hero", type: "Hero", headline: "Services overview", subhead: "Choose what fits your event size and flow." },
    {
      id: "s-grid",
      type: "ServiceGrid",
      services: [
        { name: "Face Painting", bestFor: detailSourceHint },
        { name: "Body Painting", bestFor: detailSourceHint },
        { name: "Bling Bar", bestFor: detailSourceHint },
        { name: "Balloon Twisting", bestFor: detailSourceHint },
        { name: "Glitter Tattoos", bestFor: detailSourceHint },
        { name: "Matte Tattoos", bestFor: detailSourceHint },
      ],
    },
  ],
};

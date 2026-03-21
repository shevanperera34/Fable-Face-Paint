import type { BuilderPage } from "./types";

export const galleryPage: BuilderPage = {
  slug: "gallery",
  navLabel: "Gallery",
  seo: { title: "Gallery | Fable Face Paint", description: "Real event photos across birthdays and corporate events." },
  blocks: [
    { id: "g-hero", type: "Hero", headline: "Gallery", subhead: "Real work across birthdays, festivals, and corporate events." },
    {
      id: "g-grid",
      type: "GalleryGrid",
      title: "Browse",
      filters: ["Face Paint", "Glitter + Bling", "Balloons", "Tattoos", "Corporate"],
      items: [
        { label: "Butterfly", tag: "Face Paint" },
        { label: "Tiger", tag: "Face Paint" },
        { label: "Corporate station", tag: "Corporate" },
        { label: "Balloon wand", tag: "Balloons" },
      ],
    },
  ],
};

import { getSiteUrl, withBasePath } from "@/config/site";

export type SeoRouteId =
  | "home"
  | "small-events"
  | "large-events"
  | "services"
  | "gallery"
  | "about"
  | "faq"
  | "contact";

export type RouteSeo = {
  routeId: SeoRouteId;
  title: string;
  description: string;
  keywords: string;
  path: string;
};

/** Short sitelink-style names Google often surfaces for internal links */
export const sitelinkLabelByRoute: Record<SeoRouteId, string> = {
  home: "Fable Face Paint",
  "small-events": "Small Events",
  "large-events": "Large Events",
  services: "Services",
  gallery: "Gallery",
  about: "About Us",
  faq: "FAQ",
  contact: "Book an Artist Now",
};

const routes: Record<SeoRouteId, Omit<RouteSeo, "routeId">> = {
  home: {
    path: "/",
    title: "Fable Face Paint",
    description:
      "Award-winning, professional face painting and event entertainment across Toronto & the GTA. Face, body & belly painting, matte & glitter tattoos, bling bar, balloon twisting—mobile booking for parties, corporate events, and festivals.",
    keywords:
      "Fable Face Paint, face painting Toronto, GTA face painting, event entertainment Toronto, award winning face painter, mobile face painter, corporate face painting, birthday party face painting",
  },
  "small-events": {
    path: "/small-events",
    title: "Small Events & Birthday Face Painting | Fable Face Paint (GTA)",
    description:
      "Face painting for birthdays, family parties, and small events across the GTA. Fable Face Paint brings a polished setup, fast guest flow, and memorable designs for kids and adults.",
    keywords:
      "birthday face painting Toronto, small party face painter, kids face painting GTA, private event face painting, Fable Face Paint",
  },
  "large-events": {
    path: "/large-events",
    title: "Corporate & Large Event Face Painting | Fable Face Paint",
    description:
      "Corporate activations, festivals, and high-traffic events in Toronto and the GTA. Fable Face Paint scales with multi-artist bookings, queue-friendly menus, and professional on-site execution.",
    keywords:
      "corporate face painting Toronto, festival face painting, brand activation face paint, large event entertainment GTA, Fable Face Paint",
  },
  services: {
    path: "/services",
    title: "Face Painting & Event Services | Fable Face Paint",
    description:
      "Services include face painting, body painting, glitter tattoos, bling bar, balloon twisting, and matte ink tattoos—mobile across the Greater Toronto Area for private and corporate clients.",
    keywords:
      "face painting services Toronto, glitter tattoos GTA, balloon twisting events, body painting Toronto, bling bar party, Fable Face Paint",
  },
  gallery: {
    path: "/gallery",
    title: "Face Painting Gallery | Fable Face Paint Toronto & GTA",
    description:
      "Browse Fable Face Paint’s gallery: event photos and service examples from Toronto-area birthdays, corporate events, and celebrations—professional face painting and party art.",
    keywords:
      "face painting gallery Toronto, event face paint photos, Fable Face Paint portfolio, GTA party artist gallery",
  },
  about: {
    path: "/about",
    title: "About Us | Fable Face Paint",
    description:
      "Meet the artist behind Fable Face Paint. Professional face painting, glitter tattoos, and event art across Toronto & the GTA—insured, mobile, and built for birthdays, corporate activations, and public events.",
    keywords:
      "about Fable Face Paint, face painter Toronto, Milena face paint, GTA event artist, professional face painting about",
  },
  faq: {
    path: "/faq",
    title: "FAQ | Booking Face Painting with Fable Face Paint",
    description:
      "Answers about booking, deposits, setup, products, and coverage area for Fable Face Paint’s mobile face painting in the GTA and Toronto.",
    keywords:
      "face painting FAQ Toronto, book face painter GTA, Fable Face Paint questions",
  },
  contact: {
    path: "/contact",
    title: "Book an Artist Now | Fable Face Paint",
    description:
      "Looking to book the best face painters in Toronto? Request a date for Fable Face Paint—small parties, corporate events, and large activations across the GTA. Quick replies and clear packages.",
    keywords:
      "book face painter Toronto, hire face painting GTA, Fable Face Paint booking, corporate face paint quote",
  },
};

export function normalizePathname(pathname: string, basePath: string): string {
  let p = pathname.split("?")[0] ?? "/";
  if (basePath && p.startsWith(basePath)) {
    p = p.slice(basePath.length) || "/";
  }
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

export function resolveRouterPath(pathname: string, basePath: string): string {
  const p = normalizePathname(pathname, basePath);
  if (p === "/birthdays") return "/small-events";
  if (p === "/corporate") return "/large-events";
  return p;
}

export function seoForPathname(pathname: string, basePath: string): RouteSeo {
  const p = resolveRouterPath(pathname, basePath);
  const map: Record<string, SeoRouteId> = {
    "/": "home",
    "/small-events": "small-events",
    "/large-events": "large-events",
    "/services": "services",
    "/gallery": "gallery",
    "/about": "about",
    "/faq": "faq",
    "/contact": "contact",
  };
  const routeId = map[p] ?? "home";
  const base = routes[routeId];
  return { routeId, ...base };
}

export function absoluteUrl(path: string): string {
  const origin = getSiteUrl();
  const rel = withBasePath(path);
  return `${origin}${rel}`;
}

function pageUrl(origin: string, path: string): string {
  const p = path === "/" ? "" : path;
  return `${origin.replace(/\/$/, "")}${p}`;
}

/**
 * Rich graph: Organization, WebSite, key WebPages (home / about / contact for sitelink-style clarity), ProfessionalService.
 * Sitelinks are chosen by Google; this aligns titles/descriptions with how you want the brand to appear.
 */
export function jsonLdOrganizationAndWebsite(): object {
  const url = getSiteUrl().replace(/\/$/, "");
  const home = routes.home;
  const about = routes.about;
  const contact = routes.contact;

  const homePageUrl = pageUrl(url, "/");
  const aboutPageUrl = pageUrl(url, about.path);
  const contactPageUrl = pageUrl(url, contact.path);

  const webPageHome = {
    "@type": "WebPage",
    "@id": `${homePageUrl}#webpage`,
    url: homePageUrl,
    name: sitelinkLabelByRoute.home,
    description: home.description,
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#organization` },
  };

  const webPageAbout = {
    "@type": "WebPage",
    "@id": `${aboutPageUrl}#webpage`,
    url: aboutPageUrl,
    name: sitelinkLabelByRoute.about,
    description: about.description,
    isPartOf: { "@id": `${url}/#website` },
    about: { "@id": `${url}/#organization` },
  };

  const webPageContact = {
    "@type": "WebPage",
    "@id": `${contactPageUrl}#webpage`,
    url: contactPageUrl,
    name: sitelinkLabelByRoute.contact,
    description: contact.description,
    isPartOf: { "@id": `${url}/#website` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: "Fable Face Paint",
        url,
        description: home.description,
        areaServed: [
          { "@type": "City", name: "Toronto" },
          { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
          { "@type": "State", name: "Ontario" },
        ],
        sameAs: ["https://www.instagram.com/fablefacepaint/"],
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: "Fable Face Paint",
        alternateName: "Fable Face Paint Toronto",
        description: home.description,
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en-CA",
        hasPart: [{ "@id": webPageHome["@id"] }, { "@id": webPageAbout["@id"] }, { "@id": webPageContact["@id"] }],
      },
      webPageHome,
      webPageAbout,
      webPageContact,
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#service`,
        name: "Fable Face Paint",
        url,
        serviceType: ["Face painting", "Body painting", "Glitter tattoos", "Event entertainment"],
        areaServed: ["Toronto", "Greater Toronto Area", "Ontario, Canada"],
        provider: { "@id": `${url}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${url}/#highlight-pages`,
        name: "Key pages",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: sitelinkLabelByRoute.about,
            url: aboutPageUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: sitelinkLabelByRoute.contact,
            url: contactPageUrl,
          },
        ],
      },
    ],
  };
}

export function renderJsonLdScript(data: object): string {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

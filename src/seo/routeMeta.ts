import { getSiteUrl, withBasePath } from "../config/site";

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

const routes: Record<SeoRouteId, Omit<RouteSeo, "routeId">> = {
  home: {
    path: "/",
    title: "Fable Face Paint | GTA Face Painting for Birthdays, Corporate & Events",
    description:
      "Fable Face Paint offers professional mobile face painting in the Greater Toronto Area: birthdays, corporate activations, festivals, and private events. Book insured artists for high-quality face painting and event art.",
    keywords:
      "Fable Face Paint, face painting Toronto, GTA face painting, mobile face painter, birthday face painting, corporate face painting, event face painting, professional face painter Ontario",
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
    title: "About Fable Face Paint | Professional GTA Face Painter",
    description:
      "Learn about Fable Face Paint: professional standards, insured mobile service, and artistry focused on guest experience at Toronto and GTA events.",
    keywords:
      "about Fable Face Paint, professional face painter Toronto, insured face painting GTA, mobile artist",
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
    title: "Book Face Painting | Contact Fable Face Paint (GTA)",
    description:
      "Contact Fable Face Paint to book mobile face painting for your Toronto or GTA event. Fast replies for dates, packages, and custom event needs.",
    keywords:
      "book face painting Toronto, contact face painter GTA, Fable Face Paint booking",
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

export function jsonLdOrganizationAndWebsite(): object {
  const url = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: "Fable Face Paint",
        url,
        description:
          "Professional mobile face painting and event artistry serving Toronto and the Greater Toronto Area (GTA).",
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Greater Toronto Area",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: "Fable Face Paint",
        publisher: { "@id": `${url}/#organization` },
        inLanguage: "en-CA",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#service`,
        name: "Fable Face Paint",
        url,
        serviceType: "Face painting and event entertainment",
        areaServed: ["Toronto", "Greater Toronto Area", "Ontario, Canada"],
        provider: { "@id": `${url}/#organization` },
      },
    ],
  };
}

export function renderJsonLdScript(data: object): string {
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`;
}

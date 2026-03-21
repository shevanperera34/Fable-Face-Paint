import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import grenzeBold from "./assets/fonts/Grenze/Grenze-Bold.ttf";
import grenzeSemiBold from "./assets/fonts/Grenze/Grenze-SemiBold.ttf";
import unifrakturCookBold from "./assets/fonts/UnifrakturCook-Bold.ttf";
import galleryImage1 from "./assets/Gallery/image-asset 1.webp";
import galleryImage2 from "./assets/Gallery/image-asset 2.webp";
import galleryImage3 from "./assets/Gallery/image-asset 3.webp";
import galleryImage4 from "./assets/Gallery/image-asset 4.webp";
import galleryImage5 from "./assets/Gallery/image-asset 5.webp";
import galleryImage6 from "./assets/Gallery/image-asset 6.webp";
import galleryImage7 from "./assets/Gallery/image-asset 7.webp";
import galleryImage8 from "./assets/Gallery/image-asset 8.webp";
import milenaImg from "./assets/Website Photos etc./IMG_0316 (3).jpg";
import heroFrameIllustration from "./assets/Website Photos etc./fablefacepaint website illustration.png";
import mossBackground from "./assets/Website Photos etc./moss-5619857_1920.jpg";
import IkigaiFooter from "./components/IkigaiFooter";
import ScatterHoverGallery from "./components/ScatterHoverGallery";
import awardWinner2026 from "./assets/Awards/Winner-2026.png";
import award1 from "./assets/Awards/1.png";
import award2 from "./assets/Awards/2.png";
import award3 from "./assets/Awards/3.png";
import award4 from "./assets/Awards/4.png";
import award5 from "./assets/Awards/5 (2).png";
import award6 from "./assets/Awards/6 (2).png";
import corporateLogo1 from "./assets/Corporate Logos/001ef16f0c7d49c2b60f4a22bf1ff1a1.png";
import corporateLogo2 from "./assets/Corporate Logos/162-1627127_rec-room-logo-png-transparent-png-removebg-preview.png";
import corporateLogo3 from "./assets/Corporate Logos/channels4_profile-removebg-preview.png";
import corporateLogo4 from "./assets/Corporate Logos/download.png";
import corporateLogo5 from "./assets/Corporate Logos/images-removebg-preview.png";
import corporateLogo6 from "./assets/Corporate Logos/images__1_-removebg-preview.png";
import corporateLogo7 from "./assets/Corporate Logos/Seneca-logo.svg.png";
import corporateLogo8 from "./assets/Corporate Logos/Untitled design (12).png";
import {
  CONTENT,
  type ApprovedBlock,
  type CTASectionBlock,
  type FAQPoliciesBlock,
  type GalleryGridBlock,
  type GalleryTeaserBlock,
  type HeroBlock,
  type HeroSplitBlock,
  type HoneyBookFormBlock,
  type PageSlug,
  type PricingBlock,
  type ProcessStepsBlock,
  type ServiceGridBlock,
  type TestimonialsBlock,
  type TrustBarBlock,
} from "./pages/content";
import { buildDefaultServiceDetail, getServiceDetailByName, type ServiceDetail } from "./pages/service-details";

/**
 * FFP Website Mockup (Builder-style, approved blocks only)
 *
 * Why this version will actually load:
 * - No weird citation tokens inside the code (those will break compilers).
 * - Safe guards for document/window (so it won’t crash in SSR).
 * - Single-file React component you can preview in Canvas.
 */

// -----------------------------
// Brand tokens
// -----------------------------
const brand = {
  name: "Fable Face Paint",
  tagline: "Magical artistry. Professional execution.",
  colors: {
    forest: "#0F2A1D",
    lilac: "#EDE6F7",
    magenta: "#D34AA8",
    ink: "#0B0B0B",
    paper: "#FFFFFF",
  },
};

const uiFont = '"Germania One", serif';
const titleFont = '"Grenze", serif';
const servicesHeadingFont = '"Grenze SemiBold", serif';
const contentMaxWidth = 1180;
const unifiedHoverTransition = "transform 0.22s ease, background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, color 0.22s ease, opacity 0.22s ease";
const unifiedDarkButtonHover: React.CSSProperties = {
  transform: "translateY(-1px)",
  background: "rgba(147, 28, 98, 0.38)",
  borderColor: "#931C62",
  boxShadow: "0 14px 36px rgba(147, 28, 98, 0.32)",
  color: "#FFFFFF",
  opacity: 1,
};
const unifiedLightButtonHover: React.CSSProperties = {
  transform: "translateY(-1px)",
  background: "rgba(211,74,168,0.92)",
  borderColor: "#931C62",
  boxShadow: "0 14px 30px rgba(211,74,168,0.30)",
  color: "#FFFFFF",
  opacity: 1,
};
const unifiedTextButtonHover: React.CSSProperties = {
  transform: "translateY(-1px)",
  background: "rgba(147, 28, 98, 0.18)",
  borderColor: "rgba(147, 28, 98, 0.78)",
  boxShadow: "0 10px 28px rgba(147, 28, 98, 0.22)",
  color: "#FFFFFF",
  opacity: 1,
};
const navTextGlowHover: React.CSSProperties = {
  color: "#F2B4DD",
  opacity: 1,
  textShadow: "0 0 10px rgba(211,74,168,0.65), 0 0 22px rgba(211,74,168,0.35)",
};
const trustIndicators = [
  {
    icon: "shield-plus",
    title: "$5M Liability Insured",
    subtitle: "Professional event coverage",
  },
  {
    icon: "sparkles",
    title: "Cosmetic-Grade Products",
    subtitle: "Pro kit & materials",
  },
  {
    icon: "mobile",
    title: "Fully Mobile",
    subtitle: "Serving the Greater Toronto Area",
  },
  {
    icon: "network",
    title: "Trusted Pro Network",
    subtitle: "Multi-artist support",
  },
];
const homeGalleryImages = [
  galleryImage1,
  galleryImage2,
  galleryImage3,
  galleryImage4,
  galleryImage5,
  galleryImage6,
  galleryImage7,
  galleryImage8,
];
const beltAwardImages = [award1, award2, award3, awardWinner2026, award4, award5, award6];
const corporateLogoImages = [
  { src: corporateLogo1, scale: 1.08 },
  { src: corporateLogo2, scale: 1.08 },
  { src: corporateLogo3, scale: 1.04 },
  { src: corporateLogo4, scale: 1.02 },
  { src: corporateLogo5, scale: 1.28 },
  { src: corporateLogo6, scale: 1.22 },
  { src: corporateLogo7, scale: 1.02 },
  { src: corporateLogo8, scale: 1.0 },
];

// -----------------------------
// Analytics shim (swap with posthog.capture in prod)
// -----------------------------
type TrackPayload = Record<string, string | number | boolean | null | undefined>;
function track(event: string, payload?: TrackPayload) {
  if (typeof window !== "undefined") {
    const w = window as any;
    if (w.posthog?.capture) {
      w.posthog.capture(event, payload ?? {});
      return;
    }
  }
  // eslint-disable-next-line no-console
  console.log("[track]", event, payload ?? {});
}

type GlitterSpark = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  life: number;
  rotation: number;
  color: string;
};

// -----------------------------
// Builder-like content model (editable JSON)
// -----------------------------
const canonicalPathBySlug: Record<PageSlug, string> = {
  home: "/",
  birthdays: "/small-events",
  corporate: "/large-events",
  services: "/services",
  gallery: "/gallery",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
};

const slugByPath: Record<string, PageSlug> = {
  "/": "home",
  "/small-events": "birthdays",
  "/birthdays": "birthdays",
  "/large-events": "corporate",
  "/corporate": "corporate",
  "/services": "services",
  "/gallery": "gallery",
  "/about": "about",
  "/faq": "faq",
  "/contact": "contact",
};

function normalizePathname(pathname: string) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized.length > 0 ? normalized : "/";
}

function pageSlugFromPath(pathname: string): PageSlug {
  return slugByPath[normalizePathname(pathname)] ?? "home";
}

// -----------------------------
// UI helpers
// -----------------------------
function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      data-native-cursor="true"
      style={{
        borderRadius: 16,
        padding: 18,
        background: "rgba(255,255,255,0.92)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        border: "1px solid rgba(0,0,0,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Button({
  label,
  onClick,
  variant = "primary",
}: {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) {
  const primary = variant === "primary";
  return (
    <HoverButton
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: 999,
        padding: "12px 16px",
        fontWeight: 800,
        fontSize: 14,
        fontFamily: uiFont,
        border: primary ? "none" : `1px solid rgba(255,255,255,0.30)`,
        background: primary ? brand.colors.magenta : "rgba(255,255,255,0.10)",
        color: brand.colors.paper,
        boxShadow: primary ? "0 10px 24px rgba(211,74,168,0.22)" : "none",
        transition: unifiedHoverTransition,
      }}
      hoverStyle={primary ? unifiedLightButtonHover : unifiedDarkButtonHover}
    >
      {label}
    </HoverButton>
  );
}

function HoverButton({
  children,
  onClick,
  style,
  hoverStyle,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  style: React.CSSProperties;
  hoverStyle?: React.CSSProperties;
  ariaLabel?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={ariaLabel}
      style={{
        ...style,
        ...(hovered ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

function CursorGlitterTrail() {
  const [enabled, setEnabled] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const [sparkles, setSparkles] = useState<GlitterSpark[]>([]);
  const [nativeCursorZone, setNativeCursorZone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const syncEnabled = () => setEnabled(mediaQuery.matches);

    syncEnabled();
    mediaQuery.addEventListener("change", syncEnabled);

    return () => mediaQuery.removeEventListener("change", syncEnabled);
  }, []);

  useEffect(() => {
    if (!enabled || typeof document === "undefined") return;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-cursor-glitter", "true");
    styleEl.textContent = `
      html, body {
        cursor: none !important;
      }

      button, a, [role="button"] {
        cursor: none !important;
      }

      [data-native-cursor="true"],
      [data-native-cursor="true"] * {
        cursor: auto !important;
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    const palette = ["#ffffff", "#f4c3e8", "#f7d8ff", "#fde68a"];
    let animationFrame = 0;
    let sparkleId = 0;
    let lastSpawn = 0;
    let previousTime = performance.now();

    const spawnSparkles = (x: number, y: number) => {
      const nextSparkles = Array.from({ length: 3 }, () => ({
        id: sparkleId++,
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        dx: (Math.random() - 0.5) * 1.6,
        dy: Math.random() * -1.2 - 0.2,
        size: Math.random() * 8 + 4,
        life: 1,
        rotation: Math.random() * 360,
        color: palette[Math.floor(Math.random() * palette.length)],
      }));

      setSparkles((current) => [...nextSparkles, ...current].slice(0, 36));
    };

    const handleMove = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const isNativeZone = Boolean(
        target?.closest('[data-native-cursor="true"], button, a, input, textarea, select, [role="button"]'),
      );

      setNativeCursorZone(isNativeZone);
      setCursor({ x: event.clientX, y: event.clientY, visible: !isNativeZone });

      if (isNativeZone) {
        setSparkles([]);
        return;
      }

      const now = performance.now();
      if (now - lastSpawn > 14) {
        spawnSparkles(event.clientX, event.clientY);
        lastSpawn = now;
      }
    };

    const handleLeave = () => setCursor((current) => ({ ...current, visible: false }));

    const tick = (time: number) => {
      const delta = Math.min((time - previousTime) / 16.67, 2);
      previousTime = time;

      setSparkles((current) =>
        current
          .map((sparkle) => ({
            ...sparkle,
            x: sparkle.x + sparkle.dx * delta,
            y: sparkle.y + sparkle.dy * delta + 0.18 * delta,
            life: sparkle.life - 0.045 * delta,
            rotation: sparkle.rotation + 4 * delta,
          }))
          .filter((sparkle) => sparkle.life > 0.02),
      );

      animationFrame = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 100,
      }}
    >
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          style={{
            position: "fixed",
            left: sparkle.x,
            top: sparkle.y,
            width: sparkle.size,
            height: sparkle.size,
            borderRadius: 999,
            opacity: sparkle.life,
            transform: `translate(-50%, -50%) rotate(${sparkle.rotation}deg) scale(${0.65 + sparkle.life * 0.8})`,
            background: `radial-gradient(circle, ${sparkle.color} 0%, rgba(255,255,255,0.92) 42%, rgba(255,255,255,0) 74%)`,
            boxShadow: `0 0 ${8 + sparkle.size}px rgba(242, 180, 221, ${sparkle.life * 0.45})`,
            mixBlendMode: "screen",
          }}
        />
      ))}

      {cursor.visible && !nativeCursorZone ? (
        <>
          <div
            style={{
              position: "fixed",
              left: cursor.x,
              top: cursor.y,
              width: 26,
              height: 26,
              transform: "translate(-50%, -50%)",
              borderRadius: 999,
              border: "1px solid rgba(244,195,232,0.65)",
              background: "radial-gradient(circle, rgba(255,255,255,0.22) 0%, rgba(211,74,168,0.12) 52%, rgba(211,74,168,0) 76%)",
              boxShadow: "0 0 20px rgba(211,74,168,0.32)",
            }}
          />
          <div
            style={{
              position: "fixed",
              left: cursor.x,
              top: cursor.y,
              width: 7,
              height: 7,
              transform: "translate(-50%, -50%)",
              borderRadius: 999,
              background: "#FFFFFF",
              boxShadow: "0 0 14px rgba(255,255,255,0.85), 0 0 24px rgba(211,74,168,0.55)",
            }}
          />
        </>
      ) : null}
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 10px",
        borderRadius: 999,
        fontSize: 12,
        background: "rgba(211,74,168,0.12)",
        border: "1px solid rgba(211,74,168,0.25)",
        color: brand.colors.ink,
        fontWeight: 800,
      }}
    >
      {text}
    </span>
  );
}

function SectionWrap({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "26px 18px" }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: 14 }}>
          {title && <div style={{ fontSize: 22, fontWeight: 900, color: brand.colors.paper, fontFamily: titleFont }}>{title}</div>}
          {subtitle && <div style={{ fontSize: 14, opacity: 0.9, color: "rgba(255,255,255,0.88)" }}>{subtitle}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

function MockImage({ label }: { label: string }) {
  return (
    <div
      style={{
        height: 150,
        borderRadius: 14,
        background: "rgba(255,255,255,0.10)",
        border: "1px dashed rgba(255,255,255,0.22)",
        display: "grid",
        placeItems: "center",
        color: "rgba(255,255,255,0.80)",
        fontSize: 12,
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      {label}
    </div>
  );
}

function HoneyBookEmbed({ kind, embedId, tag }: { kind: "privateParty" | "corporate"; embedId: string; tag: string }) {
  useEffect(() => {
    track("form_view", { kind, tag });
  }, [kind, tag]);

  return (
    <Card>
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontWeight: 950, fontSize: 16, color: brand.colors.ink }}>
          {kind === "corporate" ? "Corporate Inquiry (HoneyBook)" : "Private Party Inquiry (HoneyBook)"}
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, color: brand.colors.ink }}>
          Embed ID: <b>{embedId}</b> | Tag: <b>{tag}</b>
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, color: brand.colors.ink }}>
          Replace this block with the real HoneyBook embed snippet. This is just the structure.
        </div>
        <HoverButton
          onClick={() => track("form_submit_mock", { kind, tag })}
          style={{
            cursor: "pointer",
            borderRadius: 12,
            border: "none",
            padding: "12px 14px",
            fontWeight: 900,
            fontFamily: uiFont,
            background: brand.colors.magenta,
            color: brand.colors.paper,
            boxShadow: "0 10px 24px rgba(211,74,168,0.20)",
            transition: unifiedHoverTransition,
          }}
          hoverStyle={unifiedLightButtonHover}
        >
          Submit (mock)
        </HoverButton>
      </div>
    </Card>
  );
}

const serviceGalleryModules = import.meta.glob("./assets/srevice assets/*/Assets/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const eventPicVerticalModules = import.meta.glob("./assets/Event pics /vertical/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const eventPicHorizontalModules = import.meta.glob("./assets/Event pics /horizontal/*.{png,jpg,jpeg,webp,avif,gif,svg}", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const aboutVerticalEventImages = Object.values(eventPicVerticalModules).sort();
const aboutHorizontalEventImages = Object.values(eventPicHorizontalModules).sort();
const allEventPics = [...aboutVerticalEventImages, ...aboutHorizontalEventImages];

const galleryImagesByFolder = Object.entries(serviceGalleryModules).reduce<Record<string, string[]>>((acc, [filePath, imageUrl]) => {
  const folderMatch = filePath.match(/^\.\/assets\/srevice assets\/([^/]+)\/Assets\//);
  if (!folderMatch) return acc;

  const folderName = folderMatch[1];
  if (!acc[folderName]) acc[folderName] = [];
  acc[folderName].push(imageUrl);
  return acc;
}, {});

Object.values(galleryImagesByFolder).forEach((images) => images.sort());

function getGalleryImagesForService(serviceName: string) {
  const folderName = getServiceDetailByName(serviceName)?.assetFolder ?? serviceName;
  return galleryImagesByFolder[folderName] ?? [];
}

function normalizeServiceKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

const serviceFaqAliasByKey: Record<string, string[]> = {
  mattetattoos: ["matteinktattoos"],
  speedfacepainting: ["facepainting"],
  comingsoon: ["comingsoonairbrushtattoos", "airbrushtattoos"],
};
const serviceSpotlightNamesByPage: Record<"birthdays" | "corporate", string[]> = {
  birthdays: ["Face Painting", "Bling Bar", "Glitter Tattoos", "Balloon Twisting", "Matte Tattoos"],
  corporate: ["Face Painting", "Body Painting", "Bling Bar", "Glitter Tattoos", "Matte Tattoos", "Balloon Twisting"],
};

function ServicesSelector({
  services,
  isCompactLayout = false,
  fullPage = false,
}: {
  services: ServiceGridBlock["services"];
  isCompactLayout?: boolean;
  fullPage?: boolean;
}) {
  const [selectedServiceName, setSelectedServiceName] = useState<string | null>(null);
  const [hoveredServiceName, setHoveredServiceName] = useState<string | null>(null);
  const [importantInfoExpanded, setImportantInfoExpanded] = useState(true);
  const [serviceFaqExpanded, setServiceFaqExpanded] = useState(true);

  const selectedService = services.find((service) => service.name === selectedServiceName) ?? null;
  const hasSelectedService = Boolean(selectedService);
  const panelData: ServiceDetail | null = selectedService
    ? getServiceDetailByName(selectedService.name) ?? buildDefaultServiceDetail(selectedService.name)
    : null;
  const faqItemsByService = useMemo<Record<string, { q: string; a: string }[]>>(() => {
    const faqContentPage = CONTENT.find((page) => page.slug === "faq");
    if (!faqContentPage) return {};
    const faqBlock = faqContentPage.blocks.find((contentBlock) => contentBlock.type === "FAQPolicies") as FAQPoliciesBlock | undefined;
    if (!faqBlock) return {};
    return faqBlock.groups.reduce<Record<string, { q: string; a: string }[]>>((acc, group) => {
      acc[normalizeServiceKey(group.heading)] = group.items.map((item) => ({ q: item.q, a: item.a }));
      return acc;
    }, {});
  }, []);
  const serviceFaqItems = useMemo(() => {
    if (!selectedService) return [];
    const normalizedService = normalizeServiceKey(selectedService.name);
    const direct = faqItemsByService[normalizedService];
    if (direct && direct.length > 0) return direct;
    const aliases = serviceFaqAliasByKey[normalizedService] ?? [];
    for (const alias of aliases) {
      const aliasItems = faqItemsByService[alias];
      if (aliasItems && aliasItems.length > 0) return aliasItems;
    }
    return [];
  }, [faqItemsByService, selectedService]);
  const importantInfoPreview = panelData?.importantInfo.items[0]?.points[0] ?? "Tap expand to view setup, timing, restrictions, and requirements.";
  const serviceFaqPreview =
    serviceFaqItems.length > 0
      ? `${serviceFaqItems[0].q} — ${serviceFaqItems[0].a}`
      : "Tap expand to view service-specific questions and answers.";
  const galleryImages = selectedService ? getGalleryImagesForService(selectedService.name) : [];
  const previewImageByService = useMemo<Record<string, string | null>>(
    () =>
      services.reduce<Record<string, string | null>>((acc, service) => {
        const serviceImages = getGalleryImagesForService(service.name);
        if (!serviceImages.length) {
          acc[service.name] = null;
          return acc;
        }
        const randomIndex = Math.floor(Math.random() * serviceImages.length);
        acc[service.name] = serviceImages[randomIndex] ?? serviceImages[0] ?? null;
        return acc;
      }, {}),
    [services]
  );

  useEffect(() => {
    setImportantInfoExpanded(false);
    setServiceFaqExpanded(false);
  }, [selectedServiceName]);

  useEffect(() => {
    setImportantInfoExpanded(true);
  }, [selectedServiceName]);

  return (
    <div
      data-native-cursor="true"
      style={{
        borderRadius: fullPage ? 0 : 24,
        border: fullPage ? "none" : "1px solid rgba(255,255,255,0.12)",
        background: fullPage
          ? `url(${mossBackground}), url(/hero-bg.png)`
          : "linear-gradient(165deg, rgba(8,13,14,0.66), rgba(6,10,11,0.82))",
        backgroundSize: fullPage ? "cover, 120% auto" : undefined,
        backgroundPosition: fullPage ? "center center, center top" : undefined,
        backgroundRepeat: fullPage ? "no-repeat" : undefined,
        boxShadow: fullPage ? "none" : "0 26px 60px rgba(0,0,0,0.34)",
        padding: fullPage ? 0 : isCompactLayout ? "16px" : "22px",
        minHeight: fullPage && !isCompactLayout ? "calc(100vh - 82px)" : undefined,
        width: "100%",
        display: "grid",
        gap: fullPage ? 0 : 16,
      }}
    >
      <div
        style={{
          display: "grid",
          gap: 10,
          textAlign: fullPage || hasSelectedService ? "left" : "center",
          padding: fullPage ? (isCompactLayout ? "16px 14px 14px" : "24px 28px 20px") : undefined,
          borderBottom: fullPage ? "1px solid rgba(255,255,255,0.08)" : undefined,
          background: fullPage ? "rgba(10,16,28,0.22)" : undefined,
        }}
      >
        <div style={{ fontSize: "clamp(1.45rem, 2.2vw, 2.05rem)", fontWeight: 950, fontFamily: servicesHeadingFont }}>Services</div>
        <div
          style={{
            fontSize: "clamp(0.96rem, 1.15vw, 1.08rem)",
            lineHeight: 1.62,
            maxWidth: hasSelectedService ? "100%" : 760,
            margin: fullPage || hasSelectedService ? 0 : "0 auto",
            opacity: 0.9,
          }}
        >
          Click a service to learn more details. 
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gap: fullPage ? 0 : 14,
          alignItems: "stretch",
          gridTemplateColumns:
            hasSelectedService && !isCompactLayout
              ? fullPage
                ? "minmax(220px, 25vw) minmax(0, 1fr)"
                : "minmax(210px, 1fr) minmax(0, 3fr)"
              : "1fr",
          minHeight: fullPage && !isCompactLayout ? "calc(100vh - 164px)" : undefined,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: hasSelectedService ? "1fr" : isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))",
            gap: 10,
            alignContent: "start",
            padding: fullPage ? (isCompactLayout ? "14px" : "18px") : undefined,
            background: fullPage ? "rgba(12,20,33,0.0)" : undefined,
            borderRight: fullPage && hasSelectedService && !isCompactLayout ? "1px solid rgba(255,255,255,0.0)" : undefined,
          }}
        >
          {services.map((service) => {
            const selected = selectedServiceName === service.name;
            const soon = service.name.toLowerCase() === "coming soon";
            const previewImage = previewImageByService[service.name];
            const detail = getServiceDetailByName(service.name) ?? buildDefaultServiceDetail(service.name);
            const subtitle = detail.sections[0]?.heading ?? "Signature service experience";
            const teaser = detail.sections[0]?.paragraph ?? "Tap to view full service details.";
            const compactSelector = hasSelectedService;

            return (
              <button
                key={service.name}
                onClick={() => setSelectedServiceName(service.name)}
                onMouseEnter={() => setHoveredServiceName(service.name)}
                onMouseLeave={() => setHoveredServiceName((prev) => (prev === service.name ? null : prev))}
                style={{
                  cursor: "pointer",
                  textAlign: "left",
                  borderRadius: fullPage ? 16 : 14,
                  border: selected
                    ? fullPage
                      ? "1px solid rgba(242,180,221,0.95)"
                      : "1px solid rgba(211,74,168,0.85)"
                    : soon
                      ? fullPage
                        ? "1px solid rgba(211,74,168,0.34)"
                        : "1px solid rgba(211,74,168,0.34)"
                      : fullPage
                        ? "1px solid rgba(255,255,255,0.15)"
                        : "1px solid rgba(255,255,255,0.14)",
                  background: fullPage ? "rgba(6,10,18,0.78)" : "linear-gradient(155deg, rgba(255,255,255,0.08), rgba(14,16,20,0.75))",
                  backgroundSize: fullPage ? "cover" : undefined,
                  backgroundPosition: fullPage ? "center" : undefined,
                  backgroundRepeat: fullPage ? "no-repeat" : undefined,
                  color: brand.colors.paper,
                  padding: compactSelector ? "10px 12px" : "0",
                  boxShadow: fullPage ? "none" : selected ? "0 16px 30px rgba(147,28,98,0.24)" : "0 8px 16px rgba(0,0,0,0.16)",
                  backdropFilter: undefined,
                  transform: selected ? "translateY(-1px)" : "translateY(0)",
                  transition: unifiedHoverTransition,
                  minHeight: compactSelector ? 70 : 300,
                  display: "block",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {compactSelector ? (
                  <div style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.15, fontFamily: servicesHeadingFont, textAlign: "center" }}>{service.name}</div>
                ) : (
                  <>
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt={`${service.name} preview`}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          filter: "brightness(0.42) contrast(1.08) saturate(1.08)",
                          zIndex: 0,
                        }}
                      />
                    ) : null}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 1,
                        background:
                          "linear-gradient(180deg, rgba(4,8,14,0.56) 0%, rgba(4,8,14,0.74) 42%, rgba(4,8,14,0.96) 100%)",
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        zIndex: 2,
                        display: "grid",
                        gridTemplateRows: "auto 1fr auto",
                        height: "100%",
                        padding: isCompactLayout ? "12px" : "14px",
                        gap: 10,
                      }}
                    >
                      <div style={{ alignSelf: "end" }}>
                        <div style={{ fontSize: isCompactLayout ? 30 : 40, fontWeight: 900, lineHeight: 1.02, fontFamily: servicesHeadingFont, color: "#FFFFFF" }}>
                          {service.name}
                        </div>
                        <div style={{ marginTop: 6, fontSize: 16, lineHeight: 1.2, fontWeight: 700, color: "rgba(240,246,255,0.94)", fontFamily: uiFont }}>
                          {subtitle}
                        </div>
                        <div
                          style={{
                            marginTop: 10,
                            fontSize: 12,
                            lineHeight: 1.38,
                            color: "rgba(235,242,253,0.84)",
                            maxHeight: 36,
                            overflow: "hidden",
                          }}
                        >
                          {teaser}
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
                        <span
                          style={{
                            fontSize: 21,
                            lineHeight: 1,
                            fontFamily: servicesHeadingFont,
                            color: "#FFFFFF",
                            transition: "all 180ms ease",
                            ...(hoveredServiceName === service.name ? navTextGlowHover : null),
                          }}
                        >
                          View Service
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </button>
            );
          })}
        </div>

        {hasSelectedService && selectedService && panelData && (
          <div
            style={{
              position: "relative",
              top: undefined,
              maxHeight: undefined,
              overflowY: "visible",
              borderRadius: fullPage ? 0 : 20,
              border: fullPage ? "none" : "1px solid rgba(255,255,255,0.15)",
              background: fullPage ? "#0C1010" : "linear-gradient(165deg, rgba(233,230,241,0.98), rgba(244,240,250,0.96))",
              color: fullPage ? "#F1F4F8" : "#141414",
              padding: fullPage ? (isCompactLayout ? "16px 14px 20px" : "22px 26px 28px") : isCompactLayout ? "14px" : "18px",
              minHeight: fullPage && !isCompactLayout ? "calc(100vh - 164px)" : undefined,
              display: "grid",
              gap: 14,
              boxShadow: fullPage ? "none" : "0 22px 44px rgba(0,0,0,0.22)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.8rem)", lineHeight: 1.02, fontWeight: 900, fontFamily: servicesHeadingFont }}>
                {selectedService.name}
              </div>
              <HoverButton
                onClick={() => setSelectedServiceName(null)}
                style={{
                  cursor: "pointer",
                  borderRadius: 999,
                  border: fullPage ? "1px solid rgba(255,255,255,0.20)" : "1px solid rgba(0,0,0,0.16)",
                  padding: "7px 12px",
                  fontWeight: 800,
                  background: fullPage ? "rgba(255,255,255,0.06)" : "#FFFFFF",
                  color: fullPage ? "#F2F5FA" : "#111",
                  fontFamily: uiFont,
                  transition: unifiedHoverTransition,
                }}
                hoverStyle={fullPage ? { ...unifiedDarkButtonHover, background: "rgba(211,74,168,0.34)", color: "#FFF" } : { ...unifiedLightButtonHover, color: "#FFF", background: "#D34AA8" }}
              >
                Close
              </HoverButton>
            </div>

            <div style={{ display: "grid", gap: 14, gridTemplateColumns: isCompactLayout ? "1fr" : "1.2fr 1fr", alignItems: "start" }}>
              <div style={{ display: "grid", gap: 14 }}>
                {panelData.sections.map((section) => (
                  <div key={section.heading} style={{ display: "grid", gap: 8 }}>
                    <div style={{ fontSize: "clamp(1.22rem, 2.1vw, 1.85rem)", lineHeight: 1.06, fontFamily: uiFont, color: fullPage ? "#F6F8FC" : undefined }}>
                      {section.heading}
                    </div>
                    <div style={{ fontSize: "clamp(0.95rem, 1.12vw, 1.08rem)", lineHeight: 1.62, color: fullPage ? "rgba(236,240,247,0.92)" : undefined }}>
                      {section.paragraph}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  borderRadius: 16,
                  border: fullPage ? "1px solid rgba(255,255,255,0.14)" : "1px solid rgba(11,11,11,0.14)",
                  background: fullPage ? "#F2F0EE" : "rgba(255,255,255,0.64)",
                  overflow: "hidden",
                }}
              >
                <div style={{ padding: 12, display: "grid", gap: 10 }}>
                  {galleryImages.length > 0 ? (
                    <ScatterHoverGallery
                      images={galleryImages}
                      columns={isCompactLayout ? 2 : 3}
                      cardWidth={isCompactLayout ? 150 : 180}
                      cardHeight={isCompactLayout ? 120 : 140}
                    />
                  ) : (
                    <div
                      style={{
                        borderRadius: 12,
                        border: fullPage ? "1px dashed rgba(255,255,255,0.30)" : "1px dashed rgba(0,0,0,0.25)",
                        minHeight: 170,
                        display: "grid",
                        placeItems: "center",
                        textAlign: "center",
                        padding: 16,
                        fontSize: 14,
                        color: fullPage ? "rgba(235,239,247,0.76)" : "rgba(0,0,0,0.68)",
                      }}
                    >
                      Gallery assets for this service can be added in its `Assets` folder.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                borderRadius: 16,
                border: fullPage ? "1px solid #9A0E63" : "1px solid rgba(11,11,11,0.14)",
                background: fullPage ? "#F2F0EE" : "rgba(255,255,255,0.74)",
                color: fullPage ? "#1A1020" : undefined,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setImportantInfoExpanded((expanded) => !expanded)}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  border: "none",
                  background: fullPage ? "#F2F0EE" : "rgba(0,0,0,0.07)",
                  padding: "12px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: fullPage ? "#1A1020" : "#111",
                  fontFamily: uiFont,
                }}
              >
                <span style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.35rem)" }}>Important Info</span>
                <span style={{ fontSize: 12 }}>{importantInfoExpanded ? "Collapse" : "Expand"}</span>
              </button>

              {!importantInfoExpanded && (
                <div
                  style={{
                    padding: "10px 14px 12px",
                    borderTop: fullPage ? "1px solid #9A0E63" : "1px solid rgba(0,0,0,0.1)",
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: fullPage ? "rgba(26,16,32,0.84)" : "rgba(20,20,20,0.78)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {importantInfoPreview}
                </div>
              )}

              {importantInfoExpanded && (
                <div style={{ padding: "14px 14px 16px", display: "grid", gap: 16 }}>
                  {panelData.importantInfo.items.map((item) => (
                    <div key={item.title} style={{ display: "grid", gap: 8 }}>
                      <div style={{ fontSize: 30, lineHeight: 1, fontFamily: uiFont }}>{item.title}</div>
                      <ul style={{ margin: 0, paddingLeft: 19, display: "grid", gap: 8, color: fullPage ? "#1A1020" : undefined }}>
                        {item.points.map((point) => (
                          <li key={point} style={{ lineHeight: 1.55 }}>{point}</li>
                        ))}
                      </ul>
                      {item.subPoints && item.subPoints.length > 0 && (
                        <ul style={{ margin: 0, paddingLeft: 32, display: "grid", gap: 8, color: fullPage ? "#1A1020" : undefined }}>
                          {item.subPoints.map((point) => (
                            <li key={point} style={{ lineHeight: 1.55 }}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <div style={{ display: "grid", gap: 14, gridTemplateColumns: isCompactLayout ? "1fr" : "1fr 1fr" }}>
                    <div style={{ display: "grid", gap: 8 }}>
                      <div style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", lineHeight: 1.02, fontFamily: uiFont }}>Restrictions</div>
                      <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 7, color: fullPage ? "#1A1020" : undefined }}>
                        {panelData.importantInfo.restrictions.map((restriction) => (
                          <li key={restriction} style={{ lineHeight: 1.5 }}>{restriction}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ display: "grid", gap: 8 }}>
                      <div style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", lineHeight: 1.02, fontFamily: uiFont }}>Requirements</div>
                      <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 7, color: fullPage ? "#1A1020" : undefined }}>
                        {panelData.importantInfo.requirements.map((requirement) => (
                          <li key={requirement} style={{ lineHeight: 1.5 }}>{requirement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                borderRadius: 16,
                border: fullPage ? "1px solid #9A0E63" : "1px solid rgba(11,11,11,0.14)",
                background: fullPage ? "#F2F0EE" : "rgba(255,255,255,0.74)",
                color: fullPage ? "#1A1020" : undefined,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setServiceFaqExpanded((expanded) => !expanded)}
                style={{
                  width: "100%",
                  cursor: "pointer",
                  border: "none",
                  background: fullPage ? "#F2F0EE" : "rgba(0,0,0,0.07)",
                  padding: "12px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 900,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: fullPage ? "#1A1020" : "#111",
                  fontFamily: uiFont,
                }}
              >
                <span style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.35rem)" }}>Service FAQ</span>
                <span style={{ fontSize: 12 }}>{serviceFaqExpanded ? "Collapse" : "Expand"}</span>
              </button>

              {!serviceFaqExpanded && (
                <div
                  style={{
                    padding: "10px 14px 12px",
                    borderTop: fullPage ? "1px solid #9A0E63" : "1px solid rgba(0,0,0,0.1)",
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: fullPage ? "rgba(26,16,32,0.84)" : "rgba(20,20,20,0.78)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {serviceFaqPreview}
                </div>
              )}

              {serviceFaqExpanded && (
                <div style={{ padding: "14px 14px 16px", display: "grid", gap: 12 }}>
                  {serviceFaqItems.length > 0 ? (
                    serviceFaqItems.map((item) => (
                      <div
                        key={item.q}
                        style={{
                          display: "grid",
                          gap: 6,
                          borderRadius: 12,
                          border: fullPage ? "1px solid #9A0E63" : "1px solid rgba(0,0,0,0.11)",
                          background: fullPage ? "#F2F0EE" : "rgba(255,255,255,0.60)",
                          padding: "10px 12px",
                        }}
                      >
                        <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.3, fontWeight: 900, fontFamily: uiFont }}>
                          {item.q}
                        </div>
                        <div style={{ fontSize: "clamp(0.95rem, 1.06vw, 1.05rem)", lineHeight: 1.6, color: fullPage ? "rgba(26,16,32,0.92)" : "#1A1A1A" }}>
                          {item.a}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ fontSize: 15, lineHeight: 1.6, color: fullPage ? "rgba(26,16,32,0.84)" : "#2D2D2D" }}>
                      Service-specific FAQ entries will appear here once available.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FAQAccordion({ block }: { block: FAQPoliciesBlock }) {
  const [openByGroup, setOpenByGroup] = useState<Record<string, string | null>>({});

  useEffect(() => {
    setOpenByGroup((prev) => {
      const next: Record<string, string | null> = { ...prev };
      const activeHeadings = new Set(block.groups.map((group) => group.heading));

      Object.keys(next).forEach((heading) => {
        if (!activeHeadings.has(heading)) delete next[heading];
      });

      block.groups.forEach((group) => {
        const fallbackKey = group.items.length > 0 ? `${group.heading}-0` : null;
        const current = next[group.heading];
        const currentStillExists =
          typeof current === "string" &&
          group.items.some((_, index) => `${group.heading}-${index}` === current);
        next[group.heading] = currentStillExists ? current : fallbackKey;
      });

      return next;
    });
  }, [block.groups]);

  return (
    <SectionWrap>
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gap: 22 }}>
        <div style={{ textAlign: "center", display: "grid", gap: 8 }}>
          <div style={{ fontSize: "clamp(2rem, 3.4vw, 3.2rem)", fontWeight: 900, color: "#FFFFFF", fontFamily: titleFont }}>Frequently asked questions</div>
          <div style={{ fontSize: "clamp(1.05rem, 1.45vw, 1.2rem)", color: "rgba(228,236,246,0.86)", fontFamily: uiFont }}>
            Everything you need to know before booking.
          </div>
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          {block.groups.map((group) => (
            <div key={group.heading} style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  padding: "4px 2px 8px",
                  fontSize: "clamp(1.5rem, 2.2vw, 2.1rem)",
                  fontFamily: servicesHeadingFont,
                  lineHeight: 1.08,
                  color: "#FFFFFF",
                }}
              >
                {group.heading}
              </div>

              <div style={{ display: "grid", gap: 10 }}>
                {group.items.map((item, index) => {
                  const itemKey = `${group.heading}-${index}`;
                  const isOpen = openByGroup[group.heading] === itemKey;
                  return (
                    <div
                      key={item.q}
                      style={{
                        borderRadius: 16,
                        border: isOpen ? "1px solid rgba(242,180,221,0.52)" : "1px solid rgba(255,255,255,0.14)",
                        background: isOpen ? "linear-gradient(150deg, rgba(255,255,255,0.12), rgba(255,255,255,0.08))" : "rgba(255,255,255,0.03)",
                        boxShadow: isOpen ? "0 10px 30px rgba(211,74,168,0.18)" : "none",
                        overflow: "hidden",
                        transition: unifiedHoverTransition,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenByGroup((prev) => ({
                            ...prev,
                            [group.heading]: prev[group.heading] === itemKey ? null : itemKey,
                          }))
                        }
                        style={{
                          width: "100%",
                          textAlign: "left",
                          border: "none",
                          background: "transparent",
                          color: "#FFFFFF",
                          padding: "16px 18px",
                          display: "grid",
                          gridTemplateColumns: "30px 1fr",
                          gap: 12,
                          cursor: "pointer",
                          alignItems: "start",
                          fontFamily: uiFont,
                        }}
                      >
                        <span
                          aria-hidden
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: 999,
                            border: "1px solid rgba(255,255,255,0.4)",
                            display: "inline-grid",
                            placeItems: "center",
                            fontSize: 16,
                            lineHeight: 1,
                            color: isOpen ? "#F2B4DD" : "rgba(244,249,255,0.8)",
                            textShadow: isOpen ? "0 0 10px rgba(211,74,168,0.5)" : "none",
                          }}
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                        <div style={{ display: "grid", gap: 8 }}>
                          <div style={{ fontSize: "clamp(1.08rem, 1.45vw, 1.3rem)", lineHeight: 1.25, fontWeight: 900 }}>{item.q}</div>
                          {isOpen ? (
                            <div style={{ fontSize: 16, lineHeight: 1.55, color: "rgba(238,245,252,0.92)", maxWidth: 760 }}>{item.a}</div>
                          ) : null}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

function SiteWideGallery() {
  const serviceAssetCategories = useMemo(
    () =>
      Object.entries(galleryImagesByFolder)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([folderName, images]) => ({
          key: `service-${folderName}`,
          title: folderName,
          description: "Service asset collection",
          images,
          logoMode: false,
        })),
    []
  );

  const categories = useMemo(
    () => [
      {
        key: "signature",
        title: "Signature Gallery",
        description: "Core visual highlights used across the site.",
        images: homeGalleryImages,
        logoMode: false,
      },
      {
        key: "brand",
        title: "Brand + Atmosphere",
        description: "Hero and ambient visuals shaping the overall look.",
        images: [milenaImg, heroFrameIllustration, mossBackground],
        logoMode: false,
      },
      {
        key: "awards",
        title: "Awards + Recognition",
        description: "Award graphics and recognition assets.",
        images: beltAwardImages,
        logoMode: false,
      },
      {
        key: "partners",
        title: "Corporate Partners",
        description: "Partner and client logo assets.",
        images: corporateLogoImages.map((logo) => logo.src),
        logoMode: true,
      },
      ...serviceAssetCategories,
    ],
    [serviceAssetCategories]
  );

  return (
    <SectionWrap>
      <div style={{ display: "grid", gap: 20 }}>
        <div style={{ textAlign: "center", display: "grid", gap: 8 }}>
          <div style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", lineHeight: 1.02, fontWeight: 900, fontFamily: titleFont, color: "#FFFFFF" }}>
            Asset Gallery Atlas
          </div>
          <div style={{ fontSize: "clamp(1rem, 1.3vw, 1.15rem)", lineHeight: 1.55, color: "rgba(235,241,247,0.86)", maxWidth: 860, margin: "0 auto" }}>
            A categorized map of all image assets currently used across the site.
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map((category) => (
            <span
              key={category.key}
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                borderRadius: 999,
                padding: "6px 10px",
                border: "1px solid rgba(255,255,255,0.25)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(242,246,252,0.92)",
                fontFamily: uiFont,
              }}
            >
              {category.title} · {category.images.length}
            </span>
          ))}
        </div>

        <div style={{ display: "grid", gap: 18 }}>
          {categories.map((category) => (
            <div
              key={category.key}
              style={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "linear-gradient(165deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))",
                padding: "14px 14px 16px",
                display: "grid",
                gap: 12,
              }}
            >
              <div style={{ display: "grid", gap: 4 }}>
                <div style={{ fontSize: "clamp(1.3rem, 2.1vw, 2rem)", lineHeight: 1.05, fontFamily: servicesHeadingFont, color: "#FFFFFF" }}>{category.title}</div>
                <div style={{ fontSize: 14, color: "rgba(230,238,247,0.82)" }}>{category.description}</div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: category.logoMode ? "repeat(auto-fit, minmax(140px, 1fr))" : "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: 10,
                }}
              >
                {category.images.map((imageSrc, index) => (
                  <div
                    key={`${category.key}-${imageSrc}-${index}`}
                    style={{
                      position: "relative",
                      borderRadius: 12,
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.14)",
                      background: "rgba(10,16,22,0.45)",
                      minHeight: category.logoMode ? 110 : 150,
                    }}
                  >
                    <img
                      src={imageSrc}
                      alt={`${category.title} ${index + 1}`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: category.logoMode ? "contain" : "cover",
                        objectPosition: "center",
                        display: "block",
                        background: category.logoMode ? "rgba(255,255,255,0.9)" : undefined,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrap>
  );
}

function ServiceSpotlightCarousel({
  pageSlug,
  isCompactLayout,
}: {
  pageSlug: "birthdays" | "corporate";
  isCompactLayout: boolean;
}) {
  const touchStartXRef = useRef<number | null>(null);
  const spotlightItems = useMemo(() => {
    const serviceNames = serviceSpotlightNamesByPage[pageSlug];
    return serviceNames.map((serviceName) => {
      const detail = getServiceDetailByName(serviceName) ?? buildDefaultServiceDetail(serviceName);
      const sections = detail.sections.slice(0, 3);
      const previewImage = getGalleryImagesForService(serviceName)[0] ?? homeGalleryImages[0];
      return {
        serviceName,
        sections,
        image: previewImage,
      };
    });
  }, [pageSlug]);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = spotlightItems.length;
  const activeItem = spotlightItems[activeIndex % total];
  const goNext = useCallback(() => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % total);
  }, [total]);
  const goPrev = useCallback(() => {
    setActiveIndex((currentIndex) => (currentIndex - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % total);
    }, 15000);
    return () => window.clearInterval(interval);
  }, [total]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    const endX = event.changedTouches[0]?.clientX ?? null;
    touchStartXRef.current = null;
    if (startX === null || endX === null) return;
    const delta = endX - startX;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  if (!activeItem) return null;

  return (
    <div
      data-native-cursor="true"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        borderRadius: 24,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "linear-gradient(165deg, rgba(10,33,28,0.9), rgba(7,20,18,0.95))",
        boxShadow: "0 16px 42px rgba(0,0,0,0.3)",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: isCompactLayout ? "14px 14px 12px" : "18px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "grid", gap: 4 }}>
          <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.7 }}>Service Spotlight</div>
          <div style={{ fontSize: 48, lineHeight: 1.02, fontFamily: servicesHeadingFont }}>{activeItem.serviceName}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <HoverButton
            onClick={goPrev}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: unifiedHoverTransition,
            }}
            hoverStyle={unifiedDarkButtonHover}
            ariaLabel="Previous service"
          >
            ‹
          </HoverButton>
          <HoverButton
            onClick={goNext}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#FFFFFF",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: unifiedHoverTransition,
            }}
            hoverStyle={unifiedDarkButtonHover}
            ariaLabel="Next service"
          >
            ›
          </HoverButton>
        </div>
      </div>

      <div style={{ padding: isCompactLayout ? "0 14px 14px" : "0 20px 20px", display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "1.25fr 1fr", gap: 14, alignItems: "start" }}>
        <div style={{ display: "grid", gap: 12 }}>
          {activeItem.sections.map((section, index) => (
            <div key={`${activeItem.serviceName}-${section.heading}-${index}`} style={{ display: "grid", gap: 6 }}>
              <div style={{ fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)", lineHeight: 1.1, fontFamily: uiFont }}>{section.heading}</div>
              <div style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.03rem)", lineHeight: 1.6, opacity: 0.9 }}>{section.paragraph}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.16)",
            overflow: "hidden",
            height: isCompactLayout ? 220 : 260,
            background: "rgba(255,255,255,0.08)",
          }}
        >
          <img
            src={activeItem.image}
            alt={`${activeItem.serviceName} preview`}
            onError={(event) => {
              const fallback = homeGalleryImages[0] ?? "";
              if (!fallback) return;
              const imageEl = event.currentTarget;
              if (imageEl.dataset.fallbackApplied === "1") return;
              imageEl.dataset.fallbackApplied = "1";
              imageEl.src = fallback;
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      <div style={{ padding: isCompactLayout ? "0 14px 14px" : "0 20px 16px", display: "flex", gap: 6, flexWrap: "wrap" }}>
        {spotlightItems.map((item, index) => {
          const active = index === activeIndex;
          return (
            <button
              key={item.serviceName}
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{
                cursor: "pointer",
                border: active ? "1px solid rgba(211,74,168,0.82)" : "1px solid rgba(255,255,255,0.22)",
                background: active ? "rgba(211,74,168,0.28)" : "rgba(255,255,255,0.06)",
                color: "#FFFFFF",
                borderRadius: 999,
                padding: "6px 10px",
                fontSize: 12,
                fontFamily: uiFont,
                transition: unifiedHoverTransition,
              }}
            >
              {item.serviceName}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MiniGoogleReviews({
  pageSlug,
  isCompactLayout,
}: {
  pageSlug: "birthdays" | "corporate";
  isCompactLayout: boolean;
}) {
  const reviewItems =
    pageSlug === "birthdays"
      ? [
          {
            quote: "Milena is truly wonderful and efficient. Her work is amazing and I will continue to use her.",
            author: "Stina Baby",
            time: "10 months ago",
          },
          {
            quote: "Hired her for my son's 6th birthday party. She is punctual, professional, and incredibly talented.",
            author: "Anastasia Shvets",
            time: "10 months ago",
          },
          {
            quote: "Wonderful service and super cute face painting designs. Milena made the event feel easy.",
            author: "Jessica F",
            time: "11 months ago",
          },
        ]
      : [
          {
            quote: "On-time, polished, and very easy to coordinate for our larger activation.",
            author: "Corporate Client",
            time: "8 months ago",
          },
          {
            quote: "Fast guest flow, beautiful work, and truly professional communication from start to finish.",
            author: "Event Team Lead",
            time: "9 months ago",
          },
          {
            quote: "Reliable setup and great with crowds. Guests loved the experience all day.",
            author: "Festival Organizer",
            time: "1 year ago",
          },
        ];

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: isCompactLayout ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 10,
          flexDirection: isCompactLayout ? "column" : "row",
        }}
      >
        <div style={{ display: "grid", gap: 2 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.72, fontFamily: uiFont }}>Google Reviews</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 22, fontWeight: 900 }}>5.0</span>
            <span style={{ fontSize: 16, color: "#F9CA24", letterSpacing: "0.08em" }}>★★★★★</span>
            <span style={{ fontSize: 13, opacity: 0.66 }}>(59)</span>
          </div>
        </div>
        <a
          href="https://www.google.com/search?q=Fable+Face+Paint+Google+Reviews"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#FFFFFF",
            padding: "8px 12px",
            fontSize: 12,
            fontWeight: 800,
            fontFamily: uiFont,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            background: "rgba(255,255,255,0.06)",
          }}
        >
          Review us on Google
        </a>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))",
          gap: 8,
        }}
      >
        {reviewItems.map((review, index) => (
          <div
            key={`${pageSlug}-mini-review-${index}`}
            style={{
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)",
              background: "rgba(255,255,255,0.05)",
              padding: "10px 10px 12px",
              display: "grid",
              gap: 6,
              minHeight: 120,
            }}
          >
            <div style={{ color: "#F9CA24", letterSpacing: "0.08em", fontSize: 13 }}>★★★★★</div>
            <div
              style={{
                fontSize: 13,
                lineHeight: 1.45,
                opacity: 0.9,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {review.quote}
            </div>
            <div style={{ marginTop: "auto", fontSize: 12, opacity: 0.72 }}>
              <span style={{ fontWeight: 800 }}>{review.author}</span> · {review.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutExperiencePage({
  onNavigate,
  isCompactLayout,
}: {
  onNavigate: (to: PageSlug) => void;
  isCompactLayout: boolean;
}) {
  const featuredReviews = [
    {
      quote: "Milena is truly wonderful and efficient. Her work is amazing and I will continue to use her.",
      author: "Stina Baby",
      time: "10 months ago",
      initial: "S",
      image: aboutVerticalEventImages[0] ?? null,
    },
    {
      quote: "Hired her for my son's 6th birthday party. She is punctual, professional, and incredibly talented.",
      author: "Anastasia Shvets",
      time: "10 months ago",
      initial: "A",
      image: null,
    },
    {
      quote: "Wonderful service and super cute face painting designs. Milena made the event feel easy.",
      author: "Jessica F",
      time: "11 months ago",
      initial: "J",
      image: null,
    },
    {
      quote: "Beautiful designs and such a calm setup. Guests loved the experience from start to finish.",
      author: "Birthday Client",
      time: "1 year ago",
      initial: "B",
      image: null,
    },
    {
      quote: "Reliable communication, on-time arrival, and stunning work quality. Exactly what we needed.",
      author: "Event Planner",
      time: "1 year ago",
      initial: "E",
      image: null,
    },
  ];
  const verticalImages = aboutVerticalEventImages.length > 0 ? aboutVerticalEventImages : homeGalleryImages;
  const horizontalImages = aboutHorizontalEventImages.length > 0 ? aboutHorizontalEventImages : homeGalleryImages;
  const shuffledVerticalImages = useMemo(() => {
    const copy = [...verticalImages];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }, [verticalImages]);
  const aboutTopRowImages = useMemo(() => {
    if (shuffledVerticalImages.length >= 4) return shuffledVerticalImages.slice(0, 4);
    if (shuffledVerticalImages.length === 0) return homeGalleryImages.slice(0, 4);
    const fill = [...shuffledVerticalImages];
    while (fill.length < 4) {
      fill.push(shuffledVerticalImages[fill.length % shuffledVerticalImages.length]);
    }
    return fill;
  }, [shuffledVerticalImages]);
  const aboutBottomImage = useMemo(() => {
    if (horizontalImages.length === 0) return homeGalleryImages[0] ?? null;
    const randomIndex = Math.floor(Math.random() * horizontalImages.length);
    return horizontalImages[randomIndex] ?? horizontalImages[0] ?? null;
  }, [horizontalImages]);
  const [reviewStartIndex, setReviewStartIndex] = useState(0);
  const visibleReviewCount = isCompactLayout ? 1 : 3;
  const visibleReviewCards = useMemo(() => {
    const count = Math.min(visibleReviewCount, featuredReviews.length);
    return Array.from({ length: count }, (_, offset) => featuredReviews[(reviewStartIndex + offset) % featuredReviews.length]);
  }, [featuredReviews, reviewStartIndex, visibleReviewCount]);
  const reviewPageCount = Math.max(1, featuredReviews.length);
  const goNextReview = () => setReviewStartIndex((current) => (current + 1) % featuredReviews.length);
  const goPrevReview = () => setReviewStartIndex((current) => (current - 1 + featuredReviews.length) % featuredReviews.length);

  return (
    <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: isCompactLayout ? "20px 14px 28px" : "26px 18px 40px", display: "grid", gap: 20 }}>
      <section
        style={{
          padding: isCompactLayout ? "12px 4px" : "16px 6px",
          display: "grid",
          gap: 12,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", lineHeight: 1.02, fontWeight: 900, fontFamily: titleFont }}>Meet the Artist</div>
        <div style={{ fontSize: "clamp(1rem, 1.45vw, 1.2rem)", lineHeight: 1.55, color: "rgba(235,242,251,0.9)" }}>
          Professional Event Body Art experiences centred around the art of Face Painting
        </div>
        <div
          style={{
            padding: "4px 0",
            fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
            color: "rgba(244,248,255,0.94)",
            fontFamily: uiFont,
          }}
        >
          Trusted, insured, and 5-star rated across Vaughan and the GTA
        </div>
      </section>

      <section
        style={{
          padding: isCompactLayout ? "4px 4px" : "8px 6px",
          display: "grid",
          gap: 12,
        }}
      >
        <div style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", lineHeight: 1.05, fontFamily: servicesHeadingFont }}>Hi, I&apos;m Milena.</div>
        <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "0.9fr 1.1fr", gap: 14, alignItems: "start" }}>
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.2)",
              minHeight: isCompactLayout ? 260 : 360,
            }}
          >
            <img src={milenaImg} alt="Milena portrait" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div style={{ display: "grid", gap: 10, fontSize: "clamp(1.105rem, 1.3vw, 1.205rem)", lineHeight: 1.68, color: "rgba(234,240,247,0.94)" }}>
            <p style={{ margin: 0 }}>
              I run Fable Face Paint, a professional mobile face painting service trusted across Vaughan and the GTA. I bring a polished, reliable experience to birthdays, schools, and corporate events, with high-quality designs and event-ready logistics.
            </p>
            <p style={{ margin: 0 }}>
              I&apos;ve loved face painting since 2014, and I started Fable Face Paint in 2022. What I love most is seeing guests light up in the chair and giving clients an experience that feels smooth from start to finish.
            </p>
            <p style={{ margin: 0 }}>
              For me, it&apos;s not just about the design. It&apos;s about how the whole event feels. Clean setup, clear communication, happy guests, and one less thing for you to stress about.
            </p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: isCompactLayout ? "6px 4px" : "10px 6px",
          display: "grid",
          gap: 14,
        }}
      >
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ fontSize: "clamp(1.4rem, 2.4vw, 2.1rem)", lineHeight: 1.05, fontFamily: servicesHeadingFont }}>Why I Started Fable</div>
          <div style={{ fontSize: "clamp(0.98rem, 1.2vw, 1.08rem)", lineHeight: 1.68, color: "rgba(235,241,248,0.92)" }}>
            One of my happiest childhood memories was getting my face painted. I started this business because I wanted to give that same feeling to other people, but in a way that also feels professional, calm, and easy for the adults planning the event.
          </div>
          <div style={{ fontSize: "clamp(0.98rem, 1.2vw, 1.08rem)", lineHeight: 1.68, color: "rgba(235,241,248,0.92)" }}>
            That balance matters to me. The experience should feel magical for guests and stress-free for the person booking it.
          </div>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "repeat(2, 1fr)" : "repeat(4, minmax(0, 1fr))", gap: 10 }}>
            {aboutTopRowImages.map((imageSrc, index) => (
              <div
                key={`${imageSrc}-${index}`}
                style={{
                  borderRadius: 14,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.16)",
                  minHeight: isCompactLayout ? 95 : 120,
                }}
              >
                <img src={imageSrc} alt={`Event portrait ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            ))}
          </div>
          {aboutBottomImage ? (
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.16)",
                minHeight: isCompactLayout ? 170 : 230,
                width: isCompactLayout ? "100%" : "50%",
                justifySelf: "center",
              }}
            >
              <img src={aboutBottomImage} alt="Event horizontal feature" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ) : null}
        </div>
      </section>

      <section style={{ display: "grid", gap: 12 }}>
        <div style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", lineHeight: 1.05, fontFamily: servicesHeadingFont }}>Why Families and Event Teams Trust Fable</div>
        <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          {[
            {
              title: "Professional products",
              body: "Cosmetic-grade materials and clean application practices.",
            },
            {
              title: "Insured and event-ready",
              body: "$5M liability insurance and a setup built for real event environments.",
            },
            {
              title: "Scalable for bigger events",
              body: "Additional artist coverage can be arranged for larger bookings.",
            },
          ].map((card) => (
            <div
              key={card.title}
              style={{
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.16)",
                background: "linear-gradient(165deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                padding: "16px 14px",
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.35rem)", lineHeight: 1.1, fontFamily: uiFont }}>{card.title}</div>
              <div style={{ fontSize: "clamp(0.94rem, 1.05vw, 1rem)", lineHeight: 1.58, color: "rgba(235,241,248,0.9)" }}>{card.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gap: 14,
          borderRadius: 26,
          background: "rgba(233,231,244,0.98)",
          padding: isCompactLayout ? "14px 10px 18px" : "18px 14px 22px",
          color: "#111",
        }}
      >
        <div style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", lineHeight: 1.05, fontFamily: servicesHeadingFont }}>What Clients Are Saying</div>

        <div
          style={{
            borderRadius: 14,
            border: "1px solid rgba(17,17,17,0.08)",
            background: "rgba(255,255,255,0.62)",
            padding: isCompactLayout ? "12px 10px" : "14px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "grid", gap: 4 }}>
            <div style={{ fontSize: 33, lineHeight: 1, fontFamily: uiFont }}>
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#DB4437" }}>o</span>
              <span style={{ color: "#F4B400" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#0F9D58" }}>l</span>
              <span style={{ color: "#DB4437" }}>e</span> Reviews
            </div>
            <div style={{ fontSize: 32, lineHeight: 1, fontWeight: 900, display: "flex", alignItems: "center", gap: 10 }}>
              <span>5.0</span>
              <span style={{ color: "#F4B400", letterSpacing: "0.03em" }}>★★★★★</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(20,20,20,0.55)" }}>(59)</span>
            </div>
          </div>
          <HoverButton
            onClick={() => {
              if (typeof window !== "undefined") {
                window.open("https://www.google.com/search?q=Fable+Face+Paint+Google+Reviews", "_blank", "noopener,noreferrer");
              }
            }}
            style={{
              cursor: "pointer",
              borderRadius: 999,
              border: "none",
              padding: "11px 20px",
              fontWeight: 800,
              background: "#2B77E7",
              color: "#FFFFFF",
              fontFamily: uiFont,
              transition: unifiedHoverTransition,
            }}
            hoverStyle={{ transform: "translateY(-1px)", background: "#3A87F0", boxShadow: "0 10px 24px rgba(43,119,231,0.25)", color: "#FFF" }}
          >
            Review us on Google
          </HoverButton>
        </div>

        <div style={{ position: "relative" }}>
          {!isCompactLayout && (
            <button
              type="button"
              onClick={goPrevReview}
              style={{
                position: "absolute",
                left: -10,
                top: "42%",
                transform: "translateY(-50%)",
                width: 42,
                height: 42,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: "rgba(120,120,124,0.92)",
                color: "#FFFFFF",
                fontSize: 28,
                lineHeight: 1,
                zIndex: 2,
              }}
              aria-label="Previous reviews"
            >
              ‹
            </button>
          )}
          {!isCompactLayout && (
            <button
              type="button"
              onClick={goNextReview}
              style={{
                position: "absolute",
                right: -10,
                top: "42%",
                transform: "translateY(-50%)",
                width: 42,
                height: 42,
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                background: "rgba(120,120,124,0.92)",
                color: "#FFFFFF",
                fontSize: 28,
                lineHeight: 1,
                zIndex: 2,
              }}
              aria-label="Next reviews"
            >
              ›
            </button>
          )}
          <div style={{ display: "grid", gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))", gap: 12 }}>
            {visibleReviewCards.map((review) => (
              <div
                key={`${review.author}-${review.quote}`}
                style={{
                  borderRadius: 14,
                  border: "1px solid rgba(17,17,17,0.08)",
                  background: "rgba(255,255,255,0.68)",
                  padding: "14px 12px",
                  display: "grid",
                  gap: 10,
                  justifyItems: "center",
                  textAlign: "center",
                }}
              >
                {review.image ? (
                  <img src={review.image} alt={`${review.author} review`} style={{ width: 96, height: 96, borderRadius: 8, objectFit: "cover", display: "block" }} />
                ) : null}
                <div style={{ fontSize: 22, lineHeight: 1, color: "#F4B400", letterSpacing: "0.03em" }}>★★★★★</div>
                <div
                  style={{
                    fontSize: 17,
                    lineHeight: 1.46,
                    color: "rgba(25,25,25,0.94)",
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {review.quote}
                </div>
                <div style={{ fontSize: 14, color: "rgba(55,55,55,0.56)" }}>Read more</div>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 999,
                    background: "#6A4A3F",
                    color: "#FFF",
                    display: "grid",
                    placeItems: "center",
                    fontSize: 22,
                    fontFamily: uiFont,
                  }}
                >
                  {review.initial}
                </div>
                <div style={{ display: "grid", gap: 2 }}>
                  <div style={{ fontSize: 30, lineHeight: 1, fontFamily: uiFont }}>{review.author}</div>
                  <div style={{ fontSize: 14, color: "rgba(55,55,55,0.66)" }}>{review.time}</div>
                </div>
                <div style={{ fontSize: 41, lineHeight: 1, fontFamily: uiFont }}>
                  <span style={{ color: "#4285F4" }}>G</span>
                  <span style={{ color: "#DB4437" }}>o</span>
                  <span style={{ color: "#F4B400" }}>o</span>
                  <span style={{ color: "#4285F4" }}>g</span>
                  <span style={{ color: "#0F9D58" }}>l</span>
                  <span style={{ color: "#DB4437" }}>e</span>
                </div>
              </div>
            ))}
          </div>
          {isCompactLayout && (
            <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 10 }}>
              <button
                type="button"
                onClick={goPrevReview}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: "rgba(120,120,124,0.92)",
                  color: "#FFFFFF",
                  fontSize: 24,
                  lineHeight: 1,
                }}
                aria-label="Previous reviews"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNextReview}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  background: "rgba(120,120,124,0.92)",
                  color: "#FFFFFF",
                  fontSize: 24,
                  lineHeight: 1,
                }}
                aria-label="Next reviews"
              >
                ›
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {Array.from({ length: reviewPageCount }).map((_, index) => (
            <span
              key={`dot-${index}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: index === reviewStartIndex ? "rgba(25,25,25,0.9)" : "rgba(25,25,25,0.28)",
                display: "inline-block",
              }}
            />
          ))}
        </div>
      </section>

      <section
        style={{
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.16)",
          background: "linear-gradient(165deg, rgba(255,255,255,0.08), rgba(255,255,255,0.05))",
          padding: isCompactLayout ? "14px" : "16px 18px",
          fontSize: "clamp(0.96rem, 1.12vw, 1.06rem)",
          lineHeight: 1.65,
          color: "rgba(237,243,250,0.93)",
        }}
      >
        Bookings are based on time, not guest count, so we can recommend the best-fit setup for your event and guest flow.
      </section>

      <section
        style={{
          borderRadius: 24,
          border: "1px solid rgba(255,255,255,0.18)",
          background: "linear-gradient(165deg, rgba(147,28,98,0.28), rgba(11,23,39,0.96))",
          padding: isCompactLayout ? "18px 14px" : "22px 24px",
          display: "grid",
          gap: 10,
        }}
      >
        <div style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)", lineHeight: 1.05, fontFamily: servicesHeadingFont }}>Ready to plan your event?</div>
        <div style={{ fontSize: "clamp(0.98rem, 1.2vw, 1.08rem)", lineHeight: 1.65, color: "rgba(238,245,252,0.92)" }}>
          Tell us a little about your event and we&apos;ll confirm availability, recommend the best-fit setup, and guide you through the next steps.
        </div>
        <div>
          <HoverButton
            onClick={() => onNavigate("contact")}
            style={{
              cursor: "pointer",
              borderRadius: 999,
              border: "none",
              padding: "13px 18px",
              fontWeight: 900,
              background: "#A7E4C4",
              color: "#10261E",
              fontFamily: uiFont,
              transition: unifiedHoverTransition,
            }}
            hoverStyle={{ transform: "translateY(-1px)", background: "#B9F0D4", boxShadow: "0 16px 30px rgba(167,228,196,0.22)", color: "#10261E" }}
          >
            Request a Quote
          </HoverButton>
        </div>
      </section>
    </div>
  );
}

// -----------------------------
// Approved block renderer (whitelist only)
// -----------------------------
function renderBlock(block: ApprovedBlock, goTo: (to: PageSlug) => void, pageSlug?: PageSlug, isCompactLayout?: boolean) {
  switch (block.type) {
    case "HeroSplit": {
      const b = block as HeroSplitBlock;
      return (
        <SectionWrap title={b.headline} subtitle={b.subhead}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 16, alignItems: "stretch" }}>
            <Card style={{ background: "rgba(255,255,255,0.94)" }}>
              <div style={{ fontSize: 28, fontWeight: 950, lineHeight: 1.1, color: brand.colors.ink }}>{brand.name}</div>
              <div style={{ marginTop: 10, fontSize: 14, opacity: 0.85, color: brand.colors.ink }}>{brand.tagline}</div>
              <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Button label={b.leftCta.label} onClick={() => goTo(b.leftCta.to)} />
                <Button label={b.rightCta.label} onClick={() => goTo(b.rightCta.to)} variant="secondary" />
              </div>
              <div style={{ marginTop: 14, fontSize: 13, opacity: 0.75, color: brand.colors.ink }}>
                Builder-style editing stays safe because only approved blocks are allowed.
              </div>
            </Card>

            <div style={{ display: "grid", gap: 12 }}>
              {(b.mediaLabels ?? ["Hero media"]).map((m) => (
                <MockImage key={m} label={m} />
              ))}
            </div>
          </div>
        </SectionWrap>
      );
    }

    case "Hero": {
      const b = block as HeroBlock;

      if (pageSlug === "birthdays" || pageSlug === "corporate" || pageSlug === "services") {
        return null;
      }

      return (
        <SectionWrap>
          <Card style={{ background: "rgba(255,255,255,0.94)" }}>
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ fontSize: 26, fontWeight: 950, color: brand.colors.ink }}>{b.headline}</div>
              <div style={{ opacity: 0.85, color: brand.colors.ink }}>{b.subhead}</div>
              {b.primaryCta && (
                <div>
                  <HoverButton
                    onClick={() => goTo(b.primaryCta!.to)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 999,
                      border: "none",
                      padding: "12px 16px",
                      fontWeight: 900,
                      fontFamily: uiFont,
                      background: brand.colors.magenta,
                      color: brand.colors.paper,
                      boxShadow: "0 10px 24px rgba(211,74,168,0.22)",
                      transition: unifiedHoverTransition,
                    }}
                    hoverStyle={unifiedLightButtonHover}
                  >
                    {b.primaryCta.label}
                  </HoverButton>
                </div>
              )}
            </div>
          </Card>
        </SectionWrap>
      );
    }

    case "TrustBar": {
      const b = block as TrustBarBlock;
      return (
        <SectionWrap>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {b.items.map((it) => (
              <Card key={it} style={{ padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 12,
                      background: "rgba(15,42,29,0.10)",
                      display: "grid",
                      placeItems: "center",
                      fontWeight: 900,
                      color: brand.colors.ink,
                    }}
                  >
                    ✓
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 900, color: brand.colors.ink }}>{it}</div>
                </div>
              </Card>
            ))}
          </div>
        </SectionWrap>
      );
    }

    case "ServiceGrid": {
      const b = block as ServiceGridBlock;

      if (pageSlug === "services") {
        return <ServicesSelector services={b.services} isCompactLayout={Boolean(isCompactLayout)} fullPage />;
      }

      return (
        <SectionWrap title={b.title} subtitle={b.subtitle}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {b.services.map((sv) => (
              <Card key={sv.name} style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontWeight: 950, color: brand.colors.ink }}>{sv.name}</div>
                  {sv.speedBadge && <Badge text={sv.speedBadge} />}
                </div>
                <div style={{ fontSize: 13, opacity: 0.85, color: brand.colors.ink }}>{sv.bestFor}</div>
                {sv.note && <div style={{ fontSize: 12, opacity: 0.75, color: brand.colors.ink }}>{sv.note}</div>}
              </Card>
            ))}
          </div>
        </SectionWrap>
      );
    }

    case "ProcessSteps": {
      const b = block as ProcessStepsBlock;
      return (
        <SectionWrap title={b.title}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
            {b.steps.map((st, idx) => (
              <Card key={idx} style={{ padding: 14 }}>
                <div style={{ fontWeight: 950, marginBottom: 6, color: brand.colors.ink }}>
                  {idx + 1}. {st.title}
                </div>
                <div style={{ fontSize: 12, opacity: 0.85, color: brand.colors.ink }}>{st.desc}</div>
              </Card>
            ))}
          </div>
        </SectionWrap>
      );
    }

    case "Pricing": {
      const b = block as PricingBlock;

      if (pageSlug === "birthdays" || pageSlug === "corporate") {
        type PricingDisplayCard = {
          name: string;
          price: string;
          subprice: string;
          bestFor: string[];
          includes: string[];
          badge?: string;
          footnote?: string;
        };

        const pricingMeta =
          pageSlug === "birthdays"
            ? {
                eyebrow: "Small Events Pricing",
                title: "Private celebrations, but make it premium.",
                subtitle:
                  "Best for birthdays and smaller gatherings where guests want higher-detail designs and a polished, calm setup.",
                ctaPrefix: "Select",
                cards: [
                  {
                    name: "1 Hour",
                    price: "$175",
                    subprice: "flat rate",
                    bestFor: ["Quick parties", "Smaller guest lists", "A premium add-on moment"],
                    includes: ["Face painting + event art vibe", "Clean, professional setup", "Perfect for birthdays"],
                  },
                  {
                    name: "2 Hours",
                    price: "$250",
                    subprice: "($125/hr)",
                    badge: "Most Popular",
                    bestFor: ["Most birthdays", "More guests", "More flexibility for designs"],
                    includes: ["Better guest coverage", "More time for detail", "Balanced flow"],
                  },
                  {
                    name: "3+ Hours",
                    price: "$125/hr",
                    subprice: "after 1st hour",
                    bestFor: ["Bigger private events", "Longer bookings", "More guests without rushing"],
                    includes: ["Ideal for full-event coverage", "More time for variety", "Great for mixed ages"],
                  },
                ] as PricingDisplayCard[],
              }
            : {
                eyebrow: "Large Events Pricing",
                title: "Built for scale, speed, and high guest volume.",
                subtitle:
                  "Best for corporate events, festivals, and public activations where flow matters and multi-artist support may be needed.",
                ctaPrefix: "Request",
                cards: [
                  {
                    name: "1 Artist",
                    price: "$500",
                    subprice: "2 hours minimum",
                    bestFor: ["Small corporate events", "Moderate foot traffic", "Premium brand presence"],
                    includes: ["Structured guest flow", "Professional-grade setup", "Great for brand activations"],
                    footnote: "Each additional hour: +$100 per hour (per artist).",
                  },
                  {
                    name: "2 Artists",
                    price: "$400 / artist",
                    subprice: "2 hours minimum",
                    badge: "Best Value",
                    bestFor: ["Higher volume events", "Busy activations", "Faster throughput"],
                    includes: ["Better coverage", "Less wait time", "Ideal for larger guest counts"],
                    footnote: "Each additional hour: +$100 per hour (per artist).",
                  },
                  {
                    name: "3+ Artists",
                    price: "$400 / artist",
                    subprice: "2 hours minimum",
                    bestFor: ["Festivals", "Public events", "Large crowds + line management"],
                    includes: ["Built for scale", "Multi-artist coordination", "Best for high traffic"],
                    footnote: "Each additional hour: +$100 per hour (per artist).",
                  },
                ] as PricingDisplayCard[],
              };

        return (
          <SectionWrap>
            <div style={{ display: "grid", gap: 22 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isCompactLayout ? "1fr" : "repeat(3, minmax(0, 1fr))",
                  gap: 20,
                  alignItems: "stretch",
                }}
              >
                {pricingMeta.cards.map((card) => {
                  const featured = Boolean(card.badge);

                  return (
                    <div
                      key={card.name}
                      data-native-cursor="true"
                      style={{
                        position: "relative",
                        display: "grid",
                        gap: 18,
                        minHeight: 0,
                        padding: "24px 18px 18px",
                        borderRadius: 24,
                        background:
                          featured
                            ? "linear-gradient(180deg, rgba(16,53,42,0.94) 0%, rgba(10,30,25,0.98) 100%)"
                            : "linear-gradient(180deg, rgba(13,49,39,0.90) 0%, rgba(8,25,21,0.96) 100%)",
                        border: featured ? "1px solid rgba(211,74,168,0.65)" : "1px solid rgba(255,255,255,0.10)",
                        boxShadow: featured ? "0 20px 48px rgba(0,0,0,0.34), inset 0 0 0 1px rgba(211,74,168,0.18)" : "0 18px 44px rgba(0,0,0,0.26)",
                      }}
                    >
                      {card.badge ? (
                        <div
                          style={{
                            position: "absolute",
                              top: -12,
                              left: "50%",
                              transform: "translateX(-50%)",
                              padding: "6px 18px",
                              borderRadius: 999,
                              background: "rgba(147, 28, 98, 0.24)",
                              border: "1px solid rgba(211,74,168,0.65)",
                              fontSize: 10,
                              fontWeight: 900,
                              letterSpacing: "0.04em",
                            textTransform: "uppercase",
                          }}
                        >
                          {card.badge}
                        </div>
                      ) : null}

                      <div style={{ display: "grid", gap: 6 }}>
                        <div style={{ fontSize: 16, fontWeight: 900 }}>{card.name}</div>
                        <div style={{ fontSize: featured ? "clamp(2.9rem, 3.8vw, 4rem)" : "clamp(2.6rem, 3.5vw, 3.6rem)", fontWeight: 950, lineHeight: 0.98 }}>
                          {card.price}
                        </div>
                        <div style={{ fontSize: 14, opacity: 0.64 }}>{card.subprice}</div>
                      </div>

                      <div style={{ display: "grid", gap: 10 }}>
                        <div style={{ fontSize: 16, fontWeight: 900 }}>Best for</div>
                        <div style={{ display: "grid", gap: 8 }}>
                          {card.bestFor.map((item) => (
                            <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.4, opacity: 0.82 }}>
                              <span style={{ opacity: 0.5 }}>●</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: "grid", gap: 10 }}>
                        <div style={{ fontSize: 16, fontWeight: 900 }}>Includes</div>
                        <div style={{ display: "grid", gap: 10 }}>
                          {card.includes.map((item) => (
                            <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.4, opacity: 0.86 }}>
                              <span
                                style={{
                                  width: 26,
                                  height: 26,
                                  flexShrink: 0,
                                  display: "grid",
                                  placeItems: "center",
                                  borderRadius: 999,
                                  border: "1px solid rgba(255,255,255,0.12)",
                                  color: "#D9F2E6",
                                  fontSize: 15,
                                  lineHeight: 1,
                                }}
                              >
                                ✓
                              </span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginTop: "auto", display: "grid", gap: 14 }}>
                        {card.footnote ? (
                          <div style={{ fontSize: 13, lineHeight: 1.45, opacity: 0.62 }}>{card.footnote}</div>
                        ) : null}
                        <HoverButton
                          onClick={() => goTo("contact")}
                          style={{
                            width: "100%",
                            borderRadius: 18,
                            padding: "16px 18px",
                            border: featured ? "none" : "1px solid rgba(255,255,255,0.12)",
                            background: featured ? "#A7E4C4" : "rgba(3,20,17,0.34)",
                            color: featured ? "#0B231A" : brand.colors.paper,
                            fontSize: 16,
                            fontWeight: 900,
                            transition: unifiedHoverTransition,
                          }}
                          hoverStyle={
                            featured
                              ? {
                                  transform: "translateY(-1px)",
                                  background: "#B9F0D4",
                                  boxShadow: "0 18px 36px rgba(167,228,196,0.18)",
                                  color: "#0B231A",
                                }
                              : unifiedDarkButtonHover
                          }
                        >
                          {pricingMeta.ctaPrefix} {card.name}
                        </HoverButton>
                      </div>
                    </div>
                  );
                })}
              </div>

              {pageSlug === "birthdays" ? (
                <div style={{ display: "grid", gap: 8 }}>
                  <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.68, fontFamily: uiFont }}>
                    Event Highlights
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isCompactLayout ? "repeat(2, minmax(0, 1fr))" : "repeat(6, minmax(0, 1fr))",
                      gap: 6,
                    }}
                  >
                    {(allEventPics.length > 0 ? allEventPics : homeGalleryImages).slice(0, isCompactLayout ? 6 : 12).map((imageSrc, index) => (
                      <img
                        key={`small-events-highlight-${index}-${imageSrc}`}
                        src={imageSrc}
                        alt={`Small events gallery ${index + 1}`}
                        style={{
                          width: "100%",
                          height: isCompactLayout ? 78 : 92,
                          objectFit: "cover",
                          display: "block",
                          borderRadius: 2,
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gap: 8,
                    borderTop: "1px solid rgba(255,255,255,0.12)",
                    paddingTop: 10,
                    isolation: "isolate",
                  }}
                >
                  <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.68, fontFamily: uiFont }}>
                    Trusted By
                  </div>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: isCompactLayout ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
                      gap: 8,
                      alignItems: "stretch",
                    }}
                  >
                    {corporateLogoImages.slice(0, 4).map((logo, index) => (
                      <div
                        key={`corporate-pricing-logo-${index}`}
                        style={{
                          height: isCompactLayout ? 74 : 88,
                          border: "1px solid rgba(255,255,255,0.16)",
                          background: "rgba(255,255,255,0.04)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: isCompactLayout ? "8px" : "10px",
                          overflow: "hidden",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <img
                          src={logo.src}
                          alt={`Corporate logo ${index + 1}`}
                          style={{
                            width: "auto",
                            height: "auto",
                            maxWidth: "90%",
                            maxHeight: isCompactLayout ? "48px" : "56px",
                            display: "block",
                            objectFit: "contain",
                            objectPosition: "center",
                          }}
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <MiniGoogleReviews pageSlug={pageSlug} isCompactLayout={Boolean(isCompactLayout)} />

              <ServiceSpotlightCarousel pageSlug={pageSlug} isCompactLayout={Boolean(isCompactLayout)} />
            </div>
          </SectionWrap>
        );
      }

      return (
        <SectionWrap title={b.title} subtitle={b.subtitle}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {b.cards.map((c) => (
              <Card key={c.name} style={{ display: "grid", gap: 10 }}>
                <div style={{ fontWeight: 950, fontSize: 16, color: brand.colors.ink }}>{c.name}</div>
                <div style={{ fontWeight: 950, color: brand.colors.magenta }}>{c.priceLine}</div>
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, opacity: 0.88, color: brand.colors.ink }}>
                  {c.bullets.map((d) => (
                    <li key={d} style={{ marginBottom: 6 }}>
                      {d}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </SectionWrap>
      );
    }

    case "GalleryTeaser": {
      const b = block as GalleryTeaserBlock;
      return (
        <SectionWrap title={b.title} subtitle={b.subtitle}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {b.tiles.map((t) => (
              <MockImage key={t} label={t} />
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <Button label={b.cta.label} onClick={() => goTo(b.cta.to)} />
          </div>
        </SectionWrap>
      );
    }

    case "GalleryGrid": {
      const b = block as GalleryGridBlock;
      if (pageSlug === "gallery") {
        return <SiteWideGallery />;
      }
      return (
        <SectionWrap title={b.title}>
          <Card style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {b.filters.map((f) => (
                <Badge key={f} text={f} />
              ))}
            </div>
          </Card>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {b.items.map((img) => (
              <MockImage key={img.label} label={`${img.label} (${img.tag})`} />
            ))}
          </div>
        </SectionWrap>
      );
    }

    case "Testimonials": {
      const b = block as TestimonialsBlock;
      return (
        <SectionWrap title={b.title}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {b.items.map((t, idx) => (
              <Card key={idx}>
                <div style={{ fontSize: 14, fontWeight: 900, color: brand.colors.ink }}>
                  “{t.quote}”
                </div>
                <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75, color: brand.colors.ink }}>{t.name}</div>
              </Card>
            ))}
          </div>
        </SectionWrap>
      );
    }

    case "FAQPolicies": {
      const b = block as FAQPoliciesBlock;
      return <FAQAccordion block={b} />;
    }

    case "HoneyBookForm": {
      const b = block as HoneyBookFormBlock;
      return (
        <SectionWrap title={b.title} subtitle="Routes into HoneyBook (separate funnels).">
          <HoneyBookEmbed kind={b.kind} embedId={b.honeyBookEmbedId} tag={b.tag} />
        </SectionWrap>
      );
    }

    case "CTASection": {
      const b = block as CTASectionBlock;
      return (
        <SectionWrap>
          <Card style={{ background: "rgba(255,255,255,0.94)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 950, color: brand.colors.ink }}>{b.title}</div>
                {b.subtitle && <div style={{ fontSize: 13, opacity: 0.8, color: brand.colors.ink }}>{b.subtitle}</div>}
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <HoverButton
                  onClick={() => goTo(b.primary.to)}
                  style={{
                    cursor: "pointer",
                    borderRadius: 999,
                    border: "none",
                    padding: "12px 16px",
                    fontWeight: 900,
                    fontFamily: uiFont,
                    background: brand.colors.magenta,
                    color: brand.colors.paper,
                    boxShadow: "0 10px 24px rgba(211,74,168,0.22)",
                    transition: unifiedHoverTransition,
                  }}
                  hoverStyle={unifiedLightButtonHover}
                >
                  {b.primary.label}
                </HoverButton>
                {b.secondary && (
                  <HoverButton
                    onClick={() => goTo(b.secondary!.to)}
                    style={{
                      cursor: "pointer",
                      borderRadius: 999,
                      border: "1px solid rgba(0,0,0,0.12)",
                      padding: "12px 16px",
                      fontWeight: 900,
                      fontFamily: uiFont,
                      background: "transparent",
                      color: brand.colors.ink,
                      transition: unifiedHoverTransition,
                    }}
                    hoverStyle={{
                      ...unifiedLightButtonHover,
                      background: "rgba(211,74,168,0.14)",
                      color: brand.colors.ink,
                    }}
                  >
                    {b.secondary.label}
                  </HoverButton>
                )}
              </div>
            </div>
          </Card>
        </SectionWrap>
      );
    }

    default:
      return null;
  }
}

export default function FFPBuilderStyleMock() {
  const navigate = useNavigate();
  const location = useLocation();
  const pages = useMemo(() => CONTENT, []);
  const current = useMemo(() => pageSlugFromPath(location.pathname), [location.pathname]);
  const setCurrent = useCallback(
    (next: PageSlug) => {
      const target = canonicalPathBySlug[next] ?? "/";
      if (normalizePathname(location.pathname) !== target) {
        navigate(target);
      }
    },
    [location.pathname, navigate]
  );
  const [navCondensed, setNavCondensed] = useState(false);
  const [isCompactLayout, setIsCompactLayout] = useState(false);
  const [trustStartIndex, setTrustStartIndex] = useState(0);
  const [activeCorporateLogoIndex, setActiveCorporateLogoIndex] = useState(0);
  const logoSwipeStartXRef = useRef<number | null>(null);
  const homeNextRef = useRef<HTMLElement | null>(null);

  const page = pages.find((p) => p.slug === current) ?? pages[0];

  useEffect(() => {
    if (typeof document === "undefined") return;

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-font", "unifraktur-cook");
    styleEl.textContent = `
      @font-face {
        font-family: "Grenze";
        src: url("${grenzeBold}") format("truetype");
        font-weight: 700;
        font-style: normal;
      }

      @font-face {
        font-family: "Grenze SemiBold";
        src: url("${grenzeSemiBold}") format("truetype");
        font-weight: 600;
        font-style: normal;
      }

      @font-face {
        font-family: "Unifraktur Cook";
        src: url("${unifrakturCookBold}") format("truetype");
        font-weight: 700;
        font-style: normal;
      }
    `;

    document.head.appendChild(styleEl);

    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.title = page.seo.title;
    track("page_view", { slug: page.slug });
  }, [page.slug, page.seo.title]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncLayout = () => {
      setIsCompactLayout(window.innerWidth < 980);
    };

    syncLayout();
    window.addEventListener("resize", syncLayout);

    return () => window.removeEventListener("resize", syncLayout);
  }, []);

  useEffect(() => {
    if (current !== "home") {
      setNavCondensed(false);
      return;
    }

    if (typeof window === "undefined") return;

    const syncNavCondensed = () => {
      const el = homeNextRef.current;
      if (!el) return;

      const { top } = el.getBoundingClientRect();
      setNavCondensed(top <= 72);
    };

    syncNavCondensed();
    window.addEventListener("scroll", syncNavCondensed, { passive: true });
    window.addEventListener("resize", syncNavCondensed);

    return () => {
      window.removeEventListener("scroll", syncNavCondensed);
      window.removeEventListener("resize", syncNavCondensed);
    };
  }, [current]);

  useEffect(() => {
    if (current !== "home") return;

    const interval = window.setInterval(() => {
      setTrustStartIndex((index) => (index + 2) % trustIndicators.length);
    }, 10000);

    return () => window.clearInterval(interval);
  }, [current]);

  const navAlt = current !== "home" || navCondensed;
  const visibleTrustIndicators = [
    trustIndicators[trustStartIndex % trustIndicators.length],
    trustIndicators[(trustStartIndex + 1) % trustIndicators.length],
  ];
  const activeCorporateLogo = corporateLogoImages[activeCorporateLogoIndex % corporateLogoImages.length];

  const goToNextCorporateLogo = () => {
    setActiveCorporateLogoIndex((index) => (index + 1) % corporateLogoImages.length);
  };

  const goToPrevCorporateLogo = () => {
    setActiveCorporateLogoIndex((index) => (index - 1 + corporateLogoImages.length) % corporateLogoImages.length);
  };
  const goToPrevTrustAndLogo = () => {
    setTrustStartIndex((index) => (index - 2 + trustIndicators.length) % trustIndicators.length);
    goToPrevCorporateLogo();
  };
  const goToNextTrustAndLogo = () => {
    setTrustStartIndex((index) => (index + 2) % trustIndicators.length);
    goToNextCorporateLogo();
  };
  const customPageIntro =
    page.slug === "birthdays"
      ? {
          title: "Private celebrations, made premium.",
          body:
            "Best for birthdays and smaller gatherings where guests want higher-detail designs and a polished, calm setup.",
        }
      : page.slug === "corporate"
        ? {
            title: "Built for scale, speed, and high guest volume.",
            body:
              "Best for corporate events, festivals, and public activations where flow matters and multi-artist support may be needed.",
          }
        : null;
  const isServicesPage = page.slug === "services";

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: isServicesPage ? "#12161D" : brand.colors.forest,
        backgroundImage: isServicesPage
          ? "none"
          : `radial-gradient(1100px 650px at 30% 0%, rgba(211,74,168,0.18), transparent 62%),
             radial-gradient(900px 520px at 90% 12%, rgba(237,230,247,0.12), transparent 60%),
             url(/hero-bg.png)`,
        backgroundSize: isServicesPage ? undefined : "cover",
        backgroundPosition: isServicesPage ? undefined : "center",
        backgroundRepeat: isServicesPage ? undefined : "no-repeat",
        backgroundAttachment: isServicesPage ? "scroll" : "fixed",
        color: brand.colors.paper,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <CursorGlitterTrail />

      {/* Nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
          background: "rgba(15,42,29,0.72)",
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          ...(navAlt
            ? {
                background: "rgba(10,12,20,0.82)",
                borderBottom: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
              }
            : {}),
          transition: "background 240ms ease, border-color 240ms ease, box-shadow 240ms ease",
        }}
      >
        <div
          style={{
            width: "100%",
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            ...(navAlt
              ? {
                  maxWidth: contentMaxWidth,
                  margin: "0 auto",
                  padding: "10px 18px",
                  gap: 16,
                  transition: "padding 240ms ease",
                }
              : {}),
          }}
        >
          {navAlt ? (
            <HoverButton
              onClick={() => setCurrent("home")}
              style={{
                cursor: "pointer",
                border: "none",
                background: "transparent",
                padding: 0,
                display: "flex",
                alignItems: "center",
                transition: unifiedHoverTransition,
              }}
              hoverStyle={{ ...unifiedTextButtonHover, background: "transparent", borderColor: "transparent", boxShadow: "none", transform: "scale(1.03)" }}
              ariaLabel="Go to home"
            >
              <img
                src="/logo.png"
                alt=""
                style={{
                  height:50,
                  width: "auto",
                  opacity: 0.95,
                  filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.40))",
                }}
              />
            </HoverButton>
          ) : null}
          <div
            style={{
              width: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              ...(navAlt
                ? {
                    width: "auto",
                    flex: 1,
                    justifyContent: "center",
                    gap: 14,
                  }
                : {}),
            }}
          >
            {pages
              .filter((p) => p.slug !== "contact")
              .map((p) => (
                <HoverButton
                  key={p.slug}
                  onClick={() => setCurrent(p.slug)}
                  style={{
                    cursor: "pointer",
                    border: "none",
                    background: "transparent",
                    color: p.slug === current ? brand.colors.paper : "rgba(255,255,255,0.80)",
                    fontWeight: p.slug === current ? 900 : 700,
                    padding: "8px 10px",
                    borderRadius: 999,
                    textDecoration: p.slug === current ? "underline" : "none",
                    textUnderlineOffset: 4,
                    fontSize: 22,
                    textTransform: "uppercase",
                    fontFamily: uiFont,
                    textShadow: "none",
                    transition: unifiedHoverTransition,
                    ...(navAlt ? { fontSize: 16 } : {}),
                  }}
                  hoverStyle={navTextGlowHover}
                >
                  {p.navLabel}
                </HoverButton>
              ))}
          </div>
          {!navAlt ? <div style={{ flex: 1 }} /> : null}
          <HoverButton
            onClick={() => setCurrent("contact")}
            style={{
              cursor: "pointer",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 12,
              padding: "14px 32px",
              minWidth: 168,
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              background: "rgba(28, 28, 32, 0.86)",
              color: brand.colors.paper,
              fontFamily: uiFont,
              backdropFilter: "blur(6px)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
              transform: "scale(1)",
              transition: unifiedHoverTransition,
            }}
            hoverStyle={{ ...unifiedDarkButtonHover, transform: "scale(1.035)" }}
          >
            Book
          </HoverButton>
        </div>
      </div>

      {/* Home: hero section + green background */}
      {current === "home" && (
        <>
          <section
            style={{
              position: "relative",
              minHeight: "calc(100vh - 60px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: "8vh",
              padding: "8vh 24px 80px",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${heroFrameIllustration})`,
                backgroundSize: "110% auto",
                backgroundPosition: "center -28px",
                backgroundRepeat: "no-repeat",
                pointerEvents: "none",
                mixBlendMode: "screen",
                opacity: 0.96,
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 72%, rgba(0,0,0,0) 100%)",
              }}
              aria-hidden
            />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                maxWidth: 900,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  width: "35%",
                  maxWidth: "min(720px, 92vw)",
                  marginBottom: 20,
                }}
              >
                <img
                  src="/logo.png"
                  alt="Fable Face Paint"
                  style={{
                    width: "100%",
                    height: "auto",
                    filter:
                      "drop-shadow(0 6px 12px rgba(0,0,0,0.6)) drop-shadow(0 12px 32px rgba(0,0,0,0.55)) contrast(1.4)",
                  }}
                />
                <p
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 700,
                    fontSize: "clamp(0.55rem, 1.2vw, 0.7rem)",
                    color: "rgba(255,255,255,0.65)",
                    margin: "4px 0 0",
                    letterSpacing: "0.12em",
                    textTransform: "capitalize",
                  }}
                >
                  from Vaughan, ON
                </p>
              </div>
              <p
                style={{
                  fontFamily: '"Unifraktur Cook", serif',
                  fontWeight: 900,
                  fontSize: "clamp(2.85rem, 8vw, 5rem)",
                  color: "#FFFFFF",
                  margin: "0 0 6px",
                  lineHeight: 1.0,
                  letterSpacing: "0.02em",
                  textShadow: "0 4px 8px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.4)",
                }}
              >
                Premium & Enchanted Event face art experience
              </p>
              <HoverButton
                onClick={() => setCurrent("contact")}
                style={{
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.18)",
                  borderRadius: 8,
                  marginTop: 28,
                  padding: "16px 40px",
                  minWidth: 220,
                  fontWeight: 700,
                  fontSize: 20,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  background: "rgba(28, 28, 32, 0.86)",
                  color: "#FFFFFF",
                  fontFamily: uiFont,
                  backdropFilter: "blur(6px)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.04)",
                  transform: "scale(1)",
                  transition: unifiedHoverTransition,
                }}
                hoverStyle={{ ...unifiedDarkButtonHover, transform: "scale(1.04)" }}
              >
                Book Now
              </HoverButton>
            </div>
          </section>

          <section
            ref={homeNextRef}
            style={{
              padding: "72px 0",
              background: "transparent",
              minHeight: "calc(100vh - 72px)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "0 18px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isCompactLayout ? "1fr" : "minmax(320px, 1.05fr) minmax(300px, 0.9fr)",
                  gap: 30,
                  alignItems: "start",
                  maxWidth: contentMaxWidth,
                }}
              >
                {/* Left copy */}
                <div
                  style={{
                    paddingTop: 0,
                    maxWidth: 560,
                    marginTop: -10,
                  }}
                >
                  <div
                    style={{
                      fontSize: "clamp(2.65rem, 4vw, 4.15rem)",
                      fontWeight: 950,
                      fontFamily: titleFont,
                      lineHeight: 0.98,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Face painting, but make it event art.
                  </div>
                  <div style={{ marginTop: 18, maxWidth: 640, fontSize: 18, lineHeight: 1.7, opacity: 0.9 }}>
                    Fable Face Paint is a fully mobile face painting &amp; event art service serving the GTA. Led by Milena, with a
                    trusted team available for larger bookings, we can handle everything from private celebrations to corporate and public
                    events.
                  </div>

                  <div
                    data-native-cursor="true"
                    style={{
                      marginTop: 26,
                      display: "flex",
                      alignItems: "center",
                      gap: 38,
                      padding: "26px 30px 26px 44px",
                      minHeight: 220,
                      borderRadius: 18,
                      background: "rgba(12, 18, 18, 0.55)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow: "0 18px 44px rgba(0,0,0,0.30)",
                      backdropFilter: "blur(10px)",
                      width: "100%",
                      maxWidth: 860,
                    }}
                  >
                    <img
                      src={milenaImg}
                      alt="Milena, lead artist"
                      style={{
                        width: 126,
                        height: 126,
                        borderRadius: 999,
                        objectFit: "cover",
                        objectPosition: "center 30%",
                        transform: "scale(1.32)",
                        border: "1px solid rgba(255,255,255,0.18)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                      }}
                    />
                    <div style={{ display: "grid", gap: 10, paddingLeft: 6 }}>
                      <div style={{ fontSize: 18, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.75 }}>
                        Meet your artist
                      </div>
                      <div style={{ fontSize: 34, fontWeight: 950, lineHeight: 1.02 }}>Milena</div>
                    </div>
                  </div>
                </div>

                {/* Right cards */}
                <div
                  style={{
                    display: "grid",
                    gap: 18,
                    width: "100%",
                    maxWidth: 420,
                    justifySelf: isCompactLayout ? "stretch" : "end",
                    paddingTop: 8,
                  }}
                >
                  <Card
                    style={{
                      background: "rgba(12, 18, 18, 0.62)",
                      border: "1px solid rgba(255,255,255,0.10)",
                      boxShadow: "0 18px 44px rgba(0,0,0,0.35)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.74 }}>
                        Birthdays · Private parties
                      </div>
                    </div>

                    <div style={{ marginTop: 12, fontSize: 24, fontWeight: 950, fontFamily: titleFont }}>Small Events</div>
                    <div style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.86 }}>
                      Perfect for smaller guest lists and high‑quality designs. Book a single artist for a clean, magical setup.
                    </div>

                    <HoverButton
                      onClick={() => setCurrent("birthdays")}
                      style={{
                        marginTop: 14,
                        cursor: "pointer",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.06)",
                        color: brand.colors.paper,
                        borderRadius: 12,
                        padding: "12px 14px",
                        fontFamily: uiFont,
                        fontWeight: 800,
                        fontSize: 15,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        transition: unifiedHoverTransition,
                      }}
                      hoverStyle={unifiedDarkButtonHover}
                    >
                      Explore Small Events <span aria-hidden>→</span>
                    </HoverButton>
                  </Card>

                  <Card
                    style={{
                      position: "relative",
                      background: "rgba(12, 18, 18, 0.62)",
                      border: "1px solid rgba(211,74,168,0.65)",
                      boxShadow: "0 18px 44px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(211,74,168,0.18)",
                      backdropFilter: "blur(10px)",
                      paddingBottom: 52,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        bottom: -14,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 13,
                        fontWeight: 900,
                        padding: "6px 14px",
                        borderRadius: 999,
                        background: "rgba(147, 28, 98, 0.24)",
                        border: "1px solid rgba(211,74,168,0.65)",
                        opacity: 0.96,
                      }}
                    >
                      Most Popular
                    </span>

                    <div style={{ fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.74 }}>
                      Corporate · Festivals · Public events
                    </div>

                    <div style={{ marginTop: 12, fontSize: 24, fontWeight: 950, fontFamily: titleFont }}>Large Events</div>
                    <div style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.86 }}>
                      Need higher throughput or multiple artists? This path is built for scale, structure, and crowd flow.
                    </div>

                    <HoverButton
                      onClick={() => setCurrent("corporate")}
                      style={{
                        marginTop: 14,
                        cursor: "pointer",
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(255,255,255,0.06)",
                        color: brand.colors.paper,
                        borderRadius: 12,
                        padding: "12px 14px",
                        fontFamily: uiFont,
                        fontWeight: 800,
                        fontSize: 15,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        transition: unifiedHoverTransition,
                      }}
                      hoverStyle={unifiedDarkButtonHover}
                    >
                      Explore Large Events <span aria-hidden>→</span>
                    </HoverButton>
                  </Card>
                </div>
              </div>
              <div style={{ marginTop: 24, fontSize: 15, lineHeight: 1.5, opacity: 0.74, paddingLeft: 2, maxWidth: 760 }}>
                Not sure which one fits? Start with the closest match, and the booking form will sort the details.
              </div>
            </div>
          </section>

          <section
            style={{
              padding: "0 0 96px",
            }}
          >
            <div style={{ display: "grid", gap: 24 }}>
              <div
                data-native-cursor="true"
                style={{
                  width: "100%",
                  padding: isCompactLayout ? "0 8px" : "0 10px",
                  display: "grid",
                  justifyItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxWidth: 1240,
                    display: "grid",
                    gap: isCompactLayout ? 16 : 22,
                    justifyItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      padding: isCompactLayout ? "6px 0 16px" : "10px 0 22px",
                    }}
                  >
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        left: "4%",
                        right: "4%",
                        bottom: 2,
                        height: 16,
                        borderRadius: 999,
                        background: "rgba(0,0,0,0.34)",
                        filter: "blur(14px)",
                        opacity: 0.6,
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: isCompactLayout ? "flex-start" : "space-between",
                        gap: isCompactLayout ? 14 : 20,
                        overflowX: isCompactLayout ? "auto" : "visible",
                        padding: isCompactLayout ? "0 8px 6px" : "0 18px 8px",
                      }}
                    >
                      {beltAwardImages.map((src, index) => (
                        <img
                          key={`award-belt-${index}`}
                          src={src}
                          alt={`Award badge ${index + 1}`}
                          style={{
                            flex: "0 0 auto",
                            height: src === awardWinner2026 ? (isCompactLayout ? 104 : 162) : isCompactLayout ? 78 : 122,
                            width: "auto",
                            objectFit: "contain",
                            display: "block",
                            filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.24))",
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      width: "min(680px, 92%)",
                    }}
                  >
                    <div style={{ marginTop: 8, fontSize: "clamp(1.5rem, 2.6vw, 2.3rem)", fontWeight: 950, fontFamily: titleFont }}>
                      What clients rely on
                    </div>
                    <div style={{ marginTop: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.74 }}>
                      A clearer view of the practical trust signals behind the booking experience.
                    </div>
                  </div>

                  <div
                    data-native-cursor="true"
                    onTouchStart={(event) => {
                      logoSwipeStartXRef.current = event.changedTouches[0]?.clientX ?? null;
                    }}
                    onTouchEnd={(event) => {
                      const startX = logoSwipeStartXRef.current;
                      const endX = event.changedTouches[0]?.clientX ?? null;
                      logoSwipeStartXRef.current = null;
                      if (startX === null || endX === null) return;
                      const delta = endX - startX;
                      if (Math.abs(delta) < 36) return;
                      if (delta < 0) {
                        goToNextCorporateLogo();
                      } else {
                        goToPrevCorporateLogo();
                      }
                    }}
                    style={{
                      display: "grid",
                      justifyItems: "center",
                      gap: 12,
                      width: isCompactLayout ? "78%" : "42%",
                    }}
                  >
                    <div
                      style={{
                        width: isCompactLayout ? 260 : 360,
                        height: isCompactLayout ? 110 : 140,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <img
                        src={activeCorporateLogo.src}
                        alt="Corporate logo"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          display: "block",
                          filter: "drop-shadow(0 10px 14px rgba(0,0,0,0.24))",
                        }}
                      />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                      <div style={{ fontSize: 13, letterSpacing: "0.04em", opacity: 0.74 }}>
                        {activeCorporateLogoIndex + 1}/{corporateLogoImages.length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-native-cursor="true"
                style={{
                  maxWidth: contentMaxWidth,
                  margin: "0 auto",
                  width: "100%",
                  display: "grid",
                  gap: 26,
                  padding: isCompactLayout ? "12px 18px 8px" : "18px 0 8px",
                }}
              >
                <div style={{ position: "relative" }}>
                  <HoverButton
                    onClick={goToPrevTrustAndLogo}
                    style={{
                      position: "absolute",
                      left: isCompactLayout ? 2 : -6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      border: "none",
                      background: "transparent",
                      color: "rgba(255,255,255,0.86)",
                      fontSize: isCompactLayout ? 34 : 44,
                      lineHeight: 1,
                      padding: 0,
                      zIndex: 2,
                      transition: unifiedHoverTransition,
                    }}
                    hoverStyle={{ ...navTextGlowHover, transform: "translateY(-50%) scale(1.08)" }}
                    ariaLabel="Show previous trust indicators"
                  >
                    ‹
                  </HoverButton>
                  <HoverButton
                    onClick={goToNextTrustAndLogo}
                    style={{
                      position: "absolute",
                      right: isCompactLayout ? 2 : -6,
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      border: "none",
                      background: "transparent",
                      color: "rgba(255,255,255,0.86)",
                      fontSize: isCompactLayout ? 34 : 44,
                      lineHeight: 1,
                      padding: 0,
                      zIndex: 2,
                      transition: unifiedHoverTransition,
                    }}
                    hoverStyle={{ ...navTextGlowHover, transform: "translateY(-50%) scale(1.08)" }}
                    ariaLabel="Show next trust indicators"
                  >
                    ›
                  </HoverButton>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isCompactLayout ? "1fr" : "1fr 1fr",
                      gap: 18,
                    }}
                  >
                    {visibleTrustIndicators.map((item) => (
                      <div
                        key={item.title}
                        style={{
                          display: "grid",
                          justifyItems: "center",
                          alignContent: "center",
                          textAlign: "center",
                          gap: 16,
                          minHeight: isCompactLayout ? 220 : 250,
                          padding: isCompactLayout ? "18px 20px" : "24px 20px 30px",
                        }}
                      >
                      <div
                        style={{
                          color: "#E7F8F0",
                          opacity: 0.95,
                          textShadow: "0 0 18px rgba(231,248,240,0.12)",
                        }}
                      >
                        {item.icon === "shield-plus" ? (
                          <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37 7L57 14V31C57 43.5 48.8 55.2 37 60C25.2 55.2 17 43.5 17 31V14L37 7Z" stroke="currentColor" strokeWidth="3.5"/>
                            <path d="M37 24V40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                            <path d="M29 32H45" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"/>
                          </svg>
                        ) : null}
                        {item.icon === "sparkles" ? (
                          <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 16L27 25L36 28L27 31L24 40L21 31L12 28L21 25L24 16Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                            <path d="M49 23L51.5 30.5L59 33L51.5 35.5L49 43L46.5 35.5L39 33L46.5 30.5L49 23Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                            <path d="M41 47L43 53L49 55L43 57L41 63L39 57L33 55L39 53L41 47Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                          </svg>
                        ) : null}
                        {item.icon === "mobile" ? (
                          <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="24" y="12" width="26" height="50" rx="6" stroke="currentColor" strokeWidth="3.5"/>
                            <path d="M32 20H42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                            <circle cx="37" cy="54" r="2.5" stroke="currentColor" strokeWidth="2.5"/>
                          </svg>
                        ) : null}
                        {item.icon === "network" ? (
                          <svg width="74" height="74" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="26" cy="27" r="6" stroke="currentColor" strokeWidth="3"/>
                            <circle cx="48" cy="27" r="6" stroke="currentColor" strokeWidth="3"/>
                            <path d="M18 48C18 42.5 22.5 38 28 38H24C29.5 38 34 42.5 34 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                            <path d="M40 48C40 42.5 44.5 38 50 38H46C51.5 38 56 42.5 56 48" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          </svg>
                        ) : null}
                      </div>
                      <div style={{ display: "grid", gap: 10, maxWidth: 420, justifyItems: "center" }}>
                        <div style={{ fontSize: "clamp(1.8rem, 2.5vw, 2.65rem)", fontWeight: 950, lineHeight: 0.98, fontFamily: titleFont }}>{item.title}</div>
                        <div style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.4rem)", lineHeight: 1.35, opacity: 0.76 }}>{item.subtitle}</div>
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            style={{
              padding: "12px 0 110px",
            }}
          >
            <div
              style={{
                maxWidth: contentMaxWidth,
                margin: "0 auto",
                padding: "0 18px",
                display: "grid",
                gap: 26,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: 12,
                  justifyItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    opacity: 0.62,
                  }}
                >
                  Gallery
                </div>
                <div
                  style={{
                    fontSize: "clamp(2.2rem, 4vw, 3.8rem)",
                    fontWeight: 950,
                    fontFamily: titleFont,
                    lineHeight: 0.98,
                    maxWidth: 720,
                  }}
                >
                  Real work from real events.
                </div>
                <div
                  style={{
                    maxWidth: 760,
                    fontSize: 18,
                    lineHeight: 1.65,
                    opacity: 0.82,
                  }}
                >
                  A quick look at the face painting, detail work, and event atmosphere behind the brand.
                </div>
              </div>

              <div
                data-native-cursor="true"
                style={{
                  display: "grid",
                  gridTemplateColumns: isCompactLayout ? "1fr" : "1.15fr 0.9fr 0.95fr",
                  gap: 18,
                  alignItems: "start",
                }}
              >
                <div style={{ display: "grid", gap: 18 }}>
                  <div
                    style={{
                      position: "relative",
                      minHeight: isCompactLayout ? 340 : 560,
                      borderRadius: 30,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={homeGalleryImages[0]}
                      alt="Face painting gallery image 1"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      position: "relative",
                      minHeight: isCompactLayout ? 260 : 320,
                      borderRadius: 26,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={homeGalleryImages[1]}
                      alt="Face painting gallery image 2"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gap: 18 }}>
                  {[homeGalleryImages[2], homeGalleryImages[3], homeGalleryImages[4]].map((imageSrc, index) => (
                    <div
                      key={imageSrc}
                      style={{
                        position: "relative",
                        minHeight: isCompactLayout ? 250 : index === 1 ? 300 : 220,
                        borderRadius: 24,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt={`Face painting gallery image ${index + 3}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: "grid", gap: 18 }}>
                  <div
                    style={{
                      position: "relative",
                      minHeight: isCompactLayout ? 280 : 360,
                      borderRadius: 26,
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={homeGalleryImages[5]}
                      alt="Face painting gallery image 6"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isCompactLayout ? "1fr 1fr" : "1fr",
                      gap: 18,
                    }}
                  >
                    {[homeGalleryImages[6], homeGalleryImages[7]].map((imageSrc, index) => (
                      <div
                        key={imageSrc}
                        style={{
                          position: "relative",
                          minHeight: isCompactLayout ? 180 : 220,
                          borderRadius: 22,
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={imageSrc}
                          alt={`Face painting gallery image ${index + 7}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Other pages: full content */}
      {current !== "home" && (
        <>
          {/* Page header */}
          {customPageIntro ? (
            <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "30px 18px 0" }}>
              <div style={{ display: "grid", gap: 12, maxWidth: 900, margin: "0 auto", justifyItems: "center", textAlign: "center" }}>
                <div style={{ fontSize: "clamp(2.2rem, 4vw, 3.4rem)", lineHeight: 1.02, fontWeight: 950, fontFamily: titleFont }}>
                  {customPageIntro.title}
                </div>
                <div style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.55, opacity: 0.76, maxWidth: 860 }}>
                  {customPageIntro.body}
                </div>
              </div>
            </div>
          ) : page.slug === "services" || page.slug === "faq" || page.slug === "gallery" || page.slug === "about" ? null
          : (
            <div style={{ maxWidth: contentMaxWidth, margin: "0 auto", padding: "22px 18px 0" }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>PAGE · {page.slug}</div>
              <div style={{ fontSize: 26, fontWeight: 950, lineHeight: 1.1, fontFamily: titleFont }}>{page.seo.title}</div>
              <div style={{ marginTop: 8, fontSize: 13, opacity: 0.85 }}>{page.seo.description}</div>
            </div>
          )}

          {/* Blocks */}
          <div>
            {page.slug === "about" ? (
              <AboutExperiencePage onNavigate={setCurrent} isCompactLayout={isCompactLayout} />
            ) : (
              page.blocks.map((b) => (
                <div key={b.id}>{renderBlock(b, setCurrent, page.slug, isCompactLayout)}</div>
              ))
            )}
          </div>

        </>
      )}

      <IkigaiFooter onNavigate={setCurrent} brandName={brand.name} />
    </div>
  );
}

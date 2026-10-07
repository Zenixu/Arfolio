export { cn } from "./lib/cn";

/* Ikon (SVG inline, bukan emoji/font ikon) */
export * from "./components/Icon";
export { AruthtaleMark, RchibnuMark, Mark } from "./components/Logo";
export { TechIcon, TechStack, techIconSlug, hasTechIcon } from "./components/TechIcon";

/* Primitif */
export { Tag } from "./components/Tag";
export { Thumb } from "./components/Thumb";
export { Button } from "./components/Button";
export { SectionHeading } from "./components/SectionHeading";
export { Reveal } from "./components/Reveal";
export { ThemeToggle } from "./components/ThemeToggle";

/* Navigasi & kerangka */
export { Navbar } from "./components/Navbar";
export { Footer, type SocialLink } from "./components/Footer";

/* Kartu */
export { ProjectCard } from "./components/ProjectCard";
export { LabCard } from "./components/LabCard";
export { CertificateCard } from "./components/CertificateCard";
export { ProfileCard } from "./components/ProfileCard";
export { SocialLinks, TechList, type Social } from "./components/SocialLinks";

/* Gerak & interaksi */
export {
  SpotlightCard, ScrollProgress, CursorDot, Marquee,
  CountUp, TiltCard, SkillBar, useInView, useScrollY,
  Parallax, TextReveal, StickyStack, ScrollTicker,
} from "./components/Motion";

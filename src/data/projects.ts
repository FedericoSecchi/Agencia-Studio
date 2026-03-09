import securityAllianceImage from "@/assets/projects/security-alliance/hero.jpg";
import securityGallery1 from "@/assets/projects/security-alliance/gallery-1.jpg";
import securityGallery2 from "@/assets/projects/security-alliance/gallery-2.jpg";
import securityGallery3 from "@/assets/projects/security-alliance/gallery-3.jpg";
import securityGallery4 from "@/assets/projects/security-alliance/gallery-4.jpg";
import theRedGuildImage from "@/assets/projects/the-red-guild/hero.jpg";
import redGuildGallery1 from "@/assets/projects/the-red-guild/gallery-1.jpg";
import redGuildGallery2 from "@/assets/projects/the-red-guild/gallery-2.jpg";
import redGuildGallery3 from "@/assets/projects/the-red-guild/gallery-3.jpg";
import redGuildGallery4 from "@/assets/projects/the-red-guild/gallery-4.jpg";
import redGuildGallery5 from "@/assets/projects/the-red-guild/gallery-5.jpg";
import redGuildGallery6 from "@/assets/projects/the-red-guild/gallery-6.jpg";
import orbitaImage from "@/assets/projects/orbita/orbita-hero.png";
import orbitaGallery1 from "@/assets/projects/orbita/orbita-01.png";
import orbitaGallery2 from "@/assets/projects/orbita/orbita-02.png";
import orbitaGallery3 from "@/assets/projects/orbita/orbita-03.png";
import orbitaGallery4 from "@/assets/projects/orbita/orbita-04.png";
import orbitaGallery5 from "@/assets/projects/orbita/orbita-05.png";
import orbitaGallery6 from "@/assets/projects/orbita/orbita-06.png";
import nudeImage from "@/assets/projects/nude/hero.png";
import nudeGallery1 from "@/assets/projects/nude/grid-01.png";
import nudeGallery2 from "@/assets/projects/nude/grid-02.png";

export type ProjectLayout = "premium" | "default";

export interface Project {
  id: string;
  image: string;
  size: "large" | "medium";
  layout?: ProjectLayout;
  galleries?: string[];
  /** SEO: unique page title (e.g. "Project Name Case Study — Kosmos Studio") */
  seoTitle?: string;
  /** SEO: meta description for search and social */
  seoDescription?: string;
  /** SEO: absolute or path for og:image (defaults to project image) */
  seoImage?: string;
}

export const projectsData: Project[] = [
  {
    id: "security-alliance",
    image: securityAllianceImage,
    size: "large",
    layout: "premium",
    galleries: [securityGallery1, securityGallery2, securityGallery3, securityGallery4],
    seoTitle: "Security Alliance Branding Case Study — Kosmos Studio",
    seoDescription: "Brand identity and modular design system created for a global crypto security alliance.",
    seoImage: securityAllianceImage,
  },
  {
    id: "the-red-guild",
    image: theRedGuildImage,
    size: "medium",
    layout: "premium",
    galleries: [
      redGuildGallery1,
      redGuildGallery2,
      redGuildGallery3,
      redGuildGallery4,
      redGuildGallery5,
      redGuildGallery6,
    ],
    seoTitle: "The Red Guild Branding & Web — Kosmos Studio",
    seoDescription: "Visual identity and web experience for The Red Guild.",
    seoImage: theRedGuildImage,
  },
  {
    id: "orbita",
    image: orbitaImage,
    size: "large",
    layout: "premium",
    galleries: [
      orbitaGallery1,
      orbitaGallery2,
      orbitaGallery3,
      orbitaGallery4,
      orbitaGallery5,
      orbitaGallery6,
    ],
    seoTitle: "Orbita Case Study — Kosmos Studio",
    seoDescription: "Brand and digital experience for Orbita.",
    seoImage: orbitaImage,
  },
  {
    id: "nude",
    image: nudeImage,
    size: "large",
    layout: "premium",
    galleries: [
      nudeGallery1,
      nudeGallery2,
      nudeGallery1,
      nudeGallery2,
      nudeGallery1,
      nudeGallery2,
    ],
    seoTitle: "Nude Case Study — Kosmos Studio",
    seoDescription: "Brand and web redesign for a growth marketing and press agency.",
    seoImage: nudeImage,
  },
];

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projectsData.find((project) => project.id === id);
};

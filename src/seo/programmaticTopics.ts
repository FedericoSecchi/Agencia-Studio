export interface ProgrammaticTopic {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
}

export const programmaticTopics: ProgrammaticTopic[] = [
  {
    slug: "branding-project-examples",
    title: "Branding Project Examples",
    description:
      "Explore real branding projects, visual identity systems and design work created by Kosmos Studio.",
    keywords: ["branding project", "branding case study", "visual identity project"],
  },
  {
    slug: "startup-branding-case-study",
    title: "Startup Branding Case Study",
    description:
      "Branding and visual identity projects designed for startups and digital companies.",
    keywords: ["startup branding", "startup identity", "brand design startups"],
  },
  {
    slug: "visual-identity-design",
    title: "Visual Identity Design Projects",
    description:
      "Examples of visual identity systems, logo design and branding frameworks.",
    keywords: ["visual identity", "brand identity system", "logo identity"],
  },
  {
    slug: "design-system-branding",
    title: "Brand Design Systems",
    description:
      "Design systems and brand guidelines developed for modern companies.",
    keywords: ["brand design system", "branding guidelines", "identity system"],
  },
];

export function getTopicBySlug(slug: string): ProgrammaticTopic | undefined {
  return programmaticTopics.find((t) => t.slug === slug);
}

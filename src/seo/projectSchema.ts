const SITE_URL = "https://somoskosmos.com";

export interface ProjectSchemaInput {
  /** Project title (for schema name and breadcrumb) */
  title: string;
  /** Meta/SEO description */
  description: string;
  /** Full URL of cover/og image */
  coverImage: string;
  /** URL path slug (e.g. project id) */
  slug: string;
  /** Optional keywords (string or array) */
  tags?: string | string[];
  /** Optional topic for topic pages (e.g. branding) */
  topic?: string;
  /** For topic pages: parent project URL as mainEntityOfPage */
  mainEntityOfPage?: string;
}

/**
 * Generates Schema.org CreativeWork JSON-LD for a project/case study page.
 */
export function generateProjectSchema(project: ProjectSchemaInput) {
  const baseUrl = `${SITE_URL}/project/${project.slug}`;
  const url = project.topic ? `${baseUrl}/${project.topic}` : baseUrl;
  const mainEntityOfPage = project.mainEntityOfPage ?? url;
  const keywords =
    typeof project.tags === "string"
      ? project.tags
      : Array.isArray(project.tags)
        ? project.tags
        : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/project/${project.slug}#article`,
    name: project.title,
    headline: project.title,
    description: project.description,
    image: project.coverImage,
    url,
    mainEntityOfPage,
    author: {
      "@type": "Organization",
      name: "Kosmos Studio",
      url: SITE_URL,
    },
    creator: {
      "@type": "Organization",
      name: "Kosmos Studio",
    },
    datePublished: "2024-01-01",
    publisher: {
      "@type": "Organization",
      name: "Kosmos Studio",
      url: SITE_URL,
    },
    ...(keywords && (Array.isArray(keywords) ? { keywords } : { keywords: [keywords] })),
  };
}

/**
 * Generates Schema.org ImageObject JSON-LD for Google Images SEO.
 */
export function generateImageObjectSchema(contentUrl: string, projectTitle: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl,
    creator: { "@type": "Organization", name: "Kosmos Studio" },
    creditText: "Kosmos Studio",
    license: SITE_URL,
    name: `${projectTitle} branding and visual identity design by Kosmos Studio`,
  };
}

const TOPIC_LABELS: Record<string, string> = {
  branding: "Branding",
  "design-system": "Design system",
  typography: "Typography",
  "visual-language": "Visual language",
  "case-study": "Case study",
};

/**
 * Generates Schema.org BreadcrumbList JSON-LD for project page hierarchy.
 */
export function generateBreadcrumbSchema(project: {
  title: string;
  slug: string;
  topic?: string;
}) {
  const items = [
    { "@type": "ListItem" as const, position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem" as const, position: 2, name: "Projects", item: SITE_URL + "/" },
    {
      "@type": "ListItem" as const,
      position: 3,
      name: project.title,
      item: `${SITE_URL}/project/${project.slug}`,
    },
  ];
  if (project.topic) {
    const topicLabel = TOPIC_LABELS[project.topic] ?? project.topic;
    items.push({
      "@type": "ListItem",
      position: 4,
      name: topicLabel,
      item: `${SITE_URL}/project/${project.slug}/${project.topic}`,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

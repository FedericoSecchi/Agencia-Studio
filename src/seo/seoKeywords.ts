/**
 * SEO keyword slugs for programmatic project pages.
 * Generates /project/:projectId/:keyword URLs for each combination.
 */
export const seoKeywords = [
  "branding-project",
  "visual-identity",
  "logo-design",
  "startup-branding",
  "design-system",
  "brand-guidelines",
  "corporate-identity",
  "digital-branding",
  "product-branding",
  "brand-strategy",
  "brand-design",
  "brand-identity-system",
  "visual-brand-system",
  "modern-branding",
  "creative-branding",
  "branding-for-tech",
  "brand-experience",
  "brand-architecture",
  "brand-visual-language",
  "identity-design",
] as const;

export type SeoKeywordSlug = (typeof seoKeywords)[number];

export function isSeoKeyword(slug: string): slug is SeoKeywordSlug {
  return (seoKeywords as readonly string[]).includes(slug);
}

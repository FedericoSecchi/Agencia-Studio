import { Helmet } from "react-helmet-async";

const SITE_URL = "https://somoskosmos.com";

export interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  /** Open Graph type (default: "website"; use "article" for project/case study pages) */
  type?: "website" | "article";
  /** OG image dimensions (recommended 1200x630 for default share image) */
  imageWidth?: number;
  imageHeight?: number;
}

/**
 * Injects dynamic title, meta description, canonical, Open Graph and Twitter tags.
 * Use absolute URLs for image and url when possible; relative paths are resolved against SITE_URL.
 */
const SEO = ({ title, description, image, url, type = "website", imageWidth, imageHeight }: SEOProps) => {
  const canonicalUrl = url ? (url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`) : SITE_URL;
  const imageUrl = image ? (image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`) : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Kosmos Studio" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && imageWidth && <meta property="og:image:width" content={String(imageWidth)} />}
      {imageUrl && imageHeight && <meta property="og:image:height" content={String(imageHeight)} />}
      {imageUrl && <meta property="og:image:alt" content={title} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  );
};

export default SEO;

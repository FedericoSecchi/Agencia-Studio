interface SeoImageProps {
  src: string;
  projectTitle: string;
  topic?: string;
  className?: string;
  loading?: "lazy" | "eager";
  /** Intrinsic width for CLS and SEO (e.g. 2560 for hero cover) */
  width?: number;
  /** Intrinsic height for CLS and SEO (e.g. 1400 for hero cover) */
  height?: number;
}

/**
 * Image component with consistent SEO alt text, lazy loading and optional width/height for CLS.
 */
export default function SeoImage({
  src,
  projectTitle,
  topic,
  className,
  loading = "lazy",
  width,
  height,
}: SeoImageProps) {
  const alt = topic
    ? `${projectTitle} ${topic.replace(/-/g, " ")} visual identity design`
    : `${projectTitle} branding project visual identity design`;

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      className={className}
      width={width}
      height={height}
      style={className ? undefined : { width: "100%", height: "auto" }}
    />
  );
}

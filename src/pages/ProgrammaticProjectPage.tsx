import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";
import { getProjectById } from "@/data/projects";
import { seoKeywords } from "@/seo/seoKeywords";
import { useI18n } from "@/i18n/context";

const SITE_URL = "https://somoskosmos.com";

/**
 * Programmatic SEO page: one page per project × keyword.
 * Renders project content with keyword-specific metadata. Same route pattern as ProjectTopic.
 */
const ProgrammaticProjectPage = () => {
  const { projectId, topic } = useParams<{ projectId: string; topic?: string }>();
  const { t } = useI18n();
  const project = projectId ? getProjectById(projectId) : undefined;

  if (!project || !topic) return null;

  const keywordLabel = topic.replace(/-/g, " ");
  const projectTitle = t<string>(`projects.${project.id}.title`);
  const seoTitle = `${projectTitle} ${keywordLabel} case study | Kosmos Studio`;
  const seoDescription = `Explore the ${keywordLabel} work behind the ${projectTitle} project by Kosmos Studio. Branding, visual identity and design system development.`;
  const canonicalUrl = `${SITE_URL}/project/${project.id}/${topic}`;
  const imageUrl = project.image.startsWith("http")
    ? project.image
    : `${SITE_URL}${project.image.startsWith("/") ? project.image : `/${project.image}`}`;

  return (
    <div className="relative min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={project.image}
        url={canonicalUrl}
        type="article"
      />
      <Header />
      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="section-container">
          <h1 className="headline-large mb-6">{seoTitle}</h1>
          <p className="body-large text-muted-foreground mb-12 max-w-2xl">
            {seoDescription}
          </p>

          <figure className="full-bleed mb-12">
            <div className="relative w-full aspect-[2560/1400] overflow-hidden rounded-lg">
              <img
                src={project.image}
                alt={`${projectTitle} ${keywordLabel} branding and design work by Kosmos Studio`}
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </div>
            <figcaption className="seo-hidden">
              {projectTitle} {keywordLabel} case study by Kosmos Studio.
            </figcaption>
          </figure>

          <Link
            to={`/project/${project.id}`}
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View full case study
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Internal linking to other keyword pages */}
          <nav className="mt-16 pt-8 border-t" aria-label="Related topics">
            <p className="text-sm text-muted-foreground mb-4">Explore more:</p>
            <div className="flex flex-wrap gap-4">
              {seoKeywords.slice(0, 5).map((k) => (
                <Link
                  key={k}
                  to={`/project/${project.id}/${k}`}
                  className="text-sm text-foreground hover:text-primary underline underline-offset-4"
                >
                  {k.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgrammaticProjectPage;

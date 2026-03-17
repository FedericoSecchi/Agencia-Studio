import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";
import { generateProjectSchema, generateBreadcrumbSchema, generateImageObjectSchema } from "@/seo/projectSchema";
import { projectTopics } from "@/seo/projectTopics";
import { generateTopicContent } from "@/seo/generateTopicContent";
import { projectsData, getProjectById } from "@/data/projects";
import SeoImage from "@/components/SeoImage";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useI18n } from "@/i18n/context";

const SITE_URL = "https://somoskosmos.com";

const ProjectCase = () => {
  const { projectId, topic } = useParams<{ projectId: string; topic?: string }>();
  const navigate = useNavigate();
  const project = projectId ? getProjectById(projectId) : undefined;
  const { t, language } = useI18n();

  useScrollAnimations();

  useEffect(() => {
    if (!project) {
      document.title = t("meta.projectNotFoundTitle");
    }
  }, [project, t]);

  if (!project) {
    return (
      <div className="relative min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[80vh] items-center justify-center bg-muted">
          <div className="text-center max-w-md">
            <h1 className="headline-medium mb-4">{t("caseStudy.notFoundTitle")}</h1>
            <p className="body-large text-muted-foreground mb-8">
              {t("caseStudy.notFoundDescription")}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate("/")} variant="default">
                {t("caseStudy.notFoundCtaHome")}
              </Button>
              <Button onClick={() => navigate("/#trabajos")} variant="outline">
                {t("caseStudy.notFoundCtaPortfolio")}
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const isPremium = project.layout === "premium";
  const galleries = project.galleries ?? [];
  const isOrbitaNarrative = project.id === "orbita" && galleries.length >= 6;
  const isNudeCase = project.id === "nude";

  const isTopicPage = Boolean(topic && projectTopics.includes(topic));
  const projectTitle = t<string>(`projects.${project.id}.title`);

  const canonicalUrl = isTopicPage
    ? `${SITE_URL}/project/${project.id}/${topic}`
    : `${SITE_URL}/project/${project.id}`;

  const topicContent = isTopicPage ? generateTopicContent(projectTitle, topic!) : null;
  const seoTitle = isTopicPage
    ? (topicContent?.title ?? projectTitle)
    : (project.seoTitle ?? `${projectTitle} — ${t("meta.projectTitleSuffix")}`);
  const seoDescription = isTopicPage
    ? (topicContent?.description ?? project.seoDescription)
    : (project.seoDescription ?? `${t("meta.projectDescriptionPrefix")} ${t<string>(`projects.${project.id}.miniDescription`)} ${t("meta.projectDescriptionSuffix")}`);
  const seoImage = project.seoImage ?? project.image;
  const imageFullUrl = seoImage.startsWith("http") ? seoImage : `${SITE_URL}${seoImage.startsWith("/") ? seoImage : `/${seoImage}`}`;

  const projectTag = t<string>(`projects.${project.id}.tag`);

  const creativeWorkJsonLd = generateProjectSchema({
    title: projectTitle,
    description: seoDescription,
    coverImage: imageFullUrl,
    slug: project.id,
    tags: projectTag,
    topic: isTopicPage ? topic : undefined,
    mainEntityOfPage: isTopicPage ? `${SITE_URL}/project/${project.id}` : undefined,
  });

  const breadcrumbListJsonLd = generateBreadcrumbSchema({
    title: projectTitle,
    slug: project.id,
    topic: isTopicPage ? topic : undefined,
  });

  const toFullUrl = (path: string) =>
    path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const allImageUrls = [
    toFullUrl(project.image),
    ...(galleries ?? []).map(toFullUrl),
  ].filter((url, i, arr) => arr.indexOf(url) === i);
  const imageObjectsJsonLd = allImageUrls.map((contentUrl) =>
    generateImageObjectSchema(contentUrl, projectTitle)
  );

  const keywordsContent = [projectTag, "case study", "branding", "Kosmos Studio"].join(", ");
  const SEO_LINK_TEXT: Record<string, string> = {
    "security-alliance": "Security Alliance",
    "the-red-guild": "The Red Guild",
    "orbita": "Orbita design system",
    nude: "Nude rebranding and web design",
  };

  return (
    <div className="relative min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={seoImage}
        url={canonicalUrl}
        type="article"
      />
      <Helmet>
        <meta name="keywords" content={[projectTag, "case study", "branding", "Kosmos Studio"].join(", ")} />
        <script type="application/ld+json">
          {JSON.stringify(creativeWorkJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbListJsonLd)}
        </script>
        {imageObjectsJsonLd.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@graph": imageObjectsJsonLd,
            })}
          </script>
        )}
      </Helmet>
      <Header />
      {/* Invisible semantic nav for crawlers and screen readers — internal linking without layout change */}
      <nav aria-label="Case studies" className="sr-only">
        <ul>
          {projectsData.map((p) => (
            <li key={p.id}>
              <Link to={`/project/${p.id}`}>{t(`projects.${p.id}.title`)}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <article itemScope itemType="https://schema.org/CreativeWork">
        <meta itemProp="author" content="Kosmos Studio" />
        <meta itemProp="creator" content="Kosmos Studio" />
        <meta itemProp="publisher" content="Kosmos Studio" />
        {/* Hero Section — mobile-first vertical spacing */}
        <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-background">
        <div className="section-container">
          <div className="mb-4 lg:mb-6">
            <BackButton className="mb-4 lg:mb-6" />
          </div>

          <div className="mb-8 lg:mb-12 flex flex-col items-center text-center space-y-4">
            <span className="label-text text-primary block">
              {t(`projects.${project.id}.tag`)}
            </span>
            <h1 className="headline-large">
              {isPremium
                ? t(`projects.${project.id}.title`)
                : `${t("caseStudy.h1Prefix")} ${t(`projects.${project.id}.title`)}`}
            </h1>
            <p className="body-large text-muted-foreground max-w-prose mx-auto">
              {t(`projects.${project.id}.miniDescription`)}
            </p>
            {project.externalUrl && project.externalUrl !== "#" && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-2 mt-6 rounded-full bg-primary text-black font-medium text-sm hover:opacity-90 transition"
              >
                visitar web
              </a>
            )}
          </div>

          {/* Cover Image — full-bleed for all projects */}
          <figure className="full-bleed">
            <div className="relative w-full aspect-[2560/1400] overflow-hidden">
              <SeoImage
                src={project.image}
                projectTitle={projectTitle}
                topic={isTopicPage ? topic : undefined}
                className="w-full h-full object-cover block"
                width={2560}
                height={1400}
              />
            </div>
          </figure>
        </div>
      </section>

      {/* Task Block */}
      {t(`projects.${project.id}.task`) && (
        <section className="pt-8 pb-12 lg:pt-12 lg:pb-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            {isPremium ? (
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16 xl:gap-24 items-center">
                <div className="flex items-center justify-start">
                  <h2 className="headline-medium">{t("caseStudy.task")}</h2>
                </div>
                <div className="max-w-[680px]">
                  <p className="body-large text-muted-foreground">
                    {t(`projects.${project.id}.task`)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl">
                <h2 className="headline-medium mb-6">{t("caseStudy.task")}</h2>
                <p className="body-large text-muted-foreground">
                  {t(`projects.${project.id}.task`)}
                </p>
              </div>
            )}
            {isPremium && galleries[0] && !isOrbitaNarrative && (
              <figure className="full-bleed mt-8 lg:mt-12">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[0]}
                    alt={`${projectTitle} — image 1`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
            {isOrbitaNarrative && galleries[0] && galleries[1] && galleries[2] && (
              <figure className="full-bleed mt-8 lg:mt-12">
                <div className="w-full overflow-hidden grid grid-cols-1 gap-0">
                  <img
                    src={galleries[0]}
                    alt={`${projectTitle} — image 1`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                  <img
                    src={galleries[1]}
                    alt={`${projectTitle} — image 2`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                  <img
                    src={galleries[2]}
                    alt={`${projectTitle} — image 3`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* Idea Block */}
      {(isPremium || t(`projects.${project.id}.idea`)) && (
        <section className="pt-6 pb-12 lg:pt-10 lg:pb-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            {isPremium ? (
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-16 xl:gap-24 items-center">
                <div className="flex items-center justify-start">
                  <h2 className="headline-medium">{t("caseStudy.sectionIdea")}</h2>
                </div>
                <div className="max-w-[680px]">
                  <p className="body-large text-muted-foreground">
                    {t(`projects.${project.id}.idea`)}
                  </p>
                </div>
              </div>
            ) : (
              <div className="max-w-4xl">
                <h2 className="headline-medium mb-6">{t("caseStudy.idea")}</h2>
                <p className="body-large text-muted-foreground">
                  {t(`projects.${project.id}.idea`)}
                </p>
              </div>
            )}
            {isPremium && galleries[1] && !isOrbitaNarrative && !isNudeCase && (
              <figure className="full-bleed mt-12 lg:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[1]}
                    alt={`${projectTitle} — image 2`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
            {isOrbitaNarrative && galleries[3] && (
              <figure className="full-bleed mt-12 lg:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[3]}
                    alt={`${projectTitle} — image 4`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
            {isPremium && galleries[2] && galleries.length < 6 && !isNudeCase && (
              <figure className="full-bleed mt-12 lg:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[2]}
                    alt={`${projectTitle} — image 3`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* Solución section (premium only) */}
      {isPremium && (
        <section className="pt-6 pb-12 lg:pt-10 lg:pb-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 xl:gap-32 items-center">
              <div className="flex items-center justify-start">
                <h2 className="headline-medium">{t("caseStudy.sectionSolution")}</h2>
              </div>
              <div className="max-w-[680px] space-y-6">
                {(() => {
                  const solutionItems = t<{ title: string; text: string }[] | string>(
                    `projects.${project.id}.solutionItems`
                  );
                  const items = Array.isArray(solutionItems) ? solutionItems : null;
                  if (items && items.length > 0) {
                    return items.map((item, idx) => (
                      <div key={idx}>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="body-large text-muted-foreground mt-2">
                          {item.text}
                        </p>
                      </div>
                    ));
                  }
                  return (
                    <p className="body-large text-muted-foreground">
                      {t(`projects.${project.id}.solution`)}
                    </p>
                  );
                })()}
              </div>
            </div>
            {galleries[3] && galleries.length < 6 && !isOrbitaNarrative && (
              <figure className="full-bleed mt-12 lg:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[3]}
                    alt={`${projectTitle} — image 4`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
            {isOrbitaNarrative && galleries[4] && (
              <figure className="full-bleed mt-12 lg:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[4]}
                    alt={`${projectTitle} — image 5`}
                    className="w-full h-auto object-cover block"
                    loading="lazy"
                  />
                </div>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* Galleries 3–6 block (premium with 6 galleries only, not Orbita narrative) */}
      {isPremium && galleries.length >= 6 && !isOrbitaNarrative && (
        <div className="full-bleed">
          <div className="w-full">
            {galleries[2] && (
              <figure className="mt-12 lg:mt-20 w-full overflow-hidden">
                <img
                  src={galleries[2]}
                  alt={`${projectTitle} — image 3`}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </figure>
            )}
            {galleries[3] && (
              <figure className="w-full overflow-hidden">
                <img
                  src={galleries[3]}
                  alt={`${projectTitle} — image 4`}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </figure>
            )}
            {galleries[4] && (
              <figure className="w-full overflow-hidden">
                <img
                  src={galleries[4]}
                  alt={`${projectTitle} — image 5`}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </figure>
            )}
          </div>
        </div>
      )}

      {/* Resultado section (premium only) */}
      {isPremium && t(`projects.${project.id}.result`) && (
        <section className="pt-6 pb-12 lg:pt-10 lg:pb-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-16 xl:gap-32 items-center">
              <div className="flex items-center justify-start">
                <h2 className="headline-medium">{t("caseStudy.sectionResult")}</h2>
              </div>
              <div className="max-w-[680px]">
                <p className="body-large text-muted-foreground">
                  {t(`projects.${project.id}.result`)}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Gallery 6 (premium with 6 galleries only, below Resultado) — full-bleed for all */}
      {isPremium && galleries.length >= 6 && galleries[5] && (
        <figure className="full-bleed">
          <div className="w-full overflow-hidden mt-12 lg:mt-20">
            <img
              src={galleries[5]}
              alt={`${projectTitle} — image 6`}
              className="w-full h-auto object-cover block"
              loading="lazy"
            />
          </div>
        </figure>
      )}

      {/* Solution Block (default layout only) */}
      {!isPremium && t(`projects.${project.id}.solution`) && (
        <section className="pt-6 pb-12 lg:pt-10 lg:pb-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-4xl">
              <h2 className="headline-medium mb-6">{t("caseStudy.solution")}</h2>
              <p className="body-large text-muted-foreground">
                {t(`projects.${project.id}.solution`)}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Visual Gallery Block (default layout only) — full-bleed */}
      {!isPremium && (
        <section className="py-12 lg:py-20 bg-background">
          <figure className="full-bleed mb-6">
            <div className="relative w-full aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={`${projectTitle} — image 1`}
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </div>
          </figure>
          <div className="full-bleed grid grid-cols-1 lg:grid-cols-2 gap-0 mb-6">
            <figure className="relative aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={`${projectTitle} — image 2`}
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </figure>
            <figure className="relative aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={`${projectTitle} — image 3`}
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </figure>
          </div>
          <figure className="full-bleed">
            <div className="relative w-full aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={`${projectTitle} — image 4`}
                className="w-full h-full object-cover block"
                loading="lazy"
              />
            </div>
          </figure>
        </section>
      )}

      {/* Next Project Navigation */}
      <div className="mt-24 mb-32 flex justify-center lg:mt-28 lg:mb-36">
        <Button variant="default" size="lg" asChild>
          <Link to={`/project/${nextProject.id}`}>
            {t("caseStudy.nextProject")} →
          </Link>
        </Button>
      </div>

      {/* SEO: invisible semantic sections for crawlers — no layout change */}
      <section className="seo-hidden">
        <h2>Project overview</h2>
        <p>{seoDescription}</p>
      </section>
      <section className="seo-hidden">
        <h2>Design disciplines</h2>
        <p>Brand identity, typography, visual system, digital experience.</p>
      </section>
      <section className="seo-hidden">
        <h2>Creative process</h2>
        <p>Concept exploration, visual language development, brand architecture and digital design implementation.</p>
      </section>
      <nav className="seo-hidden" aria-label="Portfolio and services">
        {projectsData.map((p) => (
          <a key={p.id} href={`/project/${p.id}`}>{SEO_LINK_TEXT[p.id] ?? t(`projects.${p.id}.title`)}</a>
        ))}
        {isTopicPage ? (
          <>
            <a href={`/project/${project.id}`}>{projectTitle} case study</a>
            {projectTopics
              .filter((t) => t !== topic)
              .map((tpc) => (
                <a key={tpc} href={`/project/${project.id}/${tpc}`}>{projectTitle} {tpc.replace(/-/g, " ")}</a>
              ))}
          </>
        ) : (
          projectTopics.map((tpc) => (
            <a key={tpc} href={`/project/${project.id}/${tpc}`}>{projectTitle} {tpc.replace(/-/g, " ")}</a>
          ))
        )}
      </nav>
    </article>
      <Footer />
    </div>
  );
};

export default ProjectCase;

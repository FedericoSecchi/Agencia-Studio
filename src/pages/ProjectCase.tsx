import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projectsData, getProjectById } from "@/data/projects";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useI18n } from "@/i18n/context";

const ProjectCase = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = projectId ? getProjectById(projectId) : undefined;
  const { t, language } = useI18n();

  useScrollAnimations();

  useEffect(() => {
    if (project) {
      const title = t<string>(`projects.${project.id}.title`);
      document.title = `${title} — ${t("meta.projectTitleSuffix")}`;
    } else {
      document.title = t("meta.projectNotFoundTitle");
    }
    const description = project
      ? `${t("meta.projectDescriptionPrefix")} ${t<string>(
          `projects.${project.id}.miniDescription`
        )} ${t("meta.projectDescriptionSuffix")}`
      : t("meta.projectNotFoundDescription");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", description);
    } else {
      const metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      metaTag.setAttribute("content", description);
      document.head.appendChild(metaTag);
    }
  }, [project, language, t]);

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
              <Button onClick={() => navigate("/#work")} variant="outline">
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

  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      {/* Hero Section — mobile-first vertical spacing */}
      <section className="pt-24 pb-8 md:pt-32 md:pb-12 bg-background">
        <div className="section-container">
          <div className="mb-4 md:mb-6">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 md:mb-6"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {t("caseStudy.backToPortfolio")}
            </Link>
          </div>

          <div className="mb-8 md:mb-12 flex flex-col items-center text-center space-y-4">
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
          </div>

          {/* Cover Image — full-bleed for all projects */}
          <div className="full-bleed">
            <div className="relative w-full aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={t(`projects.${project.id}.title`)}
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Task Block */}
      {t(`projects.${project.id}.task`) && (
        <section className="pt-8 pb-12 md:pt-12 md:pb-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            {isPremium ? (
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 md:gap-16 lg:gap-24 items-center">
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
              <div className="full-bleed mt-8 md:mt-12">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[0]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 1`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            )}
            {isOrbitaNarrative && galleries[0] && galleries[1] && galleries[2] && (
              <div className="full-bleed mt-8 md:mt-12">
                <div className="w-full overflow-hidden grid grid-cols-1 gap-0">
                  <img
                    src={galleries[0]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 1`}
                    className="w-full h-auto object-cover block"
                  />
                  <img
                    src={galleries[1]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 2`}
                    className="w-full h-auto object-cover block"
                  />
                  <img
                    src={galleries[2]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 3`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Idea Block */}
      {(isPremium || t(`projects.${project.id}.idea`)) && (
        <section className="pt-6 pb-12 md:pt-10 md:pb-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            {isPremium ? (
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 md:gap-16 lg:gap-24 items-center">
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
            {isPremium && galleries[1] && !isOrbitaNarrative && (
              <div className="full-bleed mt-12 md:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[1]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 2`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            )}
            {isOrbitaNarrative && galleries[3] && (
              <div className="full-bleed mt-12 md:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[3]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 4`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            )}
            {isPremium && galleries[2] && galleries.length < 6 && (
              <div className="full-bleed mt-12 md:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[2]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 3`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-12 md:mt-20" />
          </div>
        </section>
      )}

      {/* Solución section (premium only) */}
      {isPremium && (
        <section className="py-12 md:py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 md:gap-16 lg:gap-32 items-center">
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
              <div className="full-bleed mt-12 md:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[3]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 4`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            )}
            {isOrbitaNarrative && galleries[4] && (
              <div className="full-bleed mt-12 md:mt-20">
                <div className="w-full overflow-hidden">
                  <img
                    src={galleries[4]}
                    alt={`${t(`projects.${project.id}.title`)} Gallery 5`}
                    className="w-full h-auto object-cover block"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-12 md:mt-20" />
          </div>
        </section>
      )}

      {/* Galleries 3–6 block (premium with 6 galleries only, not Orbita narrative) */}
      {isPremium && galleries.length >= 6 && !isOrbitaNarrative && (
        <div className="full-bleed">
          <div className="w-full">
            {galleries[2] && (
              <div className="mt-12 md:mt-20 w-full overflow-hidden">
                <img
                  src={galleries[2]}
                  alt={`${t(`projects.${project.id}.title`)} Gallery 3`}
                  className="w-full h-auto object-cover block"
                />
              </div>
            )}
            {galleries[3] && (
              <div className="w-full overflow-hidden">
                <img
                  src={galleries[3]}
                  alt={`${t(`projects.${project.id}.title`)} Gallery 4`}
                  className="w-full h-auto object-cover block"
                />
              </div>
            )}
            {galleries[4] && (
              <div className="w-full overflow-hidden">
                <img
                  src={galleries[4]}
                  alt={`${t(`projects.${project.id}.title`)} Gallery 5`}
                  className="w-full h-auto object-cover block"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Resultado section (premium only) */}
      {isPremium && t(`projects.${project.id}.result`) && (
        <section className="py-12 md:py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 md:gap-16 lg:gap-32 items-center">
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
          <div className="section-container">
            <hr className="border-t border-border/30 mt-12 md:mt-20" />
          </div>
        </section>
      )}

      {/* Gallery 6 (premium with 6 galleries only, below Resultado) — full-bleed for all */}
      {isPremium && galleries.length >= 6 && galleries[5] && (
        <section className="full-bleed">
          <div className="w-full overflow-hidden mt-12 md:mt-20">
            <img
              src={galleries[5]}
              alt={`${t(`projects.${project.id}.title`)} Gallery 6`}
              className="w-full h-auto object-cover block"
            />
          </div>
        </section>
      )}

      {/* Solution Block (default layout only) */}
      {!isPremium && t(`projects.${project.id}.solution`) && (
        <section className="py-12 md:py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-4xl">
              <h2 className="headline-medium mb-6">{t("caseStudy.solution")}</h2>
              <p className="body-large text-muted-foreground">
                {t(`projects.${project.id}.solution`)}
              </p>
            </div>
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-12 md:mt-20" />
          </div>
        </section>
      )}

      {/* Visual Gallery Block (default layout only) — full-bleed */}
      {!isPremium && (
        <section className="py-12 md:py-20 bg-background">
          <div className="full-bleed mb-6">
            <div className="relative w-full aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 1`}
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
          <div className="full-bleed grid grid-cols-1 md:grid-cols-2 gap-0 mb-6">
            <div className="relative aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 2`}
                className="w-full h-full object-cover block"
              />
            </div>
            <div className="relative aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 3`}
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
          <div className="full-bleed">
            <div className="relative w-full aspect-[2560/1400] overflow-hidden">
              <img
                src={project.image}
                alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 4`}
                className="w-full h-full object-cover block"
              />
            </div>
          </div>
        </section>
      )}

      {/* Next Project Navigation (default layout only) */}
      {!isPremium && (
        <section className="py-12 md:py-20 bg-background border-t">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center">
              <p className="body-regular text-muted-foreground mb-6">{t("caseStudy.nextProject")}</p>
              <Link to={`/project/${nextProject.id}`}>
                <h3 className="headline-medium mb-4 hover:text-primary transition-colors">
                  {t(`projects.${nextProject.id}.title`)}
                </h3>
              </Link>
              <Link to="/#work">
                <Button variant="outline" className="mt-8">
                  {t("caseStudy.viewAll")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default ProjectCase;

import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projectsData, getProjectById } from "@/data/projects";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useI18n } from "@/i18n/context";
import redGuildGallery6 from "@/assets/projects/the-red-guild/gallery-6.jpg";

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

  return (
    <div className="relative min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-background">
        <div className="section-container">
          <div className="mb-8">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
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

          <div className="mb-12">
            <span className="label-text text-primary mb-4 block">
              {t(`projects.${project.id}.tag`)}
            </span>
            <h1 className="headline-large mb-4">
              {isPremium
                ? t(`projects.${project.id}.title`)
                : `${t("caseStudy.h1Prefix")} ${t(`projects.${project.id}.title`)}`}
            </h1>
            <p className="body-large text-muted-foreground max-w-2xl">
              {t(`projects.${project.id}.miniDescription`)}
            </p>
          </div>

          {/* Cover Image */}
          <div className="relative w-full aspect-[2560/1400] rounded-2xl overflow-hidden">
            <img
              src={project.image}
              alt={t(`projects.${project.id}.title`)}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Task Block */}
      {t(`projects.${project.id}.task`) && (
        <section className="py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            {isPremium ? (
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16 lg:gap-24 items-center">
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
            {isPremium && galleries[0] && (
              <div className="mt-12 w-full rounded-2xl overflow-hidden">
                <img
                  src={galleries[0]}
                  alt={`${t(`projects.${project.id}.title`)} Gallery 1`}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-20" />
          </div>
        </section>
      )}

      {/* Idea Block */}
      {(isPremium || t(`projects.${project.id}.idea`)) && (
        <section className="py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            {isPremium ? (
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16 lg:gap-24 items-center">
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
            {isPremium && galleries[1] && (
              <div className="mt-20 w-full rounded-2xl overflow-hidden">
                <img
                  src={galleries[1]}
                  alt={`${t(`projects.${project.id}.title`)} Gallery 2`}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
            {isPremium && galleries[2] && (
              <div className="mt-20 w-full rounded-2xl overflow-hidden">
                <img
                  src={galleries[2]}
                  alt={`${t(`projects.${project.id}.title`)} Gallery 3`}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-20" />
          </div>
        </section>
      )}

      {/* Solución section (premium only) */}
      {isPremium && (
        <section className="py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16 lg:gap-32 items-center">
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
            {galleries[3] && (
              <div className="mt-20 w-full rounded-2xl overflow-hidden">
                <img
                  src={galleries[3]}
                  alt={`${t(`projects.${project.id}.title`)} Gallery 4`}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-20" />
          </div>
        </section>
      )}

      {/* Resultado section (premium only) */}
      {isPremium && t(`projects.${project.id}.result`) && (
        <section className="py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-16 lg:gap-32 items-center">
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
            <hr className="border-t border-border/30 mt-20" />
          </div>
        </section>
      )}

      {/* Gallery 6 (the-red-guild only, below Resultado) */}
      {isPremium && project.id === "the-red-guild" && (
        <section className="section-container">
          <div className="mt-20 w-full rounded-2xl overflow-hidden">
            <img
              src={redGuildGallery6}
              alt={`${t(`projects.${project.id}.title`)} Gallery 6`}
              className="w-full h-auto object-contain"
            />
          </div>
        </section>
      )}

      {/* Solution Block (default layout only) */}
      {!isPremium && t(`projects.${project.id}.solution`) && (
        <section className="py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-4xl">
              <h2 className="headline-medium mb-6">{t("caseStudy.solution")}</h2>
              <p className="body-large text-muted-foreground">
                {t(`projects.${project.id}.solution`)}
              </p>
            </div>
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-20" />
          </div>
        </section>
      )}

      {/* Visual Gallery Block (default layout only) */}
      {!isPremium && (
        <section className="py-20 bg-background">
          <div className="section-container">
            <div className="mb-6">
              <div className="relative w-full aspect-[2560/1400] rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 1`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="relative aspect-[2560/1400] rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 2`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative aspect-[2560/1400] rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 3`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <div className="relative w-full aspect-[2560/1400] rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 4`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Next Project Navigation (default layout only) */}
      {!isPremium && (
        <section className="py-20 bg-background border-t">
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

import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { projectsData, getProjectById } from "@/data/projects";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";
import { useI18n } from "@/i18n/context";
import securityGallery1 from "@/assets/projects/security-alliance/gallery-1.jpg";
import securityGallery2 from "@/assets/projects/security-alliance/gallery-2.jpg";

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

  // Get next project for navigation
  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

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
              {project.id === "hotel-alpino" ? "BRANDING" : t(`projects.${project.id}.tag`)}
            </span>
            <h1 className="headline-large mb-4">
              {project.id === "hotel-alpino" ? "Security Alliance" : `${t("caseStudy.h1Prefix")} ${t(`projects.${project.id}.title`)}`}
            </h1>
            <p className="body-large text-muted-foreground max-w-2xl">
              {project.id === "hotel-alpino" ? "Branding vivo para una alianza global de seguridad en crypto" : t(`projects.${project.id}.miniDescription`)}
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
            {project.id === "hotel-alpino" ? (
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
            {project.id === "hotel-alpino" && (
              <div className="mt-12 w-full rounded-2xl overflow-hidden">
                <img
                  src={securityGallery1}
                  alt="Security Alliance Gallery 1"
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
      {(project.id === "hotel-alpino" || t(`projects.${project.id}.idea`)) && (
        <section className="py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            {project.id === "hotel-alpino" ? (
              <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16 lg:gap-24 items-center">
                <div className="flex items-center justify-start">
                  <h2 className="headline-medium">Idea</h2>
                </div>
                <div className="max-w-[680px]">
                  <p className="body-large text-muted-foreground">
                    En lugar de rediseñar todo desde cero, trabajamos como "amplificadores" de la marca existente. La idea fue construir un lenguaje visual modular: una identidad que se sintiera sólida y consistente, pero lo bastante elástica como para albergar productos muy distintos entre sí, desde servicios de respuesta a incidentes hasta programas legales y wargames educativos. Cada pieza —presentaciones, redes, ilustraciones o nuevos logos— debía ayudar a Security Alliance a explicar mejor qué hace y por qué es tan crítica para la seguridad del ecosistema.
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
            {project.id === "hotel-alpino" && (
              <div className="mt-20 relative w-full aspect-[2560/1400] rounded-2xl overflow-hidden">
                <img
                  src={securityGallery2}
                  alt="Security Alliance Gallery 2"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-20" />
          </div>
        </section>
      )}

      {/* Solution Block */}
      {t(`projects.${project.id}.solution`) && (
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

      {/* Visual Gallery Block */}
      <section className="py-20 bg-background">
        <div className="section-container">
          {/* 1 large image */}
          <div className="mb-6">
            <div className="relative w-full aspect-[2560/1400] rounded-2xl overflow-hidden">
              <img
                src={project.image}
                alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 1`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* 2 small images side by side */}
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
          
          {/* 1 large image */}
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

      {/* Next Project Navigation */}
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
      <Footer />
    </div>
  );
};

export default ProjectCase;


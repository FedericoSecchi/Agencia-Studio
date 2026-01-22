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
              {t(`projects.${project.id}.tag`)}
            </span>
            <h1 className="headline-large mb-4">{t(`projects.${project.id}.title`)}</h1>
            <p className="body-large text-muted-foreground max-w-2xl">
              {t(`projects.${project.id}.miniDescription`)}
            </p>
          </div>

          {/* Cover Image */}
          <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
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
            <div className="max-w-4xl">
              <h2 className="headline-medium mb-6">{t("caseStudy.task")}</h2>
              <p className="body-large text-muted-foreground">
                {t(`projects.${project.id}.task`)}
              </p>
            </div>
          </div>
          <div className="section-container">
            <hr className="border-t border-border/30 mt-20" />
          </div>
        </section>
      )}

      {/* Idea Block */}
      {t(`projects.${project.id}.idea`) && (
        <section className="py-20 bg-background" data-animate="fade-up">
          <div className="section-container">
            <div className="max-w-4xl">
              <h2 className="headline-medium mb-6">{t("caseStudy.idea")}</h2>
              <p className="body-large text-muted-foreground">
                {t(`projects.${project.id}.idea`)}
              </p>
            </div>
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
            <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
              <img
                src={project.image}
                alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 1`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* 2 small images side by side */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img
                src={project.image}
                alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 2`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img
                src={project.image}
                alt={`${t(`projects.${project.id}.title`)} - ${t("caseStudy.detailAlt")} 3`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* 1 large image */}
          <div>
            <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
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


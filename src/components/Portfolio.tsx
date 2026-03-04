import { Link } from "react-router-dom";
import { projectsData } from "@/data/projects";
import { useI18n } from "@/i18n/context";

const Portfolio = () => {
  const { t } = useI18n();
  return (
    <section id="work" className="relative z-20 py-16 md:py-24 lg:py-32 bg-secondary text-secondary-foreground">
      <div className="section-container">
        <div className="mb-16" data-animate="fade-up">
          <span className="label-text text-primary mb-4 block">{t("work.label")}</span>
          <h2 className="headline-medium mb-4">{t("work.title")}</h2>
          <p className="body-large text-secondary-foreground/60">
            {t("work.subtitle")}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          data-animate="stagger"
        >
          {projectsData.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`group relative flex flex-col h-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl aspect-[2560/1400] ${
                project.size === "large" ? "md:row-span-2" : ""
              }`}
            >
              {/* Background layer: image + gradient (z-0, below content) */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={t(`projects.${project.id}.title`)}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              </div>

              {/* Arrow button — top-left, revealed on hover (relative to card) */}
              <div className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                <svg
                  className="w-5 h-5 text-background"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              {/* Project title — above badge, revealed on hover */}
              <h3 className="absolute left-4 bottom-14 z-10 font-display text-2xl md:text-3xl font-bold text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t(`projects.${project.id}.title`)}
              </h3>

              {/* Green badge — 30px above bottom; hover: bottom-4 + counter-translate */}
              <div className="absolute left-4 bottom-[30px] z-10 flex flex-col items-start transition-all duration-500 group-hover:bottom-4 group-hover:translate-y-2">
                <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  {t(`projects.${project.id}.tag`)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

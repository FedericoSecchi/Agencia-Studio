import { Link } from "react-router-dom";
import { projectsData } from "@/data/projects";
import { useI18n } from "@/i18n/context";

const Portfolio = () => {
  const { t } = useI18n();
  return (
    <section id="work" className="py-32 bg-secondary text-secondary-foreground">
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
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl block aspect-[2560/1400] ${
                project.size === "large" ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={project.image}
                alt={t(`projects.${project.id}.title`)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent">
                {/* Tag */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                    {t(`projects.${project.id}.tag`)}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-sm text-background/70 mb-2">
                    {t(`projects.${project.id}.type`)}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-background">
                    {t(`projects.${project.id}.title`)}
                  </h3>

                  {/* Arrow indicator */}
                  <div className="mt-4 w-10 h-10 rounded-full bg-background/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

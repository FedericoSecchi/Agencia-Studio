import { Link } from "react-router-dom";
import { projectsData } from "@/data/projects";
import { useI18n } from "@/i18n/context";

const Portfolio = () => {
  const { t } = useI18n();
  const isExternal = (url?: string) => url && url !== "#";

  return (
    <section id="trabajos" className="relative z-20 py-16 lg:py-24 xl:py-32 bg-neutral-950 text-white">
      <div className="section-container">
        <div className="mb-12 lg:mb-16" data-animate="fade-up">
          <span className="label-text text-primary mb-4 block">{t("work.label")}</span>
          <h2 className="headline-medium mb-4">{t("work.title")}</h2>
          <p className="body-large text-neutral-400">
            {t("work.subtitle")}
          </p>
        </div>

        {/* Portfolio Grid — fluid auto-fit: cards grow with viewport */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
          data-animate="stagger"
        >
          {projectsData.map((project) => {
            const external = isExternal(project.externalUrl);
            const cardClass = "group relative flex flex-col h-full w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl aspect-[2560/1400]";
            const content = (
              <>
              {/* Background layer: image + gradient (z-0, below content) */}
              <div className="absolute inset-0 z-0">
                <img
                  src={project.image}
                  alt={`${t(`projects.${project.id}.title`)} ${t(`projects.${project.id}.tag`)} — Kosmos Studio`}
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
              <h3 className="absolute left-4 bottom-14 z-10 font-display text-2xl lg:text-3xl font-bold text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {t(`projects.${project.id}.title`)}
              </h3>

              {/* Green badge and visit-website button */}
              <div className="absolute left-0 right-0 bottom-[30px] z-10 flex flex-col items-center px-4">
                <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  {t(`projects.${project.id}.tag`)}
                </span>
                {project.externalUrl && project.externalUrl !== "#" && (
                  <a
                    href={project.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center justify-center px-5 py-2 mt-4 rounded-full bg-primary text-black font-medium text-sm hover:opacity-90 transition"
                  >
                    visitar web
                  </a>
                )}
              </div>
            </>
            );
            return external ? (
              <a
                key={project.id}
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {content}
              </a>
            ) : (
              <Link key={project.id} to={`/project/${project.id}`} className={cardClass}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

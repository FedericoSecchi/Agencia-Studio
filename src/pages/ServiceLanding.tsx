import { useParams, Navigate, Link } from "react-router-dom";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";
import { projectsData } from "@/data/projects";
import { useI18n } from "@/i18n/context";

const SITE_URL = "https://somoskosmos.com";

const SERVICE_SLUGS = ["branding", "websites", "content-motion", "systems-automation"] as const;
const SERVICE_KEYS: Record<string, "branding" | "websites" | "content" | "systems"> = {
  branding: "branding",
  websites: "websites",
  "content-motion": "content",
  "systems-automation": "systems",
};

const ServiceLanding = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const { t } = useI18n();

  if (!serviceSlug || !SERVICE_SLUGS.includes(serviceSlug as (typeof SERVICE_SLUGS)[number])) {
    return <Navigate to="/" replace />;
  }

  const key = SERVICE_KEYS[serviceSlug];
  const title = t(`services.${key}.title`);
  const description = t(`services.${key}.description`);
  const seoKeywords = t(`services.${key}.seo`);

  const canonicalUrl = `${SITE_URL}/services/${serviceSlug}`;
  const seoTitle = `${title} | Kosmos Studio`;
  const seoDescription = `${description} ${seoKeywords ? `— ${seoKeywords}` : ""}`;

  return (
    <div className="relative min-h-screen bg-background">
      <SEO title={seoTitle} description={seoDescription} url={canonicalUrl} type="website" />
      <Header />
      <main className="pt-24 pb-16 lg:pt-32 lg:pb-24">
        <section className="section-container">
          <div className="mb-8">
            <BackButton />
          </div>
          <div className="mb-12 lg:mb-16">
            <span className="label-text text-primary block mb-4">{t("services.label")}</span>
            <h1 className="headline-large mb-6">{title}</h1>
            <p className="body-large text-muted-foreground max-w-2xl">{description}</p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
            {projectsData.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className="group relative flex flex-col h-full w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl aspect-[2560/1400]"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={project.image}
                    alt={`${t(`projects.${project.id}.title`)} ${title} project — brand identity by Kosmos Studio`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-40"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                </div>
                <div className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-foreground/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <svg className="w-5 h-5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h2 className="absolute left-4 bottom-14 z-10 font-display text-2xl lg:text-3xl font-bold text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t(`projects.${project.id}.title`)}
                </h2>
                <span className="absolute left-4 bottom-[30px] z-10 inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  {t(`projects.${project.id}.tag`)}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceLanding;

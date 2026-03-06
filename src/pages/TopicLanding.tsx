import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";
import { projectsData } from "@/data/projects";
import { programmaticTopics } from "@/seo/programmaticTopics";
import { useI18n } from "@/i18n/context";

const SITE_URL = "https://somoskosmos.com";

const TopicLanding = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const { t } = useI18n();

  const topic = programmaticTopics.find((t) => t.slug === topicSlug);

  if (!topic) {
    return <Navigate to="/" replace />;
  }

  const canonicalUrl = `${SITE_URL}/topic/${topic.slug}`;
  const seoTitle = `${topic.title} | Kosmos Studio`;
  const seoDescription = topic.description;

  return (
    <div className="relative min-h-screen bg-background">
      <SEO
        title={seoTitle}
        description={seoDescription}
        url={canonicalUrl}
        type="website"
      />
      <Header />
      <main className="pt-24 pb-16 md:pt-32 md:pb-24">
        <section className="section-container">
          <div className="mb-12 md:mb-16">
            <h1 className="headline-large mb-6">{topic.title}</h1>
            <p className="body-large text-muted-foreground max-w-2xl">
              {topic.description}
            </p>
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
                    alt={`${t(`projects.${project.id}.title`)} branding and visual identity by Kosmos Studio`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-40"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                </div>
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
                <h2 className="absolute left-4 bottom-14 z-10 font-display text-2xl md:text-3xl font-bold text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t(`projects.${project.id}.title`)}
                </h2>
                <span className="absolute left-4 bottom-[30px] z-10 inline-block px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-full">
                  {t(`projects.${project.id}.tag`)}
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
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
              Back to home
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TopicLanding;

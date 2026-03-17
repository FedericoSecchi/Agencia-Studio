import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "@/seo/SEO";
import { useI18n } from "@/i18n/context";

const SITE_URL = "https://somoskosmos.com";

const NotFound = () => {
  const location = useLocation();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <SEO title={t("meta.notFoundTitle")} description={t("meta.notFoundDescription")} url={`${SITE_URL}${location.pathname}`} />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t("notFound.title")}</h1>
        <p className="mb-4 text-xl text-muted-foreground">404</p>
        <Link to="/" className="text-primary underline hover:text-primary/90">
          {t("notFound.cta")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

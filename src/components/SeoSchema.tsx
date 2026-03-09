import { useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { organizationSchema } from "@/seo/schemaOrganization";

const SeoSchema = () => {
  const { t, language } = useI18n();

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const siteUrl = window.location.origin;
    const description = t("meta.homeDescription");
    const name = t("brand.fullName");
    const organization = {
      ...organizationSchema,
      name,
      description,
      url: siteUrl,
    };
    const professionalService = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Kosmos Studio",
      url: siteUrl,
      serviceType: ["Branding", "Web Design", "Motion Design", "Design Systems"],
    };

    const schema = [
      organization,
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        description,
        url: siteUrl,
        inLanguage: language,
      },
      professionalService,
    ];

    const existing = document.querySelector("script[data-schema='studio']");
    if (existing) {
      existing.textContent = JSON.stringify(schema);
      return;
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "studio");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }, [language, t]);

  return null;
};

export default SeoSchema;

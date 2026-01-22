import { Link } from "react-router-dom";
import { scrollToTop, scrollToSection } from "@/utils/scroll";
import { useI18n } from "@/i18n/context";

const Footer = () => {
  const { t } = useI18n();
  const footerLinks = [
    { key: "nav.home", section: "home" },
    { key: "nav.work", section: "work" },
    { key: "nav.capabilities", section: "capabilities" },
    { key: "nav.contact", section: "contact" },
  ];
  const socials = [
    { key: "footer.socials.twitter", href: "#" },
    { key: "footer.socials.instagram", href: "#" },
    { key: "footer.socials.dribbble", href: "#" },
  ];
  const handleNavClick = (link: string) => {
    if (link === "home") {
      scrollToTop();
    } else {
      scrollToSection(`#${link}`);
    }
  };

  return (
    <footer className="bg-foreground text-background py-20">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="font-display text-3xl font-bold mb-6 block">
              {t("brand.name")}<span className="text-primary">{t("brand.dot")}</span>
            </Link>
            <p className="body-regular text-background/60 mb-6 max-w-xs">
              {t("footer.description")}
            </p>
            <a
              href={`mailto:${t("contact.email")}`}
              className="font-display font-semibold text-primary hover:underline"
            >
              {t("contact.email")}
            </a>
          </div>

          {/* Navigation */}
          <div>
            <span className="label-text text-background/40 mb-6 block">
              {t("footer.navigation")}
            </span>
            <nav className="space-y-3">
              {footerLinks.map((link) => (
                <button
                  key={link.section}
                  onClick={() => handleNavClick(link.section)}
                  className="block w-full text-left font-body text-background/80 hover:text-primary transition-colors"
                >
                  {t(link.key)}
                </button>
              ))}
            </nav>
          </div>

          {/* Collab */}
          <div>
            <span className="label-text text-background/40 mb-6 block">
              {t("footer.collaborate")}
            </span>
            <p className="body-regular text-background/60 mb-4">
              {t("footer.collaborateDescription")}
            </p>
            <a
              href={`mailto:${t("contact.email")}`}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-body font-medium text-sm hover:scale-105 transition-transform"
            >
              {t("footer.cta")}
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/40">
            {t("footer.copyright")}
          </p>

          <div className="flex items-center gap-6">
            {socials.map((social) => (
              <a
                key={social.key}
                href={social.href}
                className="text-sm text-background/40 hover:text-primary transition-colors"
              >
                {t(social.key)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

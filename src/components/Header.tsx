import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/MobileMenu";
import { scrollToSection, scrollToTop, createNavigateToSection } from "@/utils/scroll";
import { useI18n } from "@/i18n/context";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToSection = createNavigateToSection(navigate, location.pathname);
  const navItems = [
    { key: "nav.work", section: "work" },
    { key: "nav.capabilities", section: "capabilities" },
    { key: "nav.about", section: "about" },
    { key: "nav.process", section: "process" },
    { key: "nav.contact", section: "contact" },
  ];

  const handleStartProject = () => {
    navigateToSection("#contact");
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    navigateToSection(sectionId);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-secondary text-secondary-foreground">
        <div className="section-container flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" onClick={() => scrollToTop()} className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tight">
              {t("brand.name")}<span className="text-primary">{t("brand.dot")}</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const sectionId = `#${item.section}`;
              return (
                <a
                  key={item.section}
                  href={sectionId}
                  onClick={(e) => handleNavClick(e, sectionId)}
                  className="link-animated font-body text-base font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  {t(item.key)}
                </a>
              );
            })}
          </nav>

          {/* Language Toggle & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="text-base font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors uppercase"
              aria-label={t("language.toggleAria")}
            >
              {t("language.toggleLabel")}
            </button>
            <Button
              variant="neon"
              size="sm"
              className="text-base"
              onClick={handleStartProject}
            >
              {t("hero.ctaStart")}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label={t("aria.openMenu")}
          >
            <span className="w-6 h-0.5 bg-secondary-foreground"></span>
            <span className="w-6 h-0.5 bg-secondary-foreground"></span>
            <span className="w-4 h-0.5 bg-secondary-foreground"></span>
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;

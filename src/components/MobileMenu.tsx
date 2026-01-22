import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { createNavigateToSection } from "@/utils/scroll";
import { useI18n } from "@/i18n/context";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { t } = useI18n();
  const navItems = [
    { key: "nav.work", section: "work" },
    { key: "nav.capabilities", section: "capabilities" },
    { key: "nav.about", section: "about" },
    { key: "nav.process", section: "process" },
    { key: "nav.contact", section: "contact" },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const navigateToSection = createNavigateToSection(navigate, location.pathname);

  const handleNavClick = (section: string) => {
    const sectionId = `#${section}`;
    navigateToSection(sectionId);
    onClose();
  };

  const handleStartProject = () => {
    navigateToSection("#contact");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-secondary text-secondary-foreground shadow-2xl">
        <div className="flex flex-col h-full p-8">
          {/* Close button */}
          <button
            onClick={onClose}
            className="self-end mb-8 p-2 hover:opacity-70 transition-opacity"
            aria-label={t("aria.closeMenu")}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation */}
          <nav className="flex-1 space-y-6">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => handleNavClick(item.section)}
                className="block w-full text-left font-display text-2xl font-bold hover:text-primary transition-colors"
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="pt-8 border-t border-secondary-foreground/20">
            <Button
              variant="neon"
              size="lg"
              className="w-full"
              onClick={handleStartProject}
            >
              {t("hero.ctaStart")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;


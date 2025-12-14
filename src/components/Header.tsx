import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/MobileMenu";
import { scrollToSection, scrollToTop } from "@/utils/scroll";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStartProject = () => {
    scrollToSection("#contact");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-secondary text-secondary-foreground">
        <div className="section-container flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" onClick={() => scrollToTop()} className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold tracking-tight">
              studio<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["Work", "Capabilities", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="link-animated font-body text-sm font-medium text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Button
            variant="neon"
            size="sm"
            className="hidden md:inline-flex"
            onClick={handleStartProject}
          >
            Start a project
          </Button>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
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

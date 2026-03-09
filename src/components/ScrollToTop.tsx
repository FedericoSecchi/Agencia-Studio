import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToSection } from "@/utils/scroll";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash === "#services") {
      setTimeout(() => {
        scrollToSection("#services");
      }, 100);
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}


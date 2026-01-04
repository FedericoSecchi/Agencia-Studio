/**
 * Smooth scroll to a section by ID
 */
export const scrollToSection = (sectionId: string) => {
  const scrollToElement = () => {
    const element = document.querySelector(sectionId);
    if (element) {
      const yOffset = -80; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      // Update URL hash
      window.history.pushState(null, '', sectionId);
      return true;
    }
    return false;
  };

  // Try immediately
  if (scrollToElement()) {
    return;
  }

  // If not found, wait a bit for React to render
  setTimeout(() => {
    if (!scrollToElement()) {
      console.warn(`Element with id "${sectionId}" not found`);
    }
  }, 100);
};

/**
 * Scroll to top of page
 */
export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Navigate to a section, handling route changes if needed
 * This function should be used with React Router hooks (useNavigate, useLocation)
 * For non-React contexts, use scrollToSection directly
 */
export const createNavigateToSection = (
  navigate: (path: string) => void,
  currentPath: string
) => {
  return (sectionId: string) => {
    // If we're already on home page, just scroll
    if (currentPath === '/') {
      scrollToSection(sectionId);
      return;
    }

    // If we're on a different route, navigate to home first
    navigate('/');
    
    // Wait for navigation and DOM update, then scroll
    // Use a longer timeout to ensure the page has rendered
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };
};


import portfolioHotel from "@/assets/portfolio-hotel.jpg";
import portfolioBakery from "@/assets/portfolio-bakery.jpg";
import portfolioOutdoor from "@/assets/portfolio-outdoor.jpg";
import portfolioWellness from "@/assets/portfolio-wellness.jpg";

export interface Project {
  id: string;
  image: string;
  size: "large" | "medium";
}

export const projectsData: Project[] = [
  {
    id: "hotel-alpino",
    image: portfolioHotel,
    size: "large",
  },
  {
    id: "bakery-studio",
    image: portfolioBakery,
    size: "medium",
  },
  {
    id: "outdoor-gear",
    image: portfolioOutdoor,
    size: "medium",
  },
  {
    id: "wellness-space",
    image: portfolioWellness,
    size: "large",
  },
];

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projectsData.find((project) => project.id === id);
};


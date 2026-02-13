import workImage2 from "@/assets/work/work-2.jpg";
import workImage3 from "@/assets/work/work-3.jpg";
import workImage5 from "@/assets/work/work-5.jpg";
import securityAllianceImage from "@/assets/projects/security-alliance/hero.jpg";

export interface Project {
  id: string;
  image: string;
  size: "large" | "medium";
}

export const projectsData: Project[] = [
  {
    id: "security-alliance",
    image: securityAllianceImage,
    size: "large",
  },
  {
    id: "bakery-studio",
    image: workImage2,
    size: "medium",
  },
  {
    id: "outdoor-gear",
    image: workImage3,
    size: "medium",
  },
  {
    id: "wellness-space",
    image: workImage5,
    size: "large",
  },
];

// Helper function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
  return projectsData.find((project) => project.id === id);
};


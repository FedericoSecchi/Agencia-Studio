import { useParams, Navigate } from "react-router-dom";
import { projectTopics } from "@/seo/projectTopics";
import { seoKeywords } from "@/seo/seoKeywords";
import { getProjectById } from "@/data/projects";
import ProjectCase from "./ProjectCase";
import ProgrammaticProjectPage from "./ProgrammaticProjectPage";

/**
 * Validates topic param and renders the appropriate component.
 * - projectTopics (5): full ProjectCase with topic SEO
 * - seoKeywords (20): ProgrammaticProjectPage (keyword landing)
 * Invalid topics redirect to the main project page.
 */
const ProjectTopic = () => {
  const { projectId, topic } = useParams<{ projectId: string; topic?: string }>();

  if (!topic || !projectId) {
    return <Navigate to="/" replace />;
  }

  const project = getProjectById(projectId);
  if (!project) {
    return <Navigate to="/" replace />;
  }

  if (projectTopics.includes(topic)) {
    return <ProjectCase />;
  }

  if (seoKeywords.includes(topic)) {
    return <ProgrammaticProjectPage />;
  }

  return <Navigate to={`/project/${projectId}`} replace />;
};

export default ProjectTopic;

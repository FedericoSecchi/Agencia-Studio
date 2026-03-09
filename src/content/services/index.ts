/**
 * Service content loader. Parses markdown files with YAML frontmatter.
 */

import brandingRaw from "./branding.md?raw";
import websitesRaw from "./websites.md?raw";
import contentMotionRaw from "./content-motion.md?raw";
import systemsAutomationRaw from "./systems-automation.md?raw";

export interface ServiceContent {
  title: string;
  description: string;
  keywords: string;
  body: string;
}

function parseMarkdown(raw: string): ServiceContent {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { title: "", description: "", keywords: "", body: raw };

  const frontmatter = match[1];
  const body = match[2].trim();

  const getField = (key: string): string => {
    const m = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
    return m ? m[1].trim().replace(/^["']|["']$/g, "") : "";
  };

  return {
    title: getField("title"),
    description: getField("description"),
    keywords: getField("keywords"),
    body,
  };
}

export const serviceContent: Record<string, ServiceContent> = {
  branding: parseMarkdown(brandingRaw),
  websites: parseMarkdown(websitesRaw),
  "content-motion": parseMarkdown(contentMotionRaw),
  "systems-automation": parseMarkdown(systemsAutomationRaw),
};

import type { RepoDetails } from "../types";

export function renderTemplate(
  content: string,
  details: Omit<RepoDetails, "fileName">
): string {
  const values: Record<string, string> = {
    logo: details.logo,
    repoName: details.repoName,
    email: details.email,
    authorName: details.authorName,
    linkedin: details.linkedin,
    repoUrl: details.repoUrl,
  };

  return content.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => {
    return values[key] ?? "";
  });
}

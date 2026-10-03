import { DEFAULT_REPO_DETAILS } from "../constants";
import type { RepoDetails, UserInput } from "../types";

export function toMarkdownFileName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return "";
  }

  return trimmed.toLowerCase().endsWith(".md") ? trimmed : `${trimmed}.md`;
}

export function normalizeUserInput(
  userInput: UserInput,
  defaultFileName: string
): RepoDetails {
  return {
    authorName: userInput.authorName || DEFAULT_REPO_DETAILS.authorName,
    repoName: userInput.repoName || DEFAULT_REPO_DETAILS.repoName,
    repoUrl: userInput.repoUrl || DEFAULT_REPO_DETAILS.repoUrl,
    logo: userInput.logo || DEFAULT_REPO_DETAILS.logo,
    email: userInput.email || DEFAULT_REPO_DETAILS.email,
    linkedin: userInput.linkedin || DEFAULT_REPO_DETAILS.linkedin,
    fileName:
      userInput.fileName.trim().length > 0
        ? toMarkdownFileName(userInput.fileName)
        : toMarkdownFileName(defaultFileName),
  };
}

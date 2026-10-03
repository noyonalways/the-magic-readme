export type TemplateCategory =
  | "minimal"
  | "modern"
  | "production"
  | "classic"
  | "useful"
  | "custom";

export type TemplateSource = "builtin" | "custom";

export interface UserInput {
  authorName: string;
  repoName: string;
  repoUrl: string;
  logo: string;
  email: string;
  linkedin: string;
  fileName: string;
}

export interface RepoDetails {
  logo: string;
  repoName: string;
  email: string;
  authorName: string;
  linkedin: string;
  repoUrl: string;
  fileName: string;
}

export interface TemplateMeta {
  slug: string;
  name: string;
  description: string;
  category: TemplateCategory;
  file: string;
}

export interface Template extends TemplateMeta {
  content: string;
  source: TemplateSource;
}

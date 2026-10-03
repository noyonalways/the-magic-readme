import { getTemplate, renderTemplate } from "../templates";
import type { RepoDetails } from "../types";

const DEFAULT_TEMPLATE_SLUG = "classic";

export function generateREADME(
  repoDetails: RepoDetails,
  templateSlug: string = DEFAULT_TEMPLATE_SLUG
): string {
  const template = getTemplate(templateSlug);

  if (!template) {
    throw new Error(
      `Template "${templateSlug}" was not found. Run the CLI and choose a valid template.`
    );
  }

  return renderTemplate(template.content, repoDetails);
}

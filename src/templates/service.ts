import type { Template } from "../types";
import { getBuiltinTemplate, listBuiltinTemplates } from "./builtin";
import {
  getCustomTemplate,
  listCustomTemplates,
  saveCustomTemplate,
} from "./custom";

export function listTemplates(): Template[] {
  return [...listBuiltinTemplates(), ...listCustomTemplates()];
}

export function getTemplate(slug: string): Template | undefined {
  return getBuiltinTemplate(slug) ?? getCustomTemplate(slug);
}

export function createCustomTemplate(input: {
  slug: string;
  name: string;
  description: string;
  content: string;
}): Template {
  if (getBuiltinTemplate(input.slug)) {
    throw new Error(
      `Slug "${input.slug}" is reserved by a built-in template. Choose another name.`
    );
  }

  return saveCustomTemplate(input);
}

export { getCustomTemplatesDir } from "./paths";

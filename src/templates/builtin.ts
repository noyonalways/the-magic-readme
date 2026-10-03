import fs from "fs";
import path from "path";
import type { Template, TemplateMeta } from "../types";
import { getBuiltinTemplatesDir } from "./paths";

export function listBuiltinTemplates(): Template[] {
  const templatesDir = getBuiltinTemplatesDir();
  const manifestPath = path.join(templatesDir, "manifest.json");

  if (!fs.existsSync(manifestPath)) {
    return [];
  }

  const manifest = JSON.parse(
    fs.readFileSync(manifestPath, "utf8")
  ) as TemplateMeta[];

  return manifest.map((meta) => {
    const contentPath = path.join(templatesDir, meta.file);
    const content = fs.existsSync(contentPath)
      ? fs.readFileSync(contentPath, "utf8")
      : "";

    return {
      ...meta,
      content,
      source: "builtin" as const,
    };
  });
}

export function getBuiltinTemplate(slug: string): Template | undefined {
  return listBuiltinTemplates().find((template) => template.slug === slug);
}

import fs from "fs";
import path from "path";
import type { Template } from "../types";
import { getCustomTemplatesDir } from "./paths";

interface CustomTemplateFile {
  slug: string;
  name: string;
  description: string;
  content: string;
}

function ensureCustomTemplatesDir(): string {
  const dir = getCustomTemplatesDir();
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function isCustomTemplateFile(value: unknown): value is CustomTemplateFile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;
  return (
    typeof record.slug === "string" &&
    typeof record.name === "string" &&
    typeof record.description === "string" &&
    typeof record.content === "string"
  );
}

export function listCustomTemplates(): Template[] {
  const dir = getCustomTemplatesDir();

  if (!fs.existsSync(dir)) {
    return [];
  }

  const templates: Template[] = [];

  for (const fileName of fs.readdirSync(dir)) {
    if (!fileName.endsWith(".json")) {
      continue;
    }

    const raw = fs.readFileSync(path.join(dir, fileName), "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (!isCustomTemplateFile(parsed)) {
      continue;
    }

    templates.push({
      slug: parsed.slug,
      name: parsed.name,
      description: parsed.description,
      category: "custom",
      file: fileName,
      content: parsed.content,
      source: "custom",
    });
  }

  return templates;
}

export function getCustomTemplate(slug: string): Template | undefined {
  return listCustomTemplates().find((template) => template.slug === slug);
}

export function saveCustomTemplate(input: {
  slug: string;
  name: string;
  description: string;
  content: string;
}): Template {
  const dir = ensureCustomTemplatesDir();
  const slug = input.slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  if (!slug) {
    throw new Error("Template slug is required.");
  }

  const template: CustomTemplateFile = {
    slug,
    name: input.name.trim() || slug,
    description: input.description.trim(),
    content: input.content,
  };

  const filePath = path.join(dir, `${slug}.json`);
  fs.writeFileSync(filePath, `${JSON.stringify(template, null, 2)}\n`, "utf8");

  return {
    ...template,
    category: "custom",
    file: `${slug}.json`,
    source: "custom",
  };
}

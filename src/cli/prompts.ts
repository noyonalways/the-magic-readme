import fs from "fs";
import inquirer from "inquirer";
import { DEFAULT_REPO_DETAILS } from "../constants";
import { createCustomTemplate, listTemplates } from "../templates";
import type { Template, TemplateCategory, UserInput } from "../types";
import {
  previewMarkdown,
  printBlank,
  printBox,
  printDivider,
  printInfo,
  printStep,
  theme,
} from "./ui";

const CATEGORY_ORDER: TemplateCategory[] = [
  "classic",
  "minimal",
  "modern",
  "production",
  "useful",
  "custom",
];

const CATEGORY_LABEL: Record<TemplateCategory, string> = {
  classic: "Classic",
  minimal: "Minimal",
  modern: "Modern",
  production: "Production",
  useful: "Useful / Specialty",
  custom: "Your custom templates",
};

type TemplateChoice =
  | InstanceType<typeof inquirer.Separator>
  | { name: string; value: string; short: string };

export async function promptForAction(): Promise<"generate" | "create-template"> {
  printStep(1, 4, "Choose an action");
  printDivider();

  const { action } = await inquirer.prompt<{
    action: "generate" | "create-template";
  }>([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: [
        {
          name: `${theme.accent("✦")}  Generate a README     ${theme.muted("pick a template → fill details → ship")}`,
          value: "generate",
        },
        {
          name: `${theme.info("✎")}  Create custom template ${theme.muted("save your own markdown recipe")}`,
          value: "create-template",
        },
      ],
    },
  ]);

  printBlank();
  return action;
}

function buildTemplateChoices(templates: Template[]) {
  const choices: TemplateChoice[] = [];

  for (const category of CATEGORY_ORDER) {
    const items = templates.filter((template) => template.category === category);
    if (items.length === 0) {
      continue;
    }

    choices.push(
      new inquirer.Separator(theme.muted(`── ${CATEGORY_LABEL[category]} ──`))
    );

    for (const template of items) {
      const sourceTag =
        template.source === "custom"
          ? theme.warn("custom")
          : theme.muted(template.category);

      choices.push({
        name: `${theme.bold(template.name.padEnd(14))} ${sourceTag}  ${theme.dim(template.description)}`,
        value: template.slug,
        short: template.name,
      });
    }
  }

  return choices;
}

export async function promptForTemplate(): Promise<Template> {
  const templates = listTemplates();

  if (templates.length === 0) {
    throw new Error("No templates found.");
  }

  printStep(2, 4, "Pick a template");
  printDivider();
  printInfo(`${templates.length} templates available`);

  const { slug } = await inquirer.prompt<{ slug: string }>([
    {
      type: "list",
      name: "slug",
      message: theme.label("Select a README template"),
      pageSize: 16,
      choices: buildTemplateChoices(templates),
    },
  ]);

  const selected = templates.find((template) => template.slug === slug);
  if (!selected) {
    throw new Error(`Template "${slug}" was not found.`);
  }

  printBlank();
  printBox(selected.name, [
    `slug: ${selected.slug}`,
    `category: ${selected.category}`,
    `source: ${selected.source}`,
    selected.description,
  ]);
  printBlank();

  return selected;
}

export async function promptForRepoDetails(
  defaultFileName: string
): Promise<UserInput> {
  printStep(3, 4, "Project details");
  printDivider();
  printInfo("Press Enter to accept defaults shown in (parentheses)");

  return inquirer.prompt<UserInput>([
    {
      type: "input",
      name: "authorName",
      message: theme.label("Author name"),
      default: DEFAULT_REPO_DETAILS.authorName,
    },
    {
      type: "input",
      name: "repoName",
      message: theme.label("Repository / project name"),
      default: DEFAULT_REPO_DETAILS.repoName,
    },
    {
      type: "input",
      name: "repoUrl",
      message: theme.label("Repository URL"),
      default: DEFAULT_REPO_DETAILS.repoUrl,
    },
    {
      type: "input",
      name: "logo",
      message: theme.label("Logo URL"),
      default: DEFAULT_REPO_DETAILS.logo,
    },
    {
      type: "input",
      name: "email",
      message: theme.label("Email"),
      default: DEFAULT_REPO_DETAILS.email,
    },
    {
      type: "input",
      name: "linkedin",
      message: theme.label("LinkedIn username"),
      default: DEFAULT_REPO_DETAILS.linkedin,
    },
    {
      type: "input",
      name: "fileName",
      message: theme.label("Output file name"),
      default: defaultFileName,
    },
  ]);
}

export async function promptForPreviewConfirm(
  fileName: string,
  content: string
): Promise<boolean> {
  printBlank();
  printStep(4, 4, "Preview & confirm");
  printDivider();

  printBox(`Preview → ${fileName}`, previewMarkdown(content));
  printBlank();

  if (fs.existsSync(fileName)) {
    console.log(
      `${theme.warn("⚠")} ${theme.bold(fileName)} already exists and will be overwritten.`
    );
    printBlank();
  }

  const { confirmed } = await inquirer.prompt<{ confirmed: boolean }>([
    {
      type: "confirm",
      name: "confirmed",
      message: theme.label(`Write ${fileName}?`),
      default: true,
    },
  ]);

  return confirmed;
}

export async function promptForCustomTemplate(): Promise<Template> {
  printStep(2, 3, "Create a custom template");
  printDivider();
  printInfo(
    "Use placeholders: {{repoName}} {{authorName}} {{repoUrl}} {{logo}} {{email}} {{linkedin}}"
  );

  const answers = await inquirer.prompt<{
    slug: string;
    name: string;
    description: string;
    source: "editor" | "file";
    filePath?: string;
    content?: string;
  }>([
    {
      type: "input",
      name: "slug",
      message: theme.label("Template slug"),
      default: "my-template",
      validate: (value: string) =>
        value.trim().length > 0 || "Slug is required",
    },
    {
      type: "input",
      name: "name",
      message: theme.label("Display name"),
      default: "My Template",
      validate: (value: string) =>
        value.trim().length > 0 || "Name is required",
    },
    {
      type: "input",
      name: "description",
      message: theme.label("Short description"),
      default: "My custom README template",
    },
    {
      type: "list",
      name: "source",
      message: theme.label("Content source"),
      choices: [
        {
          name: `${theme.accent("✎")}  Open editor and paste markdown`,
          value: "editor",
        },
        {
          name: `${theme.info("⇪")}  Load from a local .md file`,
          value: "file",
        },
      ],
    },
    {
      type: "input",
      name: "filePath",
      message: theme.label("Path to markdown file"),
      when: (current) => current.source === "file",
      validate: (value: string) =>
        (value.trim().length > 0 && fs.existsSync(value.trim())) ||
        "File does not exist",
    },
    {
      type: "editor",
      name: "content",
      message: theme.label("Write your template markdown"),
      when: (current) => current.source === "editor",
      validate: (value: string) =>
        value.trim().length > 0 || "Template content is required",
    },
  ]);

  const content =
    answers.source === "file"
      ? fs.readFileSync(answers.filePath!.trim(), "utf8")
      : answers.content!.trim();

  printBlank();
  printStep(3, 3, "Save template");

  return createCustomTemplate({
    slug: answers.slug,
    name: answers.name,
    description: answers.description,
    content,
  });
}

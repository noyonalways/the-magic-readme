import { generateREADME } from "../generators";
import { getCustomTemplatesDir } from "../templates";
import { normalizeUserInput, writeReadmeFile } from "../utils";
import { createProgram, hasHandledCliCommand } from "./program";
import {
  promptForAction,
  promptForCustomTemplate,
  promptForPreviewConfirm,
  promptForRepoDetails,
  promptForTemplate,
} from "./prompts";
import { showSplash } from "./splash";
import {
  printBlank,
  printBox,
  printInfo,
  printSuccess,
  theme,
} from "./ui";

export async function runCli(): Promise<void> {
  const program = createProgram();

  if (hasHandledCliCommand()) {
    program.parse(process.argv);
    return;
  }

  if (process.argv.includes("-V") || process.argv.includes("--version")) {
    program.parse(process.argv);
    return;
  }

  if (process.argv.includes("-h") || process.argv.includes("--help")) {
    program.help();
    return;
  }

  await showSplash();
  const action = await promptForAction();

  if (action === "create-template") {
    const template = await promptForCustomTemplate();
    printBlank();
    printSuccess(`Custom template "${template.slug}" saved`);
    printInfo(`Location: ${getCustomTemplatesDir()}`);
    printBlank();
    printBox("Next tip", [
      "Run the CLI again and choose Generate a README",
      `Your "${template.name}" template will appear under Custom`,
    ]);
    printBlank();
    return;
  }

  const template = await promptForTemplate();
  const defaultFileName = template.slug;
  const userInput = await promptForRepoDetails(defaultFileName);
  const repoDetails = normalizeUserInput(userInput, defaultFileName);
  const readmeContent = generateREADME(repoDetails, template.slug);

  const confirmed = await promptForPreviewConfirm(
    repoDetails.fileName,
    readmeContent
  );

  if (!confirmed) {
    printBlank();
    console.log(`${theme.warn("✖")} Generation cancelled — nothing was written.`);
    printBlank();
    return;
  }

  try {
    await writeReadmeFile(repoDetails.fileName, readmeContent);
    printBlank();
    printSuccess(
      `${theme.bold(repoDetails.fileName)} created from ${theme.accent(template.name)}`
    );
    printBox("Done", [
      `template: ${template.slug}`,
      `file: ${repoDetails.fileName}`,
      `author: ${repoDetails.authorName}`,
      "Open the file and tweak the generated sections.",
    ]);
    printBlank();
  } catch (error) {
    printBlank();
    console.error(`${theme.danger("✖")} Error writing file:`, error);
    printBlank();
  }
}

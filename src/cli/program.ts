import { Command } from "commander";
import { PACKAGE_DESCRIPTION, PACKAGE_VERSION } from "../constants";
import { listTemplates } from "../templates";
import { printBlank, theme } from "./ui";

export function createProgram(): Command {
  const program = new Command();

  program
    .name("the-magic-readme")
    .version(PACKAGE_VERSION)
    .description(PACKAGE_DESCRIPTION);

  program
    .command("templates")
    .description("List built-in and custom README templates")
    .action(() => {
      const templates = listTemplates();

      if (templates.length === 0) {
        console.log(theme.muted("No templates found."));
        return;
      }

      printBlank();
      console.log(theme.accent("Available templates"));
      printBlank();

      for (const template of templates) {
        console.log(
          `  ${theme.bold(template.slug.padEnd(14))} ${theme.muted(template.category.padEnd(10))} ${theme.dim(template.description)}`
        );
      }

      printBlank();
      console.log(
        theme.muted(`  ${templates.length} total · run without args for interactive mode`)
      );
      printBlank();
    });

  return program;
}

export function hasHandledCliCommand(argv: string[] = process.argv): boolean {
  const args = argv.slice(2).filter((arg) => !arg.startsWith("-"));
  return args[0] === "templates";
}

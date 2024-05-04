#!/usr/bin/env node

const fs = require("fs");
const { Command } = require("commander");
const inquirer = require("inquirer");
const program = new Command();
const { generateREADME } = require("./utils");

program
  .version("1.0.1")
  .description("A CLI tool to generate README files magically")
  .parse(process.argv);

async function main() {
  // Prompt user for repository details
  const userInput = await inquirer.prompt([
    { type: "input", name: "authorName", message: "Enter Author Name:" },
    { type: "input", name: "repoName", message: "Enter repository Name:" },
    { type: "input", name: "repoUrl", message: "Enter repository URL:" },
    { type: "input", name: "logo", message: "Enter project logo URL:" },
    { type: "input", name: "email", message: "Enter your email Address:" },
    {
      type: "input",
      name: "linkedin",
      message: "Enter your LinkedIn username:",
    },
  ]);

  const modifiedInput = {
    authorName: userInput.authorName || "Noyon Rahman",
    repoName: userInput.repoName || "Project Name",
    repoUrl: userInput.repoUrl || "https://github.com/",
    logo: userInput.logo || "https://i.ibb.co/c64q254/noyon-logo-dark.png",
    email: userInput.email || "noyonrahman2003@gmail.com",
    linkedin: userInput.linkedin || "noyonalways",
  };

  // Generate README content
  const readmeContent = generateREADME({ ...modifiedInput });

  // Write README content to file asynchronously
  fs.writeFile("README.md", readmeContent, (err) => {
    if (err) {
      console.error("Error writing file:", err);
    } else {
      console.log("README.md has been created successfully! ✅");
    }
  });
}

main();

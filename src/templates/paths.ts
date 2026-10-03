import fs from "fs";
import os from "os";
import path from "path";

export function getBuiltinTemplatesDir(): string {
  const candidates = [
    path.join(__dirname, "../../templates"),
    path.join(process.cwd(), "templates"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, "manifest.json"))) {
      return candidate;
    }
  }

  return candidates[0];
}

export function getCustomTemplatesDir(): string {
  return (
    process.env.MAGIC_README_TEMPLATES_DIR ||
    path.join(os.homedir(), ".the-magic-readme", "templates")
  );
}

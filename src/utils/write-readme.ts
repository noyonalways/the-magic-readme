import fs from "fs/promises";

export async function writeReadmeFile(
  fileName: string,
  content: string
): Promise<void> {
  await fs.writeFile(fileName, content, "utf8");
}

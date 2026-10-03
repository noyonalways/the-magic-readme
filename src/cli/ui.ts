const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";

export function supportsColor(): boolean {
  return Boolean(process.stdout.isTTY) && !process.env.NO_COLOR;
}

export function fg256(code: number): string {
  return `\x1b[38;5;${code}m`;
}

export function style(text: string, ...codes: string[]): string {
  if (!supportsColor() || codes.length === 0) {
    return text;
  }

  return `${codes.join("")}${text}${RESET}`;
}

export const theme = {
  accent: (text: string) => style(text, BOLD, fg256(51)),
  info: (text: string) => style(text, fg256(39)),
  success: (text: string) => style(text, BOLD, fg256(82)),
  warn: (text: string) => style(text, fg256(214)),
  danger: (text: string) => style(text, BOLD, fg256(203)),
  muted: (text: string) => style(text, DIM, fg256(245)),
  dim: (text: string) => style(text, DIM),
  bold: (text: string) => style(text, BOLD),
  label: (text: string) => style(text, BOLD, fg256(87)),
};

export function printBlank(): void {
  console.log();
}

export function printStep(step: number, total: number, title: string): void {
  console.log(
    `${theme.muted(`[${step}/${total}]`)} ${theme.label(title)}`
  );
}

export function printDivider(): void {
  console.log(theme.muted("  ────────────────────────────────────────────"));
}

export function printBox(title: string, lines: string[]): void {
  const width = Math.max(
    title.length,
    ...lines.map((line) => line.length),
    28
  );
  const top = `╭${"─".repeat(width + 2)}╮`;
  const bottom = `╰${"─".repeat(width + 2)}╯`;

  console.log(theme.accent(`  ${top}`));
  console.log(
    `${theme.accent("  │")} ${theme.bold(title.padEnd(width))} ${theme.accent("│")}`
  );
  console.log(theme.accent(`  ├${"─".repeat(width + 2)}┤`));

  for (const line of lines) {
    console.log(
      `${theme.accent("  │")} ${theme.dim(line.padEnd(width))} ${theme.accent("│")}`
    );
  }

  console.log(theme.accent(`  ${bottom}`));
}

export function printSuccess(message: string): void {
  console.log(`${theme.success("✔")} ${message}`);
}

export function printInfo(message: string): void {
  console.log(`${theme.info("›")} ${message}`);
}

export function previewMarkdown(content: string, maxLines = 14): string[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const slice = lines.slice(0, maxLines);
  if (lines.length > maxLines) {
    slice.push(`… ${lines.length - maxLines} more lines`);
  }
  return slice;
}

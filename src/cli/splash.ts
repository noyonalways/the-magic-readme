import { PACKAGE_DESCRIPTION, PACKAGE_VERSION } from "../constants";

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const DIM = "\x1b[2m";

/** Soft cyan → blue gradient stops (xterm 256). */
const GRADIENT = [51, 45, 39, 33, 27, 26, 25, 24];

/**
 * Large block wordmark in the style of modern agent CLIs
 * (OpenCode / Claude Code / Cloud Agent).
 */
const LOGO_LINES = [
  " ███╗   ███╗ █████╗  ██████╗ ██╗ ██████╗",
  " ████╗ ████║██╔══██╗██╔════╝ ██║██╔════╝",
  " ██╔████╔██║███████║██║  ███╗██║██║     ",
  " ██║╚██╔╝██║██╔══██║██║   ██║██║██║     ",
  " ██║ ╚═╝ ██║██║  ██║╚██████╔╝██║╚██████╗",
  " ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝ ╚═════╝",
  "",
  " ██████╗ ███████╗ █████╗ ██████╗ ███╗   ███╗███████╗",
  " ██╔══██╗██╔════╝██╔══██╗██╔══██╗████╗ ████║██╔════╝",
  " ██████╔╝█████╗  ███████║██║  ██║██╔████╔██║█████╗  ",
  " ██╔══██╗██╔══╝  ██╔══██║██║  ██║██║╚██╔╝██║██╔══╝  ",
  " ██║  ██║███████╗██║  ██║██████╔╝██║ ╚═╝ ██║███████╗",
  " ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚══════╝",
];

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function supportsColor(): boolean {
  return Boolean(process.stdout.isTTY) && !process.env.NO_COLOR;
}

function supportsAnimation(): boolean {
  return supportsColor() && !process.env.CI;
}

function fg256(code: number): string {
  return `\x1b[38;5;${code}m`;
}

function paintGradientLine(line: string, lineIndex: number): string {
  if (!supportsColor() || line.trim().length === 0) {
    return line;
  }

  const color =
    GRADIENT[Math.min(lineIndex, GRADIENT.length - 1)] ?? GRADIENT[0];

  return `${BOLD}${fg256(color)}${line}${RESET}`;
}

function paintDim(text: string): string {
  if (!supportsColor()) {
    return text;
  }

  return `${DIM}${text}${RESET}`;
}

function paintMuted(text: string): string {
  if (!supportsColor()) {
    return text;
  }

  return `${DIM}${fg256(245)}${text}${RESET}`;
}

function paintAccent(text: string): string {
  if (!supportsColor()) {
    return text;
  }

  return `${BOLD}${fg256(51)}${text}${RESET}`;
}

function printMeta(): void {
  console.log();
  console.log(`  ${paintAccent("THE-MAGIC-README")}  ${paintMuted(`v${PACKAGE_VERSION}`)}`);
  console.log(`  ${paintDim(PACKAGE_DESCRIPTION)}`);
  console.log(`  ${paintMuted("generate · customize · ship docs faster")}`);
  console.log();
}

function printBannerStatic(): void {
  console.log();
  for (let i = 0; i < LOGO_LINES.length; i += 1) {
    console.log(paintGradientLine(LOGO_LINES[i] ?? "", i));
  }
  printMeta();
}

async function playModernIntro(): Promise<void> {
  console.log();

  for (let i = 0; i < LOGO_LINES.length; i += 1) {
    const line = LOGO_LINES[i] ?? "";
    console.log(paintGradientLine(line, i));
    await sleep(line.trim().length === 0 ? 60 : 38);
  }

  await sleep(120);
  printMeta();
  await sleep(160);
}

export async function showSplash(): Promise<void> {
  if (!supportsAnimation()) {
    printBannerStatic();
    return;
  }

  await playModernIntro();
}

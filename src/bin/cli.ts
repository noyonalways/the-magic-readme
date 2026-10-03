#!/usr/bin/env node

import { runCli } from "../cli";

runCli().catch((error: unknown) => {
  console.error("Unexpected error:", error);
  process.exitCode = 1;
});

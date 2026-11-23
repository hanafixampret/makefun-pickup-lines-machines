import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I told my scheduler to kill my feelings for you — it returned permission denied.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entry = LINE.trim();

if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${entry.length}`);
}
if (!entry.trim()) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");

// Round-trip check: what the judge reads must be exactly the line above.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== entry) {
  throw new Error("entry.txt round-trip mismatch");
}

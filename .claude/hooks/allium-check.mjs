import { execFileSync } from "child_process";
import { extname } from "path";

let data = "";
for await (const chunk of process.stdin) {
  data += chunk;
}

const input = JSON.parse(data);
const filePath = input.tool_input?.file_path;

if (!filePath || extname(filePath) !== ".allium") {
  process.exit(0);
}

try {
  execFileSync("allium", ["check", filePath], { stdio: "inherit" });
} catch (e) {
  // If the binary isn't found, degrade gracefully
  if (e.code === "ENOENT") {
    process.exit(0);
  }
  // Validation failed — non-zero exit feeds diagnostics back to the model
  process.exit(1);
}

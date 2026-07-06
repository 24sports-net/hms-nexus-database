const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "news");
const INPUT_FILE = path.join(ROOT, "news.json");

const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

if (!fs.existsSync(INPUT_FILE)) {
  console.error("❌ news.json not found.");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));

fs.writeFileSync(
  path.join(outputDir, "news.json"),
  JSON.stringify(data, null, 2)
);

console.log("✅ news.json generated successfully.");

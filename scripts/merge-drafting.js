const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "drafting", "drafting.json");

let merged = { drafts: [] };

if (fs.existsSync(file)) {
  merged = JSON.parse(fs.readFileSync(file, "utf8"));
}

const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, "drafting.json"),
  JSON.stringify(merged, null, 2)
);

console.log("✅ drafting.json generated successfully.");

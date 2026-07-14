const fs = require("fs");
const path = require("path");

const inputFile = path.join(__dirname, "..", "texts", "textbook.json");
const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

fs.writeFileSync(
  path.join(outputDir, "textbooks.json"),
  JSON.stringify(data, null, 2),
  "utf8"
);

console.log("✅ textbooks.json generated successfully.");

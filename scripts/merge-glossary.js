const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "glossary");
const SUBJECTS = ["JIGL", "CL", "SBIL", "CAFM"];

const merged = {};

SUBJECTS.forEach(subject => {
  const file = path.join(ROOT, subject.toLowerCase() + ".json");

  if (fs.existsSync(file)) {
    merged[subject] = JSON.parse(fs.readFileSync(file, "utf8"));
  } else {
    merged[subject] = [];
  }
});

const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, "glossary.json"),
  JSON.stringify(merged, null, 2)
);

console.log("✅ glossary.json generated successfully.");

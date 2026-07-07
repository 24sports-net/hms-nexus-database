const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "summary");
const SUBJECTS = ["JIGL", "CL", "SBIL", "CAFM"];

const merged = {};

SUBJECTS.forEach(subject => {
  const subjectDir = path.join(ROOT, subject);

  if (!fs.existsSync(subjectDir)) {
    merged[subject] = [];
    return;
  }

  const files = fs
    .readdirSync(subjectDir)
    .filter(file => file.endsWith(".json"))
    .sort();

  merged[subject] = files.map(file =>
    JSON.parse(fs.readFileSync(path.join(subjectDir, file), "utf8"))
  );
});

const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, "summary.json"),
  JSON.stringify(merged, null, 2)
);

console.log("✅ summary.json generated successfully.");

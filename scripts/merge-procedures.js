const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "procedures");
const SUBJECTS = ["JIGL", "CL", "SBIL", "CAFM"];

const merged = {};

SUBJECTS.forEach(subject => {
  const folder = path.join(ROOT, subject);

  if (!fs.existsSync(folder)) {
    merged[subject] = [];
    return;
  }

  const files = fs
    .readdirSync(folder)
    .filter(file => file.endsWith(".json"))
    .sort();

  merged[subject] = files.map(file => {
    const data = fs.readFileSync(path.join(folder, file), "utf8");
    return JSON.parse(data);
  });
});

const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, "procedures.json"),
  JSON.stringify(merged, null, 2)
);

console.log("✅ procedures.json generated successfully.");

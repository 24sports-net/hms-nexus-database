const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "sections");
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
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    });

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
  path.join(outputDir, "sections.json"),
  JSON.stringify(merged, null, 2)
);

console.log("✅ sections.json generated successfully.");

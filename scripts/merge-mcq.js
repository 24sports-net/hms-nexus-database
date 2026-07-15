const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "mcq");
const SUBJECTS = ["JIGL", "CL", "SBIL", "CAFM"];

const merged = {};

SUBJECTS.forEach(subject => {
  const subjectPath = path.join(ROOT, subject);

  if (!fs.existsSync(subjectPath)) {
    merged[subject] = [];
    return;
  }

  const files = fs
    .readdirSync(subjectPath)
    .filter(file => file.endsWith(".json"))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    });

  merged[subject] = files.map(file => {
    const filePath = path.join(subjectPath, file);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  });
});

const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, "mcq.json"),
  JSON.stringify(merged, null, 2)
);

console.log("✅ mcq.json generated successfully.");

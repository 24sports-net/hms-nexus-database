const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "case-laws");
const SUBJECTS = ["JIGL", "CL", "SBIL", "CAFM"];

const merged = {};

SUBJECTS.forEach(subject => {
  const subjectDir = path.join(ROOT, subject);
  merged[subject] = {};

  if (fs.existsSync(subjectDir)) {
    const chapters = fs
      .readdirSync(subjectDir, { withFileTypes: true })
      .filter(dir => dir.isDirectory());

    chapters.forEach(chapter => {
      const caseFile = path.join(subjectDir, chapter.name, "case.json");

      if (fs.existsSync(caseFile)) {
        merged[subject][chapter.name] = JSON.parse(
          fs.readFileSync(caseFile, "utf8")
        );
      }
    });
  }
});

const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, "case-laws.json"),
  JSON.stringify(merged, null, 2)
);

console.log("✅ case-laws.json generated successfully.");

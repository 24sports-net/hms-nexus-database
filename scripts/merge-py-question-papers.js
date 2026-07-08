const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SOURCE = path.join(ROOT, "py-question");
const OUTPUT = path.join(ROOT, "output");

if (!fs.existsSync(OUTPUT)) {
  fs.mkdirSync(OUTPUT, { recursive: true });
}

const merged = [];

const subjects = fs.readdirSync(SOURCE, { withFileTypes: true });

for (const subject of subjects) {
  if (!subject.isDirectory()) continue;

  const papersPath = path.join(SOURCE, subject.name, "papers.json");

  if (!fs.existsSync(papersPath)) continue;

  const papers = JSON.parse(fs.readFileSync(papersPath, "utf8"));

  if (Array.isArray(papers)) {
    merged.push(...papers);
  }
}

fs.writeFileSync(
  path.join(OUTPUT, "py-question-papers.json"),
  JSON.stringify(merged, null, 2)
);

console.log(`Merged ${merged.length} question papers.`);

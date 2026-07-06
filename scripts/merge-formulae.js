const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "formulae");
const SUBJECTS = ["JIGL", "CL", "SBIL", "CAFM"];

const merged = {};

SUBJECTS.forEach(subject => {
  const folder = path.join(ROOT, subject);

  if (!fs.existsSync(folder)) {
    merged[subject] = {};
    return;
  }

  const file = fs.readdirSync(folder).find(f => f.endsWith(".json"));

  if (!file) {
    merged[subject] = {};
    return;
  }

  merged[subject] = JSON.parse(
    fs.readFileSync(path.join(folder, file), "utf8")
  );
});

const outputDir = path.join(__dirname, "..", "output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.writeFileSync(
  path.join(outputDir, "formulae.json"),
  JSON.stringify(merged, null, 2)
);

console.log("✅ formulae.json generated successfully.");

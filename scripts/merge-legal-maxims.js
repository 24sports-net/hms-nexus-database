const fs = require("fs");
const path = require("path");

const INPUT_DIR = path.join(__dirname, "..", "legal-maxims");
const OUTPUT_DIR = path.join(__dirname, "..", "output");

const subjects = ["JIGL", "CL", "SBIL", "CAFM"];
const merged = {};

subjects.forEach(subject => {
  const filePath = path.join(INPUT_DIR, `${subject.toLowerCase()}.json`);

  if (fs.existsSync(filePath)) {
    merged[subject] = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );
  } else {
    console.warn(`⚠ ${filePath} not found.`);
    merged[subject] = {
      subject,
      maxims: []
    };
  }
});

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(
  path.join(OUTPUT_DIR, "legal-maxims.json"),
  JSON.stringify(merged, null, 2),
  "utf8"
);

console.log("✅ legal-maxims.json generated successfully.");

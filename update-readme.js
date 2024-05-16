const fs = require("fs");

// creating a function that updates the readme automatically
function updateReadme() {
    // read the contributors content
  const contributorsContent = fs.readFileSync("CONTRIBUTORS.md", "utf8");
  // reading the readme content
  const readmeContent = fs.readFileSync("README.md", "utf8");

  // update the readme
  const updatedReadme = readmeContent.replace(
    /<!-- CONTRIBUTORS START -->([\s\S]*?)<!-- CONTRIBUTORS END -->/,
    `<!-- CONTRIBUTORS START -->\n\n${contributorsContent}\n<!-- CONTRIBUTORS END -->`
  );

  // re-writing the README
  fs.writeFileSync('README.md', updatedReadme);
}

// running the function
updateReadme();

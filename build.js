const fs = require("fs");
const path = require("path");

const links = JSON.parse(
  fs.readFileSync("links.json", "utf8")
);

const guidesDir = "./kodaikanal/guides";

const folders = fs.readdirSync(guidesDir);

folders.forEach(folder => {
  const htmlFile = path.join(
  guidesDir,
  folder,
  "index.html"
);

  if (!fs.existsSync(htmlFile)) return;

  let html = fs.readFileSync(htmlFile, "utf8");

  const relatedLinks = links
    .filter(link => link.slug !== folder)
    .map(
      link =>
        `<a href="${link.url}">➜ ${link.title}</a>`
    )
    .join("<br>\n");

  const section = `
<section id="related-links">
  <h2>Related Articles</h2>
  ${relatedLinks}
</section>`;

  html = html.replace(
    /<section id="related-links">[\s\S]*?<\/section>/,
    section
  );

  fs.writeFileSync(htmlFile, html);
});

console.log("Related links updated.");
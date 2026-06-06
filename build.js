// const fs = require("fs");
// const path = require("path");

// const links = JSON.parse(
//   fs.readFileSync("links.json", "utf8")
// );

// const guidesDir = "./kodaikanal/guides";

// const folders = fs.readdirSync(guidesDir);

// folders.forEach(folder => {
//   const htmlFile = path.join(
//   guidesDir,
//   folder,
//   "index.html"
// );

//   if (!fs.existsSync(htmlFile)) return;

//   let html = fs.readFileSync(htmlFile, "utf8");

//   const relatedLinks = links
//     .filter(link => link.slug !== folder)
//     .map(
//       link =>
//         `<a href="${link.url}">➜ ${link.title}</a>`
//     )
//     .join("<br>\n");

//   const section = `
// <section id="related-links">
//   <h2>Related Articles</h2>
//   ${relatedLinks}
// </section>`;

//   html = html.replace(
//     /<section id="related-links">[\s\S]*?<\/section>/,
//     section
//   );

//   fs.writeFileSync(htmlFile, html);
// });

// console.log("Related links updated.");


const fs = require("fs");
const path = require("path");

const guidesDir = "./kodaikanal/guides";
const homeFile = "./index.html";

const links = JSON.parse(
  fs.readFileSync("./links.json", "utf8")
);

/* -----------------------------
   UPDATE GUIDE PAGES
----------------------------- */

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

/* -----------------------------
   UPDATE HOMEPAGE
----------------------------- */

if (fs.existsSync(homeFile)) {
  let homeHtml = fs.readFileSync(homeFile, "utf8");

  const allLinks = links
    .map(
      link =>
        `<a href="${link.url}">➜ ${link.title}</a>`
    )
    .join("<br>\n");

  const homepageSection = `
<section id="all-guides" class="featured-guides">
  <h2>Kodaikanal Guides</h2>
  ${allLinks}
</section>`;

  homeHtml = homeHtml.replace(
    /<section id="all-guides">[\s\S]*?<\/section>/,
    homepageSection
  );

  fs.writeFileSync(homeFile, homeHtml);
}

console.log("✅ Homepage and guide links updated.");


const fs = require("fs");
const path = require("path");

const guidesDir = "./kodaikanal/guides";
const homeFile = "./index.html";

const articles = [];

/* ----------------------------------
   SCAN ALL CLUSTERS AND ARTICLES
---------------------------------- */

const clusters = fs.readdirSync(guidesDir);

clusters.forEach(cluster => {
  const clusterPath = path.join(guidesDir, cluster);

  if (!fs.statSync(clusterPath).isDirectory()) return;

  const articleFolders = fs.readdirSync(clusterPath);

  articleFolders.forEach(slug => {
    const htmlFile = path.join(
      clusterPath,
      slug,
      "index.html"
    );

    if (!fs.existsSync(htmlFile)) return;

    const html = fs.readFileSync(htmlFile, "utf8");

    const titleMatch = html.match(
      /<title>(.*?)<\/title>/i
    );

    const title = titleMatch
      ? titleMatch[1].trim()
      : slug;

    articles.push({
      cluster,
      slug,
      title,
      htmlFile,
      url: `/kodaikanal/guides/${cluster}/${slug}/`
    });
  });
});

/* ----------------------------------
   UPDATE ARTICLE PAGES
---------------------------------- */

articles.forEach(article => {
  let html = fs.readFileSync(
    article.htmlFile,
    "utf8"
  );

  const relatedLinks = articles
    .filter(
      a =>
        a.cluster === article.cluster &&
        a.slug !== article.slug
    )
    .map(
      a =>
        `<a href="${a.url}">➜ ${a.title}</a>`
    )
    .join("<br>\n");

  const section = `<section id="related-links" class="related-links">
<div class="container">
<h2>Related Articles</h2>
${relatedLinks}
</div>
</section>`;

  html = html.replace(
    /<section[^>]*id="related-links"[^>]*>[\s\S]*?<\/section>/,
    section
  );

  fs.writeFileSync(
    article.htmlFile,
    html
  );
});

/* ----------------------------------
   UPDATE HOMEPAGE
---------------------------------- */

if (fs.existsSync(homeFile)) {
  let homeHtml = fs.readFileSync(
    homeFile,
    "utf8"
  );

  const clusterTitles = {
    attractions: "Attractions",
    itineraries: "Itineraries",
    "seasonal-guides": "Seasonal Guides",
    "travel-tips": "Travel Tips"
  };

  let homepageContent = "";

  Object.keys(clusterTitles).forEach(cluster => {
    const clusterArticles = articles.filter(
      a => a.cluster === cluster
    );

    if (clusterArticles.length === 0) return;

    homepageContent += `
<h3>${clusterTitles[cluster]}</h3>
`;

    homepageContent += clusterArticles
      .map(
        a =>
          `<a href="${a.url}">➜ ${a.title}</a>`
      )
      .join("<br>\n");

    homepageContent += "<br><br>";
  });

  const homepageSection = `<section id="all-guides" class="featured-guides">
<h2>Kodaikanal Guides</h2>
${homepageContent}
</section>`;

  homeHtml = homeHtml.replace(
    /<section[^>]*id="all-guides"[^>]*>[\s\S]*?<\/section>/,
    homepageSection
  );

  fs.writeFileSync(
    homeFile,
    homeHtml
  );
}


console.log("✅ Homepage and cluster links updated.");

// const fs = require("fs");
// const path = require("path");

// const guidesDir = "./kodaikanal/guides";
// const homeFile = "./index.html";

// const links = JSON.parse(
//   fs.readFileSync("./links.json", "utf8")
// );

// /* -----------------------------
//    UPDATE GUIDE PAGES
// ----------------------------- */

// const folders = fs.readdirSync(guidesDir);

// folders.forEach(folder => {
//   const htmlFile = path.join(
//     guidesDir,
//     folder,
//     "index.html"
//   );

//   if (!fs.existsSync(htmlFile)) return;

//   let html = fs.readFileSync(htmlFile, "utf8");

//   const relatedLinks = links
//     .filter(link => link.slug !== folder)
//     .map(
//       link =>
//         `<a href="${link.url}">➜ ${link.title}</a>`
//     )
//     .join("<br>\n");

//   const section = `<section id="related-links">
//   <h2>Related Articles</h2>
//   ${relatedLinks}
// </section>`;

//   html = html.replace(
//     /<section id="related-links">[\s\S]*?<\/section>/,
//     section
//   );

//   fs.writeFileSync(htmlFile, html);
// });

// /* -----------------------------
//    UPDATE HOMEPAGE
// ----------------------------- */

// if (fs.existsSync(homeFile)) {
//   let homeHtml = fs.readFileSync(homeFile, "utf8");

//   const allLinks = links
//     .map(
//       link =>
//         `<a href="${link.url}">➜ ${link.title}</a>`
//     )
//     .join("<br>\n");

//   const homepageSection = `<section id="all-guides" class="featured-guides">
//   <h2>Kodaikanal Guides</h2>
//   ${allLinks}
// </section>`;

//   homeHtml = homeHtml.replace(
//     /<section id="all-guides">[\s\S]*?<\/section>/,
//     homepageSection
//   );

//   fs.writeFileSync(homeFile, homeHtml);
// }

// console.log("✅ Homepage and guide links updated.");


// const links = [
//   {
//     id: "kodaikanal-weather",
//     title: "Kodaikanal Weather Month by Month",
//     url: "/kodaikanal/guides/kodaikanal-weather/"
//   },
//   {
//     id: "hidden-places-kodaikanal",
//     title: "Hidden Places in Kodaikanal",
//     url: "/kodaikanal/guides/hidden-places-kodaikanal/"
//   },
//   {
//     id: "two-day-itinerary",
//     title: "Two-Day Kodaikanal Itinerary",
//     url: "/kodaikanal/guides/two-day-itinerary/"

//   },
//     {
//     id: "kodaikanal-boating-guide",
//     title: "Kodaikanal Lake Boating Guide",
//     url: "/kodaikanal/guides/kodaikanal-boating-guide/"
//     },
//     {
//     id: "best-sunrise-spots",
//     title: "Best Sunrise Spots in Kodaikanal",
//     url: "/kodaikanal/guides/best-sunrise-spots/"
//     },
//     {
//     id: "valley-view-resorts",
//     title: "Resorts with Valley View in Kodaikanal",
//     url: "/kodaikanal/guides/valley-view-resorts/"
//     },
//     {
//     id: "family-resorts",
//     title: "Best Family Resorts in Kodaikanal",
//     url: "/kodaikanal/guides/family-resorts/"
//     }
// ];

// const container = document.getElementById("related-links");
// const currentPage = container.dataset.page;

// links.forEach(link => {
//   if (link.id !== currentPage) {
//     container.innerHTML += `
//       <a href="${link.url}">➜ ${link.title}</a><br>
//     `;
//   }
// });


const links = [
  {
    title: "Hidden Places in Kodaikanal",
    url: "/kodaikanal/guides/hidden-places-kodaikanal/"
  },
  {
    title: "Kodaikanal Lake Boating Guide",
    url: "/kodaikanal/guides/kodaikanal-boating-guide/"
  },
  {
    title: "Best Sunrise Spots in Kodaikanal",
    url: "/kodaikanal/guides/best-sunrise-spots/"
  },
  {
    title: "Resorts with Valley View in Kodaikanal",
    url: "/kodaikanal/guides/valley-view-resorts/"  
  },
  {
    title: "Two-Day Kodaikanal Itinerary",
    url: "/kodaikanal/guides/two-day-itinerary/"
  },
  {
    title: "Kodaikanal Weather Month by Month",
    url: "/kodaikanal/guides/kodaikanal-weather/"
  },
  {
    title: "Best Family Resorts in Kodaikanal",
    url: "/kodaikanal/guides/family-resorts/"
  }
];

const currentPath = window.location.pathname;

const container = document.getElementById("related-links");

links.forEach(link => {
  if (link.url !== currentPath) {
    container.innerHTML += `
      <a href="${link.url}">➜ ${link.title}</a><br>
    `;
  }
});
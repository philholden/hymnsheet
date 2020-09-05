importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);
console.log("service-worker");
// self.addEventListener("install", function (event) {
//   event.waitUntil(
//     caches.open(cacheName).then(function (cache) {
//       return cache.addAll([
//         "/css/bootstrap.css",
//         "/css/main.css",
//         "/js/bootstrap.min.js",
//         "/js/jquery.min.js",
//         "/offline.html",
//       ]);
//     })
//   );
// });

workbox.precaching.precacheAndRoute([{"revision":"cad6ed6f5bf73394a30aabeeb556bec1","url":"bundle.css"},{"revision":"3d118941ccee72f3aba0dfb2365c941c","url":"bundle.js"},{"revision":"1139bdbcd9f35043651cff25cfd91cde","url":"favicon.png"},{"revision":"b2d9844ef15d4c8b0f85a8e752edf9cb","url":"hills.webp"},{"revision":"23e42a3c1dfccbf86c2720cb3b7831d3","url":"hymnsheet-256-sharp.png"},{"revision":"e8ac95c298e060b9f645cff09bc301d6","url":"hymnsheet-256.png"},{"revision":"2607500e65ab5ac084b3ef7436a91f90","url":"index-old.html"},{"revision":"1b6e947ba9476bbc349d3be2ec7fed34","url":"index.html"},{"revision":"8b3dd1b5c892bde590c13da4ed65e5e3","url":"listsongbooks.jpeg"},{"revision":"8d77c400acff01fe567bd8c879fd1f71","url":"listsongbooksempty.jpeg"},{"revision":"71854d40eee86644189bb429fe0be4b2","url":"offline.html"},{"revision":"24742cd41909451ae102642c0ddb54ca","url":"songbook.jpeg"},{"revision":"1f89f46939daf3dc4865046ba1e84f28","url":"songbookempty.jpeg"}]);

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

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

console.log("service-worker");

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.skipWaiting();
workbox.clientsClaim();
// self.addEventListener("activate", (event) => {
//   clients.claim();
//   console.log("Now ready to handle fetches!");
// });

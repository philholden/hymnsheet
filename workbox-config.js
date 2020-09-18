module.exports = {
  globDirectory: "public/",
  globPatterns: [
    "*.html",
    "*.json",
    "*.svg",
    "*.png",
    "locales/*.json",
    "manifest.json",
    "static/**/!(*map*)",
  ],
  runtimeCaching: [
    {
      //      urlPattern: /^https:\/\/cloudflare-ipfs\.com\/ipfs/,

      urlPattern: /^https:\/\/ipfs\.io\/ipfs/,
      // 'fastest' is now 'StaleWhileRevalidate'
      // handler: "CacheFirst",
      handler: "StaleWhileRevalidate",
      options: {
        // options.cache.name is now options.cacheName
        cacheName: "song-cache",
        // options.cache is now options.expiration
        expiration: {
          maxEntries: 5,
          maxAgeSeconds: 60 * 60 * 24 * 365,
        },
      },
    },
  ],
  dontCacheBustURLsMatching: /\.\w{8}\./,
  swDest: "./public/service-worker.js",
};

module.exports = {
  stripPrefix: "build/",
  staticFileGlobs: [
    "public/*.html",
    "public/*.json",
    "public/*.css",
    "public/*.jpeg",
    "public/*.svg",
    "public/*.png",
  ],
  //  dontCacheBustUrlsMatching: /\.\w{8}\./,
  swFilePath: "./public/service-worker.js",
};

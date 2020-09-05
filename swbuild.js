const workboxBuild = require("workbox-build");

// NOTE: This should be run *AFTER* all your assets are built
const buildSW = () => {
  // This will return a Promise
  return workboxBuild
    .injectManifest({
      swSrc: "service-worker.js",
      swDest: "public/service-worker.js",
      maximumFileSizeToCacheInBytes: 4096000,
      globDirectory: "public",
      globPatterns: ["**/*.{js,css,html,png,jpeg,webp}", "bundle.js"],
    })
    .then(({ count, size, warnings }) => {
      // Optionally, log any warnings and details.
      warnings.forEach(console.warn);
      console.log(`${count} files will be precached, totaling ${size} bytes.`);
    });
};

buildSW();

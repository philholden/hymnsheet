const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const path = require("path");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    bundle: ["./src/index.js"],
    pdfViewer: ["./pdfViewer/index.js"],
    "pdf.worker": ["./node_modules/pdfjs-dist/build/pdf.worker.entry"],
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte"),
    },
    extensions: [".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true,
            // hotOptions: {
            //   // whether to preserve local state (i.e. any `let` variable) or
            //   // only public props (i.e. `export let ...`)
            //   noPreserveState: false,
            //   // optimistic will try to recover from runtime errors happening
            //   // during component init. This goes funky when your components are
            //   // not pure enough.
            //   optimistic: true,

            //   // See docs of svelte-loader-hot for all available options:
            //   //
            //   // https://github.com/rixo/svelte-loader-hot#usage
            // },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
        ],
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    // new WorkboxPlugin.InjectManifest({
    //   swSrc: "./public/service-worker.js",
    //   additionalManifestEntries: [
    //     {url}
    //   ]
    // }),
  ],
  devtool: prod ? false : "source-map",
};

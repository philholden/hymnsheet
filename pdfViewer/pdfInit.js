// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/licenses/publicdomain/

// Hello world example for webpack.

import pdfjsLib from "pdfjs-dist";

var pdfPath = "../learning/helloworld.pdf";
console.log("hello");
// Setting worker path to worker bundle.
pdfjsLib.GlobalWorkerOptions.workerSrc = "../pdf.worker.js";

// Loading a document.
console.log("hello");
var loadingTask = pdfjsLib.getDocument(pdfPath);
console.log("nono", loadingTask);
loadingTask.promise
  .then(function (pdfDocument) {
    // Request a first page
    return pdfDocument.getPage(1).then(function (pdfPage) {
      // Display page on the existing canvas with 100% scale.
      var viewport = pdfPage.getViewport({ scale: 1.0 });
      var canvas = document.getElementById("theCanvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      var ctx = canvas.getContext("2d");
      var renderTask = pdfPage.render({
        canvasContext: ctx,
        viewport: viewport,
      });
      return renderTask.promise;
    });
  })
  .catch(function (reason) {
    console.error("Error: " + reason);
  });

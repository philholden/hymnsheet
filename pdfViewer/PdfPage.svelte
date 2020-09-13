<script context="module">
  import pdfjsLib from "pdfjs-dist";
  pdfjsLib.GlobalWorkerOptions.workerSrc = "../pdf.worker.js";
</script>

<script>
  import { onMount } from "svelte";
  import PixelRatio from "./PixelRatio";
  let canvas;
  let canvas2;
  let loadingTask;
  let pixelRatio = 1;
  export let src =
    "https://bafybeidnotxavgm435p3hi24vgjgvlr3svwxymog265yzhpa7pxqb6jwde.ipfs.infura-ipfs.io/"; //"../helloworld.pdf";
  export let page = 1;
  export let blank = false;
  export let display;
  export let transition = 1;
  let innerHeight;
  let innerWidth;
  let styleWidth = "auto";
  let pdfDocument;
  let promiseDoc;
  let db = 1;
  const prev = {};

  async function renderPdf(src, innerHeight, innerWidth, display) {
    if (innerWidth == undefined) return;
    if (prev.src !== src) {
      promiseDoc = pdfjsLib.getDocument(src).promise;
    }
    pdfDocument = await promiseDoc;
    page =
      page < 1
        ? (page = 1)
        : page > pdfDocument.numPages
        ? pdfDocument.numPages
        : page;
    prev.src = src;
    if (page !== prev.page) {
      db = 1 - db;
    }
    const pdfPage = await pdfDocument.getPage(page);
    let viewport = pdfPage.getViewport({ scale: 1.0 });
    const aspectV = viewport.width / viewport.height;
    const aspectC = innerWidth / innerHeight;
    const sf =
      (aspectC < aspectV
        ? innerWidth / viewport.width
        : innerHeight / viewport.height) * pixelRatio;
    viewport = pdfPage.getViewport({ scale: sf });
    const _canvas = [canvas, canvas2][db];
    const __canvas = [canvas, canvas2][1 - db];
    // _canvas.style.zIndex = 1;
    // _canvas.style.opacity = 1;
    // __canvas.style.zIndex = 2;
    // __canvas.style.opacity = 0;
    _canvas.width = viewport.width;
    _canvas.height = viewport.height;
    styleWidth = _canvas.width / pixelRatio;
    const ctx = _canvas.getContext("2d");
    const renderTask = pdfPage.render({
      canvasContext: ctx,
      viewport: viewport
    });
  }

  $: renderPdf(src, innerHeight, innerWidth, display), page;
</script>

<style>
  :global(html, body) {
    padding: 0;
    margin: 0;
  }
  canvas {
    display: block;
  }

  .outer {
    background: black;
    display: grid;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
  }

  input {
    position: fixed;
    bottom: 0;
    z-index: 3;
  }

  .onScreen {
    z-index: 1;
    opacity: 1;
  }

  .offScreen {
    z-index: 2;
    opacity: 0;
  }
</style>

<svelte:window bind:innerWidth bind:innerHeight />
<PixelRatio bind:pixelRatio />

<div
  class:onScreen={db === 0}
  offScreen={db === 1 || blank}
  class="outer"
  style={`width: ${innerWidth}px;height: ${innerHeight}px; transition: opacity ${transition}s`}>

  <canvas bind:this={canvas} style={`width: ${styleWidth}px;`} />

</div>

<div
  class:onScreen={db === 1}
  class:offScreen={db === 0 || blank}
  class="outer"
  style={`width: ${innerWidth}px;height: ${innerHeight}px;transition: opacity ${transition}s`}>

  <canvas bind:this={canvas2} style={`width: ${styleWidth}px;`} />

</div>

<input type="number" bind:value={page} />

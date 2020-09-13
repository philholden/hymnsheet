<script>
  import QRious from "qrious";
  import { onMount } from "svelte";
  import { Button, BottomBar, LinkButton } from "./index";
  let el;
  let input;
  export let size = 496;
  export let style = "width: 60vmin";
  export let url =
    "https://hymnsheet.io/#/qr?$n=new&i=1wqjbjne3xd707m651l67&s=xd707m651l6";
  onMount(() => {
    let qr = new QRious({
      element: el,
      value: url,
      size,
      level: "M"
    });
  });
</script>

<style>
  canvas {
    image-rendering: pixelated;
    display: block;
  }
  @media print {
    canvas {
      image-rendering: pixelated;
    }
  }
</style>

<canvas bind:this={el} {style} />

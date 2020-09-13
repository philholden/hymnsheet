<script>
  import { onMount } from "svelte";
  export let pixelRatio = window.devicePixelRatio;
  console.log("hello world");
  let mq = matchMedia(`(resolution: ${pixelRatio}dppx)`);

  function updatePixelRatio() {
    let pr = window.devicePixelRatio;
    mq.removeListener(updatePixelRatio);
    pixelRatio = window.devicePixelRatio;
    mq = matchMedia(`(resolution: ${pixelRatio}dppx)`);
    mq.addListener(updatePixelRatio);
  }

  updatePixelRatio();
  onMount(() => {
    mq.addListener(updatePixelRatio);
    return () => mq.removeListener(updatePixelRatio);
  });
</script>

<template>{pixelRatio}</template>

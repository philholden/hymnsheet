<script>
  export let item;
  export let channelId;
  export let selected;
  import { getLiveChannel, channelDb } from "../store/liveChannel";
  import { createEventDispatcher } from "svelte";
  import { getDocument, PdfThumbnail } from "@omysoul/svelte-pdf-viewer";
  const dispatch = createEventDispatcher();

  const liveChannel = getLiveChannel(channelId);

  function onSelect() {
    liveChannel.pubMajor({
      contentType: "pdf/page",
      src: item.src,
      page: item.page
    });
    dispatch("select", item.id);
  }
</script>

<style>
  .outer {
    position: relative;
    cursor: pointer;
  }

  .selected {
    outline: 2px solid #eee;
  }
</style>

<div on:click={onSelect} class="outer" class:selected>
  <PdfThumbnail src={item.src} page={item.page} />
</div>

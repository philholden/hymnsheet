<script>
  export let item;
  export let channelId;
  export let selected;
  import { getLiveChannel, channelDb } from "../store/liveChannel";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  const liveChannel = getLiveChannel(channelId);

  function onSelect() {
    liveChannel.pubMajor({
      contentType: "text/quote",
      value: item.value
    });
    dispatch("select", item.id);
  }
</script>

<style>
  div {
    font-size: 18px;
    line-height: 28px;
    cursor: pointer;
    padding: 0 16px;
  }

  .selected {
    background: #eee;
  }
</style>

<div on:click={onSelect} class:selected>
  {@html item.value.text}
</div>

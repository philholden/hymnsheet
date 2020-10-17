<script>
  import PlayAudio from "./PlayAudio.svelte";
  import PlaySpeakerNote from "./PlaySpeakerNote.svelte";
  import PlayQuote from "./PlayQuote.svelte";
  import PlaySong from "./PlaySong.svelte";
  import PlayPdf from "./PlayPdf.svelte";
  import AddItem from "./AddItem.svelte";
  import { createEventDispatcher } from "svelte";
  export let item;
  export let selected;
  export let channelId;
  let add = false;

  const dispatch = createEventDispatcher();

  function onSelect(e) {
    selected = e.detail;
  }
</script>

<style>
  .item {
    margin-top: 24px;
  }
</style>

<div class="outer">
  <div class="item">
    {#if item.type === 'quote'}
      <PlayQuote {item} {channelId} on:select {selected} />
    {:else if item.type === 'note'}
      <PlaySpeakerNote {item} />
    {:else if item.type === 'speakerAudio'}
      <PlayAudio {item} {channelId} />
    {:else if item.type === 'song'}
      <PlaySong {item} on:select {channelId} {selected} />
    {:else if item.type === 'pdf'}
      <PlayPdf {item} on:select {channelId} {selected} />
    {:else}
      <pre>{JSON.stringify(item, null, 2)}</pre>
    {/if}
  </div>
</div>

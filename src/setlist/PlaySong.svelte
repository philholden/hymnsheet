<script>
  export let item;
  export let channelId;
  export let selected;
  import { getLiveChannel, channelDb } from "../store/liveChannel";
  import { createEventDispatcher } from "svelte";
  import { decodeSong, encodeSong, getVerses } from "../songCodec";
  import { Button, ButtonGroup } from "../common/";

  let song = decodeSong(item.value.text);
  let verses = getVerses(song.lyrics);
  let verseIndex;
  let blank;
  let sf = 1;
  let sendSong = true;
  let showSong = false;
  let first = true;
  let clientWidth;
  let clientWidth2;
  let clientHeight;

  const dispatch = createEventDispatcher();
  const liveChannel = getLiveChannel(channelId);

  $: {
    if (!selected) sendSong = true;
  }
  $: {
    sf = clientWidth ? clientWidth2 / clientWidth : 1;
  }

  function selectVerse(_verseIndex) {
    dispatch("select", item.id);
    verseIndex = _verseIndex;
    pub("verseIndex", verseIndex);
  }

  function toggleBlank() {
    dispatch("select", item.id);
    blank = !blank;
    pub("blank", blank);
  }

  function toggleShowSong() {
    dispatch("select", item.id);
    showSong = !showSong;
    pub("showSong", showSong);
  }

  function pub(key, value) {
    console.log("FIRST", first, sendSong);
    if (sendSong || first) {
      liveChannel.pubMajor({
        [key]: value,
        text: song.lyrics,
        contentType: "text/lyrics",
        first
      });
      first = false;
      sendSong = false;
      return;
    }
    liveChannel.pubMinor({
      [key]: value
    });
  }
</script>

<style>
  .outer {
    transform-origin: 0 0;
    padding: 18px;
    background: black;
    color: #bbb;
    width: min-content;
    user-select: none;
  }

  .verse {
    margin-bottom: 1em;
    font-family: var(--main-font);
    font-size: 16px;
  }

  .line {
    white-space: nowrap;
    line-height: 1.6;
  }
  .black {
    position: absolute;
    width: 100%;
    height: 100%;
    background: black;
  }

  .selected {
    color: #fff;
  }

  .blank {
    opacity: 0.4;
  }
  .sizer {
    position: relative;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
  }
</style>

<div class="sizer" bind:clientWidth={clientWidth2}>
  <div class="grid">
    {#if verses.length !== 0}
      <div
        style="position: absolute; visibility: hidden;"
        class:blank
        class="outer"
        bind:clientWidth
        bind:clientHeight>
        {#each verses as verse, i}
          <div
            class="verse"
            class:selected={verseIndex === i}
            on:click={() => selectVerse(i)}>
            {#each verse.lines as line, j}
              <div class="line">{line}</div>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
    {#if verses.length !== 0}
      <div style={`min-height: ${sf * clientHeight}px`}>
        <div
          class:blank
          class="outer"
          style={`transform: scale3d(${sf},${sf},1)`}>
          {#each verses as verse, i}
            <div
              class="verse"
              class:selected={verseIndex === i}
              on:click={() => selectVerse(i)}>
              {#each verse.lines as line, j}
                <div class="line">{line}</div>
              {/each}
            </div>
          {/each}
        </div>
      </div>
    {/if}
    <div style="padding: 0 24px;">
      <ButtonGroup horizontal>
        <Button type="button" on:click={toggleShowSong}>
          {showSong ? 'Verse' : 'Whole song'}
        </Button>
        <Button type="button" on:click={toggleBlank}>
          {blank ? 'Show' : 'Blank'}
        </Button>
      </ButtonGroup>
    </div>
  </div>
</div>

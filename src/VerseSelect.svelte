<script>
  import {
    Button,
    BottomBar,
    QrReaderModal,
    BlackBar,
    WakeLock,
    BlackButton,
    ShareModal,
    Icon
  } from "./common";
  import { push } from "svelte-spa-router";
  import { songBooks } from "./store/songBook";
  import { getLiveChannel } from "./store/liveChannel";
  import { getChannelUrl } from "./store/channelDb";

  export let params = {};
  let innerWidth;
  let clientWidth;
  let sf;
  let verseIndex = 0;
  let showShare = false;
  let shareUrl = "http://";
  let shareTitle = "Others scan to join";
  let shareText = "";
  let sendSong = true;
  let blank = false;
  let showSong = false;
  let first = true;
  getChannelUrl(params.channelId).then(url => (shareUrl = url));
  const liveChannel = getLiveChannel(params.channelId);
  const value = liveChannel.valueStore;
  window.liveChannel = liveChannel;
  import { oLordMyGod } from "./util";
  import { decodeSong, encodeSong, getVerses } from "./songCodec";
  //  const {valueStore} = liveChannel;
  let song; // = decodeSong(oLordMyGod);

  let verses = []; // = getVerses(song.lyrics);
  $: sf = innerWidth / clientWidth;
  $: console.log("valuee", $value);

  function selectVerse(_verseIndex) {
    verseIndex = _verseIndex;
    pub("verseIndex", verseIndex);
  }

  function toggleBlank() {
    blank = !blank;
    pub("blank", blank);
  }

  function toggleShowSong() {
    showSong = !showSong;
    pub("showSong", showSong);
  }

  function pub(key, value) {
    if (sendSong || first) {
      // liveChannel.pubMajor({
      //   contentType: "text/pdf",
      //   src = "https://bafybeidnotxavgm435p3hi24vgjgvlr3svwxymog265yzhpa7pxqb6jwde.ipfs.infura-ipfs.io/",
      //   page = "1"
      // });
      // return;
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

  async function onFullScreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen({
          navigationUI: "hide"
        });
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
      setTimeout(() => count++, 0);
    } catch (e) {
      console.log("cant full screen");
    }
  }
  async function init() {
    const songBook = await songBooks.getSongStore(params.songBookId);
    song = await songBook.find(params.songId);
    verses = getVerses(song.lyrics);
  }
  init();
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
</style>

<WakeLock />
<div class="black" />
{#if verses.length !== 0}
  <div
    class:blank
    class="outer"
    bind:clientWidth
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
{/if}
<ShareModal
  url={shareUrl}
  bind:show={showShare}
  title={shareTitle}
  text={shareText} />
<BlackBar backTitle="Songs">
  <BlackButton
    on:click={() => push(`/channel/${params.channelId}/songbook/${params.songBookId}/song/select`)}>
    <Icon name="chevronLeft" />
  </BlackButton>
  <BlackButton on:click={() => (showShare = true)}>
    <Icon name="share" />
  </BlackButton>
  <!-- <BlackButton on:click={() => showShare = true}><Icon name="colors" /></BlackButton> -->
  <BlackButton on:click={toggleShowSong}>
    <Icon name={showSong ? 'verse' : 'wholeSong'} />
  </BlackButton>
  <BlackButton on:click={toggleBlank}>
    <Icon name={blank ? 'verse' : 'blank'} color={blank ? 'orange' : 'white'} />
  </BlackButton>

  {#if !/iPhone/.test(navigator.userAgent)}
    <BlackButton on:click={onFullScreen}>
      <Icon
        name={document.fullscreenElement && count ? 'fullScreenExit' : 'fullScreen'} />
    </BlackButton>
  {/if}
</BlackBar>

<svelte:window bind:innerWidth />

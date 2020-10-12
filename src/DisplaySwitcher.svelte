<script>
  import SongDisplay from "@omysoul/svelte-song-display";
  import { onMount } from "svelte";
  import { WakeLock, BlackBar, BlackButton, ShareModal, Icon } from "./common";
  import { overscan } from "./store";
  import { push } from "svelte-spa-router";
  import { getLiveChannel, channelDb } from "./store/liveChannel";
  import { getChannelUrl } from "./store/channelDb";
  import { PdfPage } from "@omysoul/svelte-pdf-viewer";
  import QuoteFit from "@omysoul/svelte-quote-fit";

  let el;
  let component;
  let showShare = false;
  let shareUrl = "http://";
  let shareTitle = "Others scan to join";
  let shareText = "";
  let count = 0;
  let _props;
  let _contentType;

  export let params = {};
  const liveChannel = getLiveChannel(params.channelId);
  const value = liveChannel.valueStore;

  getChannelUrl(params.channelId).then(url => (shareUrl = url));

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
</script>

<style>
  .inner {
    padding: 4vmin;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    position: relative;
  }

  .overscan {
    padding: 0;
  }

  .outer {
    position: fixed;
    top: 0;
    left: 0;
    background: black;
  }

  .scroll {
    height: 200vh;
    background: black;
  }
</style>

<WakeLock />
<div class="scroll" />
<div class="outer">
  <div
    class="inner"
    bind:this={el}
    class:overscan={$overscan || ($value && $value.contentType === 'pdf/page')}>
    {#if $value}
      {#if $value.contentType === 'text/lyrics'}
        <SongDisplay {...$value} />
      {:else if $value.contentType === 'pdf/page'}
        <PdfPage {...$value} />
      {:else if $value.contentType === 'text/quote'}
        <QuoteFit {...$value.value} />
      {/if}
    {/if}
  </div>
</div>
<ShareModal
  url={shareUrl}
  bind:show={showShare}
  title={shareTitle}
  text={shareText} />
<BlackBar backTitle="Home" backUrl={`/`}>
  <BlackButton on:click={() => push('/channel/list')}>
    <Icon name="chevronLeft" />
  </BlackButton>
  <BlackButton on:click={() => (showShare = true)}>
    <Icon name="qr" />
  </BlackButton>
  <BlackButton on:click={() => ($overscan = !$overscan)}>
    <Icon name={$overscan ? 'margin' : 'overscan'} />
  </BlackButton>
  {#if !/iPhone/.test(navigator.userAgent)}
    <BlackButton on:click={onFullScreen}>
      <Icon
        name={document.fullscreenElement && count ? 'fullScreenExit' : 'fullScreen'} />
    </BlackButton>
  {/if}
</BlackBar>

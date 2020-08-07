<script>
  import Title from "./Title.svelte";
  import Button from "./Button.svelte";
  import Qr from "./Qr.svelte";
  import Input from "./Input.svelte";
  import { onDestroy } from "svelte";
  export let url;
  export let title;
  export let socialTitle;
  export let socialText;
  let copied = false;
  let timeout;
  let inputEl;
  let canShare = navigator.share;

  function socialShare() {
    if (navigator.share) {
      navigator
        .share({
          title: socialTitle,
          text: socialText,
          url
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error));
    }
  }

  function copy() {
    inputEl.focus();
    inputEl.select();
    document.execCommand("copy");
    inputEl.blur();
    copied = true;
    clearTimeout(timeout);
    timeout = setTimeout(() => (copied = false), 3000);
  }
  onDestroy(() => clearTimeout(timeout));
</script>
<style>
  .outer {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-gap: 18px;
  }

  input {
    border-radius: 4px;
    padding: 12px 16px;
    border: 1px solid var(--line);
    font-size: 18px;
    box-sizing: border-box;
    color: var(--text2);
    min-width: 0px;
  }

  .copy {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-gap: 10px;
  }

  .copiedHide {
    margin: -16px 0;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .copied {
    opacity: 1;
  }
</style>
<div class="outer">
  {#if title}<Title>{title}</Title>{/if}
  <Qr {url} style="width: 80%"/>
  <div class="copy">
    <input value={url} bind:this={inputEl} on:focus={copy} />
    <Button invisible iconLeft="copy" on:click={copy}>Copy</Button>
  </div>

  <div class="copiedHide" class:copied >Copied to clipboard</div>

  <div class="buttons">
    
    {#if canShare}<Button iconLeft="share" on:click={socialShare}>Social share</Button>{/if}
  </div>

</div>
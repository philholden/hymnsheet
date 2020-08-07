<script>
  import Modal from "./Modal.svelte";
  import Button from "./Button.svelte";
  import QrReader from "./QrReader.svelte";
  import Title from "./Title.svelte";
  import { ipfsImportSongBook } from "../store/songBook";
  import { push } from "svelte-spa-router";
  export let show;
  export let title;
  let showReader = true;

  // function hide(songBookId) {
  //   alert(songBookId);
  //   push(`/songbook/${songBookId}/song/list/add`);
  // }
  async function onIpfs(type, hash) {
    //show = false;
    showReader = false;
    if (type === "addSongBook") {
      const songBookId = await ipfsImportSongBook(hash);
      push(`/songbook/${songBookId}/song/list/add`);
    }
  }
</script>

{#if show}
<Modal on:close={() => show = false}>
  {#if title}<Title>{title}</Title>{/if}
  {#if showReader}
  <QrReader {onIpfs} />
  {:else}
  ...loading song book
  {/if}

  <Button autoFocus invisible iconLeft="close" on:click={() => show = false}>Close</Button>
</Modal>
{/if}
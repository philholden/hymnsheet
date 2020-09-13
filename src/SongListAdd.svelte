<script>
  import {
    Header,
    Title,
    TitleRow,
    Button,
    ListItem,
    List,
    BottomBar,
    EmptyState,
    SearchInput,
    Sock,
    ShareModal,
    Ghost,
    TitleEditable
  } from "./common";
  import { googlish } from "./util";
  import { push } from "svelte-spa-router";
  import { songBooks, ipfsExportSongBook } from "./store/songBook";
  export let params = {};
  let songBook;
  let songStore;
  let displayName = "";
  let shareUrl = "";
  let onSave = name => songBooks.rename(params.songBookId, name);
  const select = /select$/.test(window.location.hash);
  const linkIcon = select ? "chevronRight" : "edit";
  const backLink = select
    ? `/channel/${params.channelId}/songbook/select`
    : `/songbook/add`;
  const getUrl = id =>
    select
      ? `/channel/${params.channelId}/songbook/${params.songBookId}/song/${id}`
      : `/songbook/${params.songBookId}/song/${id}/edit`;
  const backText = select ? "Select channel" : "Books";

  let showModal = false;

  let songs = [];
  let search = "";
  let filter;
  $: filter = googlish(
    search,
    false,
    false,
    x => `${x.title + x.author + x.lyrics}`
  );

  async function init() {
    songBook = await songBooks.find(params.songBookId);
    displayName = songBook.displayName;
    songStore = await songBooks.getSongStore(params.songBookId);
  }
  async function onOpenModal() {
    shareUrl =
      "ipfs:addSongBook:" + (await ipfsExportSongBook(params.songBookId));
    showModal = true;
  }
  init();
</script>

<style>

</style>

<ShareModal
  url={shareUrl}
  bind:show={showModal}
  title="Share copy of song book" />
<Header />
<Sock>
  <TitleRow>
    <TitleEditable value={displayName} editable={!select} {onSave} />
    <!-- <Title>Song book: {displayName}</Title> -->
    {#if !select}
      <Button
        invisible
        iconLeft="delete"
        on:click={() => {
          songBooks.delete(params.songBookId);
          push(backLink);
        }}>
        Delete
      </Button>
    {/if}
  </TitleRow>
  <SearchInput placeholder="Search song" bind:value={search} />
  {#if songStore && $songStore}
    <List style="margin-top: 16px">
      {#each $songStore.filter(filter) as { title, id }}
        <ListItem href={getUrl(id)} icon={linkIcon}>{title}</ListItem>
      {/each}
    </List>
  {:else if songStore}
    <EmptyState style="margin-top: 18px;" icon="music">
      To create a song,
      <br />
      click '+ Add song'
    </EmptyState>
  {/if}

</Sock>
<BottomBar>
  <Button invisible iconLeft="chevronLeft" href={backLink}>{backText}</Button>
  <Button invisible iconLeft="share" on:click={onOpenModal}>Share book</Button>
  {#if !select}
    <Button iconLeft="add" href={`/songbook/${params.songBookId}/song/add`}>
      Add song
    </Button>
  {/if}
</BottomBar>

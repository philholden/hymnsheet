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
    Ghost,
    QrReaderModal,
    InputModal
  } from "./common";
  import { googlish } from "./util";
  import { push } from "svelte-spa-router";
  import { songBooks } from "./store/songBook";
  export let params = {};
  const select = /select$/.test(window.location.hash);
  const linkIcon = select ? "chevronRight" : "edit";
  const backLink = select ? `/channel/${params.channelId}/manage` : "/";
  const backText = select ? `Manage channel` : "Main menu";
  const getUrl = id =>
    select
      ? `/channel/${params.channelId}/songbook/${id}/song/select`
      : `/songbook/${id}/song/list/add`;
  let songs = [
    { title: "Carols", id: 1 },
    { title: "Hymns", id: 2 },
    { title: "Psalms", id: 3 }
  ];
  let search = "";
  let filter;
  let showModal = false;
  let showNameModal = false;
  $: filter = googlish(search, false, false, x => `${x.displayName}`);
</script>

<style>

</style>

<Ghost url="songbook.jpeg" opacity={0} />
<Ghost url="songbookempty.jpeg" opacity={0} />
<QrReaderModal
  url="https://"
  title="Scan song book Qr code"
  bind:show={showModal} />
<InputModal
  bind:show={showNameModal}
  onAdd={songBooks.add}
  placeholder="Song book name" />
<Header />
<Sock>
  <TitleRow>
    <Title>{select ? 'Select song book' : 'Song books'}</Title>
  </TitleRow>
  <SearchInput placeholder="Search song" bind:value={search} />
  {#if songs.length !== 0}
    <List style="margin-top: 16px">
      {#each $songBooks.filter(filter) as { displayName, id }}
        <ListItem href={getUrl(id)} icon={linkIcon}>{displayName}</ListItem>
      {/each}
    </List>
  {:else}
    <EmptyState style="margin-top: 18px;" icon="music">
      To create a song book,
      <br />
      click '+ Add song book'
    </EmptyState>
  {/if}

  <!-- <pre>{JSON.stringify($songBooks,null,2)}</pre> -->

</Sock>
<BottomBar>
  <Button invisible iconLeft="chevronLeft" href={backLink}>{backText}</Button>

  {#if select}
    <Button iconLeft="qrScanner" on:click={() => (showModal = true)}>
      Add book
    </Button>
  {:else}
    <Button iconLeft="add" on:click={() => (showNameModal = true)}>
      Add book
    </Button>
  {/if}
</BottomBar>

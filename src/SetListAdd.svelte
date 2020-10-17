<script>
  import { Store, set, get, del, clear, getStore } from "./store/storeDb";
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
    QrReaderModal,
    InputModal
  } from "./common";
  import { googlish } from "./util";
  import { nanoid } from "nanoid";

  import { push } from "svelte-spa-router";
  import { setlists } from "./store/songBook";
  export let params = {};
  const db = new Store("setlist", "setlist");
  let list;

  const linkIcon = "chevronRight";
  const backLink = `/channel/${params.channelId}/manage`;
  const backText = `Manage channel`;
  const getUrl = id => `/channel/${params.channelId}/setlist/${id}`;

  init();
  async function init() {
    list = await getStore("list", db, []);
  }

  function addItem(displayName) {
    const item = {
      id: nanoid(),
      displayName
    };
    console.log("add item", displayName);
    set("list", [...$list, item], db);
  }

  function removeIndex(index) {
    set("list", $list.filter((x, i) => i !== index), db);
  }

  let search = "";
  let filter;
  let showModal = false;
  let showNameModal = false;
  $: filter = googlish(search, false, false, x => `${x.displayName}`);
</script>

<style>

</style>

<QrReaderModal
  url="https://"
  title="Scan setlist Qr code"
  bind:show={showModal} />
<InputModal
  bind:show={showNameModal}
  onAdd={addItem}
  placeholder="Setlist name" />
<Header />
<Sock>
  <TitleRow>
    <Title>Setlists</Title>
  </TitleRow>
  <SearchInput placeholder="Search" bind:value={search} />
  {#if $list && $list.length !== 0}
    <List style="margin-top: 16px">
      {#each $list.filter(filter) as { displayName, id }}
        <ListItem href={getUrl(id)} icon={linkIcon}>{displayName}</ListItem>
      {/each}
    </List>
  {:else}
    <EmptyState style="margin-top: 18px;" icon="music">
      To create a setlist,
      <br />
      click '+ Add'
    </EmptyState>
  {/if}

</Sock>
<BottomBar>
  <Button invisible iconLeft="chevronLeft" href={backLink}>{backText}</Button>
  <Button iconLeft="qrScanner" on:click={() => (showModal = true)}>
    Import
  </Button>
  <Button iconLeft="add" on:click={() => (showNameModal = true)}>Add</Button>
</BottomBar>

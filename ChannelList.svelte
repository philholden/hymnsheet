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
    QrReaderModal
  } from "./common";

  import { getContext } from "svelte";
  import { googlish } from "./util";
  import { channels } from "./store/channelDb";

  const { open } = getContext("simple-modal");
  export let params = {};
  const a = [
    { title: "Home group", id: 1 },
    { title: "Worship in the park", id: 2 },
    { title: "Life Church", id: 3 },
    { title: "Family worship", id: 4 }
  ];
  let items = a;
  let showQr = false;
  let search = "";
  let filter;
  $: filter = googlish(search, false, false, x => `${x.title}`);
</script>

<style>

</style>

<QrReaderModal bind:show={showQr} />

<Header />
<Sock>
  <TitleRow>
    <Title>Choose a channel to watch</Title>
    <!--<Button invisible iconLeft="delete">Delete</Button>-->
  </TitleRow>
  <SearchInput placeholder="Search song" bind:value={search} />
  {#if items.length !== 0}
    <List style="margin-top: 16px">
      {#each $channels.filter(filter) as { displayName, id }}
        <ListItem href={`/displaysong/${id}`} icon="chevronRight">
          {displayName}
        </ListItem>
      {/each}
    </List>
  {:else}
    <EmptyState style="margin-top: 18px;" icon="channel">
      To add an existing channel: scan a QR code or click a link you have
      received.
      <br />
      <br />
      To create a new channel: open the channel manager.
      <br />
    </EmptyState>
  {/if}

</Sock>
<BottomBar>
  <Button invisible iconLeft="chevronLeft" href={`/`}>Main menu</Button>
  <Button iconLeft="qrScanner" on:click={() => (showQr = true)}>
    Add channel
  </Button>
</BottomBar>

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

  import { getContext } from "svelte";
  import { googlish } from "./util";
  import { channels, keys } from "./store/channelDb";
  import { getIpfs } from "./store/ipfs";
  let control = x => false;
  async function getFilterControl() {
    control = await channels.getFilterControl();
  }
  getFilterControl();

  const { open } = getContext("simple-modal");
  export let params = {};
  let showQr = false;
  let showAdd = false;
  let search = "";
  let filter;

  $: filter = googlish(search, false, false, x => `${x.displayName}`);
  let items;
  $: items = $channels.filter(control);
</script>

<style>

</style>

<QrReaderModal bind:show={showQr} />
<InputModal
  bind:show={showAdd}
  placeholder="Channel name"
  onAdd={channels.create} />

<Header />
<Sock>
  <TitleRow>
    <Title>Channels I can control</Title>
    <!--<Button invisible iconLeft="delete">Delete</Button>-->
  </TitleRow>
  <SearchInput placeholder="Search song" bind:value={search} />
  {#if items.length !== 0}
    <List style="margin-top: 16px">
      {#each items.filter(filter) as { displayName, id }}
        <ListItem href={`/channel/${id}/manage`} icon="chevronRight">
          {displayName}
        </ListItem>
      {/each}
    </List>
  {:else}
    <EmptyState style="margin-top: 18px;" icon="channel">
      To create a new channel click:
      <br />
      Add channel.
      <br />
      <br />
      Channel creator's can also share controller access with you.
      <br />
    </EmptyState>
  {/if}

</Sock>
<BottomBar console.log(channels)>
  <Button invisible iconLeft="chevronLeft" href={`/`}>Main menu</Button>
  <Button
    iconLeft="add"
    on:click={() => {
      showAdd = true;
      getIpfs();
    }}>
    Add channel
  </Button>
</BottomBar>

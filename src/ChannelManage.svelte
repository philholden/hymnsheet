<script>
  import {
    Header,
    Title,
    TitleRow,
    Button,
    ButtonGroup,
    ButtonContent,
    ListItem,
    List,
    Icon,
    BottomBar,
    EmptyState,
    SearchInput,
    Sock,
    Ghost,
    QrReaderModal,
    ShareModal,
    TitleEditable
  } from "./common";

  import { getContext } from "svelte";
  import { googlish, setUrlData } from "./util";
  import { channels, keys, updateChannel } from "./store/channelDb";
  import { push } from "svelte-spa-router";

  const { open } = getContext("simple-modal");
  export let params = {};
  let channel;
  let displayName;
  let backLink = `/channel/list/add`;
  let ipns;
  let showQr = false;
  let showControllerQr = false;
  let search = "";
  let filter;

  let url;
  let poster;

  let controllerUrl =
    "https://hymnsheet.io/d?" +
    setUrlData({
      d: "new Channel",
      n: "1tbelolo522tg8ud6b3z2x78a",
      k: "did:3:bafyreicyctnyurpontgqwixclpwt6quzjydfytlty6nel5rlo3izvuitju"
    });

  $: filter = googlish(search, false, false, x => `${x.title}`);

  async function init() {
    channel = await channels.get(params.channelId);
    console.log(channel);
    displayName = channel.displayName;
    ipns = channel.ipns;
    url =
      window.location.origin +
      window.location.pathname +
      "#/v?" +
      setUrlData({
        // really should be ipns name
        v: params.channelId,
        d: displayName,
        a: channel.allowAll ? "true" : undefined,
        l: channel.allowList,
        i: ipns
      });
    poster = setUrlData({ url });
  }
  init();
</script>

<style>
  .editTitle {
    display: grid;
    grid-gap: 16px;
    grid-template-columns: max-content min-content;
    align-items: center;
  }
  .page {
    background-color: #eee;
    min-height: calc(100vh - 96px);
  }
</style>

<div class="page">
  <Header />
  <Sock>
    <TitleRow>
      <TitleEditable
        bind:value={displayName}
        onSave={() => {
          updateChannel(params.channelId, x => ({ ...x, displayName }));
        }}
        editable />
      <Button
        invisible
        iconLeft="delete"
        on:click={() => {
          channels.delete(params.channelId);
          push(backLink);
        }}>
        Delete
      </Button>
    </TitleRow>

    <ButtonGroup>
      <ButtonContent
        href={`/channel/${params.channelId}/songbook/select`}
        icon="live"
        title="Broadcast from song book">
        Go live, then select songs verses to sing.
      </ButtonContent>
      <ButtonContent
        href={`/channel/${params.channelId}/setlist/`}
        icon="live"
        title="Broadcast from setlist">
        Broadcast a mix of songs, audio, slides and quotes.
      </ButtonContent>
      <ButtonContent
        href="/"
        on:click={e => {
          showQr = true;
          e.preventDefault();
        }}
        icon="share"
        title="Share link digitally">
        Share viewer links via social media & email, display a QR code on
        screen.
      </ButtonContent>
      <ButtonContent
        href={`/poster/?` + poster}
        icon="print"
        title="Print a poster">
        Bystanders can instantly join and see the lyrics by scanning the QR code
        in this poster.
      </ButtonContent>
      <ButtonContent
        href="/"
        on:click={e => {
          showControllerQr = true;
          e.preventDefault();
        }}
        icon="songbook"
        title="Share controller permission">
        Invite others to control lyrics with you via QR of links.
      </ButtonContent>

    </ButtonGroup>
    <div style="height: 18px" />
    <ShareModal {url} bind:show={showQr} title="Share channel with viewers" />
    <ShareModal
      url={controllerUrl}
      bind:show={showControllerQr}
      title="Share controller access" />
  </Sock>
</div>
<BottomBar>

  <Button invisible iconLeft="chevronLeft" href={backLink}>Channels</Button>
  <!-- <Button iconLeft="add" on:click={() => showQr = true}>Add channel</Button> -->
</BottomBar>

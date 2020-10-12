<script>
  import Router from "svelte-spa-router";
  import Home from "./Home.svelte";
  import JoinGroup from "./JoinGroup.svelte";
  import DisplaySwitcher from "./DisplaySwitcher.svelte";
  import IconPage from "./IconPage.svelte";
  import SongListAdd from "./SongListAdd.svelte";
  import SongBookListAdd from "./SongBookListAdd.svelte";
  import SongEdit from "./SongEdit.svelte";
  import ChannelList from "./ChannelList.svelte";
  import ChannelListAdd from "./ChannelListAdd.svelte";
  import ChannelManage from "./ChannelManage.svelte";
  import Poster from "./Poster.svelte";
  import VerseSelect from "./VerseSelect.svelte";
  import SetList from "./SetList.svelte";
  import Go from "./Go.svelte";
  import Pdf from "./Pdf.svelte";
  import Now from "./Now.svelte";
  import { link } from "svelte-spa-router";
  import Modal from "svelte-simple-modal";
  const routes = new Map();
  routes.set("/", Home);
  routes.set("/icon", IconPage);
  routes.set("/now", Now);
  routes.set("/joingroup", JoinGroup);
  routes.set("/displaysong/:channelId", DisplaySwitcher);
  routes.set("/songbook/:songBookId/song/list/add", SongListAdd);
  routes.set(
    "/channel/:channelId/songbook/:songBookId/song/select",
    SongListAdd
  );
  routes.set(
    "/channel/:channelId/songbook/:songBookId/song/:songId",
    VerseSelect
  );
  routes.set("/songbook/:songBookId/song/:songId/edit", SongEdit);
  routes.set("/songbook/:songBookId/song/add", SongEdit);
  routes.set("/songbook/add", SongBookListAdd);
  routes.set("/setlist/:setListId", SetList);
  routes.set("/channel/:channelId/songbook/select", SongBookListAdd);
  routes.set("/channel/:channelId/setlist/:setlistId", SetList);
  routes.set("/channel/list", ChannelList);
  routes.set("/channel/list/add", ChannelListAdd);
  routes.set("/channel/:channelId/manage", ChannelManage);
  routes.set("/poster", Poster);
  routes.set("/pdf", Pdf);
  routes.set("/go/:place", Go);

  routes.set(/^\/(v|c|s)$/, Go);
  routes.set("*", Home);
</script>

<style>
  :global(html, body) {
    padding: 0;
    margin: 0;
    font-family: Inter, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    --main-font: Inter, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif,
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    --header-color: #0037b8;
    --text1: #0037b8;
    --text2: #333333;
    --white: #fff;
    --radius-md: 10px;
    --line: #d8d8d8;
    --focus: #00bce7;
    --card-bg-2: #f2f6ff;
  }
</style>

<Modal>
  <Router {routes} />
</Modal>

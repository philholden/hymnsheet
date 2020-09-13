<script>
  import { getUrlData } from "./util";
  import { location, querystring, push, pop } from "svelte-spa-router";
  export let params = {};
  const { place } = params;
  push(`/displaysong/:`);
  let play;
  const pause = new Promise(resolve => (play = resolve));
  const data = getUrlData();

  async function addControllerChannel() {
    console.log("addControllerChannel", data);
    await pause;
    push("/channel/1/manage");
  }

  async function addViewerChannel() {
    console.log("addViewerChannel", data);
    await pause;
    push("/displaysong");
  }

  async function addSongBook() {
    console.log("addSongBook", data);
    await pause;
    push("/songbook/1/song/list/add");
  }

  switch ($location) {
    case "/c":
      addControllerChannel();
      break;
    case "/v":
      addViewerChannel();
      break;
    case "/s":
      addSongBook();
      break;
  }
</script>



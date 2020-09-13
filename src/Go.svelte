<script>
  import { getUrlData } from "./util";
  import { location, querystring, push, pop } from "svelte-spa-router";
  import { addChannel, setChannel } from "./store/channelDb";
  import {
    getIpfs,
    pass,
    getPeerId,
    setIpnsJson,
    getIpnsJson
  } from "./store/ipfs";
  window.getIpnsJson = getIpnsJson;
  export let params = {};
  const { place } = params;
  let play;
  const pause = new Promise(resolve => (play = resolve));
  const data = getUrlData();

  async function addControllerChannel() {
    console.log("addControllerChannel", data);
    //await pause;
    push("/channel/1/manage");
  }

  async function addViewerChannel() {
    console.log("addViewerChannel", data);
    // on no looks like pub sub not working
    // const channel = await addChannel(data.v);

    // we should really look this up and update it from ipns
    await setChannel(data.v, {
      id: data.v,
      displayName: data.d,
      allowAll: data.a,
      allowList: data.l,
      ipns: data.i
    });
    //await pause;
    push("/displaysong/" + data.v);
  }

  async function addSongBook() {
    console.log("addSongBook", data);
    //await pause;
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

<div>Go {place} {$location} {$querystring}</div>
<pre>{JSON.stringify(data, null, 2)}</pre>
<button on:click={play}>Play</button>

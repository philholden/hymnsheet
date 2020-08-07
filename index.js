import App from "./App.svelte";
import { getIpfs } from "./store/ipfs";
import URLON from "urlon";
window.URLON = URLON;

const app = new App({
  target: document.body,
});

export default app;

async function init() {
  const ipfs = await getIpfs();
  window.ipfs = ipfs;
  ipfs.pubsub.subscribe("jjoojjo", console.log);
}

init();

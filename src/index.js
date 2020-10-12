import App from "./App.svelte";
import { getIpfs } from "./store/ipfs";
import { onCloudTime } from "./store/cloudTime";

const app = new App({
  target: document.getElementById("root"),
});

export default app;

async function init() {
  const ipfs = await getIpfs();
  window.ipfs = ipfs;
}

if (
  location.protocol !== "https:" &&
  !/^(localhost)|(127.0.0.1)/.test(location.host)
) {
  location.replace(
    `https:${location.href.substring(location.protocol.length)}`
  );
}

// init();

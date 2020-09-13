import { readable } from "svelte/store";

export const message = readable(null, (set) => {
  //setTimeout(() => set({ page: 2 }), 1000);
  function receiveMessage(event) {
    set(event.data);
  }

  window.addEventListener("message", receiveMessage, false);
  return () => window.removeEventListener("message", receiveMessage);
});

export function ready() {
  window.opener && window.opener.postMessage("ready", "*");
}

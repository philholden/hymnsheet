<script>
  import { onMount } from "svelte";
  import Icon from "./Icon.svelte";
  import { push } from "svelte-spa-router";
  import BlackButton from "./BlackButton.svelte";
  import ShareModal from "./ShareModal";
  import { overscan } from "../store";
  let show = false;
  let timeout;
  let showShare = false;
  let count = 0;
  export let shareUrl;
  export let shareTitle;
  export let shareText;
  export let backUrl;
  export let backTitle;

  function hide() {
    clearTimeout(timeout);
    show = false;
  }

  function doShow() {
    clearTimeout(timeout);
    show = true;
    timeout = setTimeout(hide, 3000);
  }

  onMount(() => {
    document.addEventListener("mousemove", doShow);

    return () => {
      document.removeEventListener("mousemove", doShow);
    };
  });
</script>

<style>
  .outer {
    overflow: hidden;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .inner {
    display: grid;
    grid-auto-flow: column;
    justify-items: center;
    background: linear-gradient(rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 100%);
    color: white;
    height: 100%;
    width: 100%;
    position: absolute;
    transition: transform 0.3s;
    transform: translate3d(0, 50px, 0);
  }

  .show {
    transform: translate3d(0, 0, 0);
  }
</style>


<div class="outer">
<div class="inner" class:show>
<slot />
</div>
</div>
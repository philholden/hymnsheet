<script>
  import { getCloudTime } from "./store/cloudTime";
  import { onDestroy } from "svelte";
  let time = 0;
  let ref;
  function setTime() {
    time = getCloudTime();
    ref = requestAnimationFrame(setTime);
  }
  setTime();
  onDestroy(() => cancelAnimationFrame(ref));
</script>

<pre>{time}</pre>

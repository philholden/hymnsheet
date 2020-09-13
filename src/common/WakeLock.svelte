<script>
  import { onMount } from "svelte";
  let wakeLock;
  const requestWakeLock = async () => {
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      wakeLock.addEventListener("release", () => {
        console.log("Screen Wake Lock was released");
      });
      console.log("Screen Wake Lock is active");
    } catch (err) {
      console.error(`${err.name}, ${err.message}`);
    }
  };

  onMount(async () => {
    if (!navigator.wakeLock) return;
    await requestWakeLock();
    if (!wakeLock) return;
    return wakeLock.release;
  });
</script>
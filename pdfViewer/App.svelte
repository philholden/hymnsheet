<script>
  import PdfPage from "./PdfPage.svelte";
  import { message, ready } from "./messageStore";
  import { onMount } from "svelte";
  onMount(ready);
  // let blank;
  // let display;
  // let page;
  // let src;
</script>

<PdfPage {...$message} />

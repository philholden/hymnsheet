<script>
  import { PdfPage } from "@omysoul/svelte-pdf-viewer";
  let numPages;
</script>

<PdfPage
  src="https://bafybeidnotxavgm435p3hi24vgjgvlr3svwxymog265yzhpa7pxqb6jwde.ipfs.infura-ipfs.io/"
  page={1}
  style="width: 512px;height:200px; position: relative;"
  bind:numPages />

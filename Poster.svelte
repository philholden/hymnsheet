<script>
  import { pop } from "svelte-spa-router";
  import { getUrlData } from "./util";
  import { Title, Qr, Button, ShareModal } from "./common";
  
  const data = getUrlData();
  console.log(data);
  export let title = data.title || "Sing with us!";
  export let text = data.text || "To see live lyrics visit:";
  export let text2 = data.text2 || "And scan this QR code";
  export let site = data.site || "hymnsheet.io";
  export let more = data.more || "(Need help? Just ask)";
  export let url = data.url || "hymnsheet.io";
  export let showModal = false;
</script>
<style>
  .outer {
    display: grid;
    align-content: center;
    justify-content: center;
    justify-items: center;
  }

  .title {
    margin-top: 0.7em;
    font-size: 10vmin;
    text-align: center;
    font-weight: bold;
  }

  .site {
    font-size: 10vmin;
    text-align: center;
    font-weight: bold;
    margin: 0.1em 0 0.3em;
  }

  .text {
    font-size: 5vmin;
    text-align: center;
  }

  .more {
    font-family: var(--main-font);
    font-size: 4vmin;
    text-align: center;
  }
  .print {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
    padding-bottom: 16px;
  }

  .squash {
      display: grid;
      position: relative;
      max-width: 70%;
      justify-items: center;
    }

  @media only screen and (min-width: 640px) {
    .squash {
      max-width: 100%;
    }
  }


  @media print {
    .print {
      display: none;
    }
  }
</style>
<ShareModal url={url} bind:show={showModal} title="Share controller access" />
<div class="outer">
  <Title><div class="title">{title}</div></Title>
  <div class="squash">
  <Qr url={url} style="width: 90%; max-width: 90%;padding: 25px 0 20px" size={500} />
  </div>

  <div class="text">{text}</div>
  <div class="site">{site}</div>
  <div class="text">{text2}</div>
  
  <pre class="more">{more}</pre>
  <div class="print">
    <Button iconLeft="print" on:click={() => window.print()}>Print</Button>
    <Button iconLeft="share" on:click={() => showModal=true}>Share poster</Button>
  </div>
  <div class="print">
    <Button invisible iconLeft="chevronLeft" on:click={pop}>Back</Button><Button invisible  href="/">Home</Button>
  </div>
</div>
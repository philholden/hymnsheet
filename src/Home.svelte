<script>
  import {
    LinkButton,
    BottomBar,
    ButtonGroup,
    ButtonContent,
    Header,
    Welcome,
    Sock,
    QrReaderModal,
    Ghost
  } from "./common";
  import { canUseWebP } from "./util";
  import { fade } from "svelte/transition";
  let notwebp = !canUseWebP();
  let showModal = false;
  if (window.registration && window.registration.update)
    window.registration.update();
</script>

<style>
  .hero {
    color: var(--white);
    height: 156px;
    text-align: center;
    display: grid;
    align-items: center;
    grid-template-rows: 2.5fr 2fr 1fr 1fr;
  }
  .logo {
    font-size: 25px;
  }

  .page {
    background-color: #25294f;
    /* background-image: url(public/hills.webp); */
    background-repeat: no-repeat;
    background-position: 60% 50%;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
  }

  .page.notwebp {
    /* background-image: url(public/hills.jpg); */
  }
  .tagline {
    font-size: 18px;
  }
</style>

<Ghost />
<div
  transition:fade={{ duration: 300 }}
  class="page"
  class:notwebp
  style={`background-image: ${notwebp ? 'url(hills.jpg)' : 'url(hills.webp)'}`}>
  <QrReaderModal bind:show={showModal} />
  <Header />
  <Sock>
    <div class="hero">
      <div />
      <div class="logo">
        <Welcome />
      </div>
      <div class="tagline">What do you want to do?</div>
      <div />
    </div>
    <ButtonGroup>
      <ButtonContent href="/channel/list" icon="groupadd" title="Join channel">
        Join an event by scanning QR code or from your channel history.
      </ButtonContent>
      <ButtonContent
        href="/channel/list/add"
        icon="remote"
        title="Channel control">
        Create channels and broadcast lyrics.
      </ButtonContent>
      <ButtonContent href="/songbook/add" icon="songbook" title="Song book">
        Create and edit song books.
      </ButtonContent>
      <ButtonContent
        href="/"
        on:click={e => {
          showModal = true;
          e.preventDefault();
        }}
        icon="qrScanner"
        title="Qr scanner (shortcut)">
        Join a channel, add song books or become lyrics controller.
      </ButtonContent>
    </ButtonGroup>
    <div style="height: 18px" />
  </Sock>
</div>

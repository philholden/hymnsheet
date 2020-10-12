<script>
  import { Button, ButtonGroup } from "../common/";
  import { getLiveChannel, channelDb } from "../store/liveChannel";
  import { findPlayingAudio } from "../util";
  export let item;
  export let channelId;

  let el;
  const liveChannel = getLiveChannel(channelId);

  function playAudio(id) {
    [...el.querySelectorAll(`[data-audio-group="${id}"]`)].forEach(el =>
      el.play()
    );
  }

  function pauseAudio(id) {
    [...el.querySelectorAll(`[data-audio-group="${id}"]`)].forEach(el =>
      el.pause()
    );
  }

  function stopAudio(id) {
    [...el.querySelectorAll(`[data-audio-group="${id}"]`)].forEach(el => {
      el.pause();
      el.currentTime = 0;
    });
  }

  function playAudioAll(value) {
    value.forEach(({ src }) => {
      let audio = findPlayingAudio(src);
      let offset = audio;
      if (audio) {
        offset = audio.currentTime;
      }
      liveChannel.pubAudio({
        src,
        command: "play",
        offset
      });
    });
  }

  function pauseAudioAll(value) {
    value.forEach(({ src }) => {
      liveChannel.pubAudio({
        src,
        command: "pause"
      });
    });
  }

  function stopAudioAll(value) {
    value.forEach(({ src }) => {
      liveChannel.pubAudio({
        src,
        command: "stop"
      });
    });
  }
</script>

<style>
  .audio-outer {
    display: grid;
    gap: 12px;
    padding: 0 24px;
  }
</style>

<div class="audio-outer" bind:this={el}>
  {#each item.value as audio, index}
    <audio
      preload="auto"
      src={audio.src}
      controls
      style="display: block;"
      data-audio-group={item.id} />
  {/each}
  Local
  <ButtonGroup horizontal>
    <Button type="button" on:click={() => playAudio(item.id)}>Play</Button>
    <Button type="button" on:click={() => pauseAudio(item.id)}>Pause</Button>
    <Button type="button" on:click={() => stopAudio(item.id)}>Stop</Button>
  </ButtonGroup>
  Everyone
  <ButtonGroup horizontal>
    <Button type="button" on:click={() => playAudioAll(item.value)}>
      Play
    </Button>
    <Button type="button" on:click={() => pauseAudioAll(item.value)}>
      Pause
    </Button>
    <Button type="button" on:click={() => stopAudioAll(item.value)}>
      Stop
    </Button>
  </ButtonGroup>
</div>

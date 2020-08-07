<script>
  import { Icon } from "./common";
  const icons = [
    "add",
    "back",
    "blank",
    "cancel",
    "channel",
    "channel2",
    "chevronLeft",
    "chevronRight",
    "close",
    "colors",
    "copy",
    "delete",
    "edit",
    "error",
    "fullScreen",
    "fullScreenExit",
    "group",
    "groupadd",
    "live",
    "live2",
    "login",
    "margin",
    "menu",
    "music",
    "overscan",
    "print",
    "qr",
    "qrScanner",
    "refresh",
    "remote",
    "search",
    "share",
    "songbook",
    "songbook2",
    "supervisor",
    "verse",
    "wholeSong",
    "world"
  ];
</script>
<style>
  .outer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: red;
  }
</style>

<div class="outer">
  {#each icons as icon}
  <div class="icon"><Icon name={icon} /></div><div class="text">{icon}</div>
  {/each}
</div>

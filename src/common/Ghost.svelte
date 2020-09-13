<script>
  export let url = "home.jpg";
  export let opacity = 0;
</script>

<style>
  .ghost {
    background-repeat: no-repeat;
    min-height: 667px;
    position: absolute;
    min-width: 375px;
    pointer-events: none;
  }
</style>

<div
  class="ghost"
  style={`background-image: url(${url}); opacity: ${opacity};`} />

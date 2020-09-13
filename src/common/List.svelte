<script>
  export let style;
</script>

<style>
  div {
    display: grid;
    border-top: 1px solid var(--line);
  }
</style>

<div style={style}><slot/></div>
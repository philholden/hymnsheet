<script>
  export let title;
  export let onSave;
  export let onCancel;
  export let value = [];
  let src;
</script>

<form
  on:submit={e => {
    e.preventDefault();
    if (typeof onSave === 'function') onSave({ type: 'speakerAudio', value });
  }}
  style="display: grid; gap: 5px; grid-auto-flow: row;">
  <h2>{title}</h2>
  {#each value as item, index}
    <div>
      {item.src}
      <button
        type="button"
        on:click={() => (value = value.filter((x, i) => i !== index))}>
        X
      </button>
    </div>
  {/each}
  url:
  <input bind:value={src} />
  <button type="button" on:click={() => (value = [...value, { src }])}>
    Add track
  </button>
  <div style="display: grid; gap: 5px; grid-auto-flow: column;">
    <button type="submit">Save</button>
    <button type="button" on:click={onCancel}>Cancel</button>
  </div>

</form>

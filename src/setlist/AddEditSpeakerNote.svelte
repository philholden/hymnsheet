<script>
  export let title;
  export let onSave;
  export let onCancel;
  export let value;
</script>

<form
  on:submit={e => {
    e.preventDefault();
    if (typeof onSave === 'function') onSave({
        type: 'note',
        value: { text: value }
      });
  }}
  style="display: grid; gap: 5px; grid-auto-flow: row;">
  <h2>{title}</h2>
  <textarea bind:value />
  <div style="display: grid; gap: 5px; grid-auto-flow: column;">
    <button type="submit">Save</button>
    <button type="button" on:click={onCancel}>Cancel</button>
  </div>

</form>

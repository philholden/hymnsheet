<script>
  export let title;
  export let onSave;
  export let onCancel;
  export let value;
  let error;
  let numPages;
  let items;
  import { getDocument, PdfThumbnail } from "@omysoul/svelte-pdf-viewer";

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const doc = await getDocument(value);
      numPages = doc.numPages;
      items = [];
      for (let i = 0; i < numPages; i++) {
        items.push({
          type: "pdf",
          src: value,
          page: i + 1
        });
      }
      onSave(items);
    } catch (err) {
      error = err.message;
    }
    //if (typeof onSave === 'function') onSave({
    //    type: 'pdfSlideShow',
    //    value: { src: value }
    //  });
  }
</script>

<style>
  .thumbs {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
</style>

<form
  on:submit={onSubmit}
  style="display: grid; gap: 5px; grid-auto-flow: row;">
  <h2>{title}</h2>
  PDF url:
  <input bind:value />
  {numPages}
  {#if error}
    <div class:error>{error}</div>
  {/if}
  <!-- {#if items}
    <div class="thumbs">
      {#each items as item, i}
        <PdfThumbnail src={item.src} page={item.page} />

      {/each}
    </div>
  {/if} -->
  <div style="display: grid; gap: 5px; grid-auto-flow: column;">
    <button type="submit">Save</button>
    <button type="button" on:click={onCancel}>Cancel</button>
  </div>

</form>

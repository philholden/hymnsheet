<script>
  import AddItem from "./setlist/AddItem";
  import {
    Store,
    set,
    get,
    del,
    clear,
    getStore,
    getSetlistDisplayName,
    ipfsExportSetlist
  } from "./store/storeDb";
  import PlayAudio from "./setlist/PlayAudio.svelte";
  import PlaySpeakerNote from "./setlist/PlaySpeakerNote.svelte";
  import PlayQuote from "./setlist/PlayQuote.svelte";
  import PlaySong from "./setlist/PlaySong.svelte";
  import PlayPdf from "./setlist/PlayPdf.svelte";
  import SetlistItem from "./setlist/SetlistItem.svelte";
  import {
    Header,
    Title,
    TitleRow,
    Button,
    ButtonGroup,
    ListItem,
    List,
    BottomBar,
    EmptyState,
    SearchInput,
    Sock,
    ShareModal,
    TitleEditable
  } from "./common";
  export let params = {};
  let selected = 0;

  const db = new Store(params.setlistId, params.setlistId);
  let value = "";
  let list;
  let el;
  let displayName = "";
  let shareUrl = "";
  let showModal;
  let onSave;
  init();
  async function init() {
    list = await getStore("list", db, []);
    displayName = await getSetlistDisplayName(params.setlistId);
  }

  function getDisplayName() {
    const db = new Store("setlist", "setlist");
    get("list", db);
  }

  function add() {
    $list.push(value);
    set("list", $list, db);
  }
  // function addItem(e) {
  //   set("list", [...$list, e.detail], db);
  // }

  function addItems(e) {
    let { index, items } = e.detail;
    //console.log(index, items);
    if (index === undefined) index = $list.length;
    set(
      "list",
      [...$list.slice(0, index), ...items, ...$list.slice(index)],
      db
    );
  }

  function removeItem(e) {
    const { index } = e.detail;
    set("list", $list.filter((x, i) => i !== index), db);
  }

  function onSelect(e) {
    selected = e.detail;
  }

  function onMove(e) {
    console.log("onMove", e);

    let { index, value } = e.detail;
    if (!$list || index === -1 || index === $list.length) return;
    const item = $list[index];
    let items = $list.filter((x, i) => i !== index);
    index = index + value;
    set("list", [...items.slice(0, index), item, ...items.slice(index)], db);
  }

  async function onOpenModal() {
    shareUrl = "ipfs:addSetlist:" + (await ipfsExportSetlist(params.setlistId));
    showModal = true;
  }

  async function saveDisplayName(displayName) {
    console.log(displayName, "dis");
    const db = new Store("setlist", "setlist");
    let list = await get("list", db);
    list = list.map(x =>
      x.id === params.setlistId ? { id: x.id, displayName } : x
    );
    set("list", list, db);
  }
</script>

<style>
  .outer {
    max-width: 640px;
    margin: 0 auto;
  }
</style>

<ShareModal
  url={shareUrl}
  bind:show={showModal}
  title="Share copy of setlist" />
<Header />
<div bind:this={el} class="outer">
  <Sock>
    <TitleRow>
      <TitleEditable
        value={displayName}
        editable={true}
        onSave={saveDisplayName} />

      <!-- <Button
      invisible
      iconLeft="delete"
      on:click={() => {
        songBooks.delete(params.songBookId);
        push(backLink);
      }}>
      Delete
    </Button> -->
    </TitleRow>
  </Sock>
  {#if $list !== undefined}
    {#each $list as item, index (item.id)}
      <AddItem
        {index}
        on:add={addItems}
        on:remove={removeItem}
        on:move={onMove} />
      <SetlistItem
        {item}
        {index}
        selected={selected === item.id}
        channelId={params.channelId}
        on:add={addItems}
        on:select={onSelect} />

      <!-- <div class="item">
        {#if item.type === 'quote'}
          <PlayQuote
            {item}
            channelId={params.channelId}
            on:select={onSelect}
            selected={selected === item.id} />
        {:else if item.type === 'note'}
          <PlaySpeakerNote {item} />
        {:else if item.type === 'speakerAudio'}
          <PlayAudio {item} channelId={params.channelId} />
        {:else if item.type === 'song'}
          <PlaySong
            {item}
            on:select={onSelect}
            channelId={params.channelId}
            selected={selected === item.id} />
        {:else if item.type === 'pdf'}
          <PlayPdf
            {item}
            on:select={onSelect}
            channelId={params.channelId}
            selected={selected === item.id} />
        {:else}
          <pre>{JSON.stringify(item, null, 2)}</pre>
        {/if}
        <div
          class="action"
          on:click={() => removeIndex(index)}
          style="float: right">
          Delete
        </div>
        <div
          class="action"
          on:click={() => removeIndex(index)}
          style="float: right">
          Down
        </div>
        <div
          class="action"
          on:click={() => removeIndex(index)}
          style="float: right">
          Up
        </div>
        <div
          class="action"
          on:click={() => removeIndex(index)}
          style="float: right">
          Add
        </div>
      </div>
      <hr /> -->
      <!-- <AddItem on:add={addItem} index /> -->
    {/each}
  {/if}
  <!-- <pre>{JSON.stringify($list, null, 2)}</pre> -->
  <AddItem
    index={($list && $list.length) || 0}
    on:add={addItems}
    on:remove={removeItem}
    on:move={onMove}
    last={true} />
  <button on:click={() => set('list', [], db)}>Clear</button>

</div>
<BottomBar>
  <!-- <Button invisible iconLeft="chevronLeft" href={backLink}>{backText}</Button> -->
  <Button invisible iconLeft="share" on:click={onOpenModal}>
    Share setlist
  </Button>
</BottomBar>

<script>
  import {
    Header,
    Title,
    Button,
    LinkButton,
    ListItem,
    List,
    BottomBar,
    ButtonGroup,
    ButtonContent,
    Welcome,
    EmptyState,
    SearchInput,
    Sock,
    Ghost,
    TitleRow
  } from "./common";
  import { push } from "svelte-spa-router";
  import { grow } from "./util";
  import { songBooks } from "./store/songBook";

  const addSong = /add$/.test(window.location.hash);
  let author;
  let title;
  let id;
  let lyrics;
  export let params = {};
  let backLink = `/songbook/${params.songBookId}/song/list/add`;
  let value;
  let onDelete = () => {};
  async function init() {
    if (addSong) return;
    const songBook = await songBooks.getSongStore(params.songBookId);
    console.log(songBook);
    const song = await songBook.find(params.songId);
    console.log(params.songId, song);
    title = song.title;
    lyrics = song.lyrics;
    author = song.author;
    onDelete = () => {
      songBook.delete(params.songId);
      push(backLink);
    };
  }
  async function save() {
    const songBook = await songBooks.getSongStore(params.songBookId);
    if (addSong) {
      console.log("add song", { title, author, lyrics });
      await songBook.add({ title, author, lyrics });
    } else {
      await songBook.edit({
        id: params.songId,
        title,
        author,
        lyrics
      });
    }
    push(backLink);
  }
  init();
</script>

<style>
  .form {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }
  label {
    font-family: var(--main-font);
    font-size: 18px;
    position: relative;
    top: 4px;
  }

  @media only screen and (min-width: 640px) {
    .form {
      grid-gap: 16px;
      grid-template-columns: min-content 1fr;
    }

    label {
      top: 8px;
    }
  }

  input {
    border-radius: 4px;
    padding: 12px 16px;
    border: 1px solid var(--line);
    font-size: 18px;
    box-sizing: border-box;
    color: var(--text2);
  }
  textarea {
    border-radius: 4px;
    padding: 12px 16px;
    margin: 0;
    overflow-x: auto;
    border: 1px solid var(--line);
    white-space: nowrap;
    width: 100%;
    color: var(--text2);
    font-family: var(--main-font);
    font-size: 18px;
    box-sizing: border-box;
    resize: none;
    min-height: 200px;
  }
</style>

<Header />
<Sock>
  <TitleRow>
    <Title>{addSong ? 'Add' : 'Edit'} song</Title>
    {#if !addSong}
      <Button invisible iconLeft="delete" on:click={onDelete}>Delete</Button>
    {/if}

  </TitleRow>
  <div class="form">
    <label>Title</label>
    <input bind:value={title} />
    <label>Author</label>
    <input bind:value={author} />
    <label>Lyrics</label>
    <textarea use:grow={lyrics} bind:value={lyrics} />

  </div>
  <div style="height: 18px" />
</Sock>
<BottomBar>
  <!-- <Button invisible iconLeft="chevronLeft" on:click={() => push("/songbook/:songBookId/song/list/add")}>Back</Button> -->
  <Button type="button" invisible iconLeft="chevronLeft" href={backLink}>
    Back
  </Button>

  <Button on:click={save}>Save</Button>
</BottomBar>

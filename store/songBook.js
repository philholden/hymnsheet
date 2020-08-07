import { Store, set, get, del, clear } from "idb-keyval";
import { getIpfs, pass, getPeerId } from "./ipfs";
import { nanoid } from "nanoid";
import { writable } from "svelte/store";
window.clearBooks = clear();

const _onMsg = {};

const db = new Store("song-books-hs", "song-books-hs");

export const songBooks = writable([]);
init();

const sortBy = key => (a, b) =>
  a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;

async function init() {
  songBooks.set(await listSongBooks());
}

async function notifySongBooks(next) {
  songBooks.set(next || (await listSongBooks()));
}

async function listSongBooks() {
  return (await get("index", db)) || [];
}

async function deleteSongBook(id) {
  const books = await listSongBooks();
  const next = books.filter(x => x.id !== id);
  await set("index", next, db);
  await del(id, db);
  notifySongBooks(next);
}

export async function renameSongBook(id, displayName) {
  const books = await listSongBooks();
  for (let book of books) {
    if (book.id === id) book.displayName = displayName;
  }
  await set("index", books, db);
  notifySongBooks(books);
}

export async function addSongBook(displayName, _id) {
  //const ipfs = await getIpfs();
  const id = _id || nanoid();
  // const { id: ipns } = await ipfs.key.gen(id, {
  //   type: "rsa",
  //   size: 2048
  // }); // name
  // const pem = await ipfs.key.export(id, pass);
  let books = await listSongBooks();
  //books.push({ id, displayName, pem, ipns });
  books = books.filter(x => x.id !== id);
  books.push({ id, displayName });
  books.sort(sortBy("displayName"));
  await set("index", books, db);
  await set(id, [], db);
  notifySongBooks();
  return id;
}

async function findSongBook(value, key = "id") {
  const books = await listSongBooks();
  console.log(books, value);
  return books.find(book => book[key] === value);
}

export async function ipnsShareSongBook(songBookId) {
  const book = await findSongBook(songBookId);
  // list keys
  // if key does not exist import from pem
  // get song book
  // add meta from songbooks list
  // json encode
  // encrypt with a key generated from hash of private key
  const ipfs = await getIpfs();
  const { path } = await ipfs.add(value);
  const { name, value } = await ipfs.name.publish(`${path}`, { key: "self" });
  return name;
}

export async function ipfsExportSongBook(songBookId) {
  const ipfs = await getIpfs();
  const { displayName } = await findSongBook(songBookId);
  const songs = await get(songBookId, db);
  console.log({ id: songBookId, displayName, songs });
  return (await ipfs.add(
    JSON.stringify({ id: songBookId, displayName, songs })
  )).path;
}
export async function ipfsImportSongBook(path, callback = () => {}) {
  const ipfs = await getIpfs();
  const stream = ipfs.cat(path);

  let data = "";

  for await (const chunk of stream) {
    // chunks of data are returned as a Buffer, convert it back to a string
    data += chunk.toString();
  }

  const _data = JSON.parse(data);
  await addSongBook(_data.displayName, _data.id);
  await set(_data.id, _data.songs, db);
  notifySongBooks();
  callback(_data.id);
  return _data.id;
}
/** 
export async function pubShareSongBook(songBookId) {
  const ipfs = await getIpfs();

  if (!_onMsg[songBookId]) {
    _onMsg[songBookId] = async msg => {
      const peerId = await getPeerId();
      console.log("msg");
      if (peerId === msg.from) return;
      // const data = JSON.parse(msg.data.toString());
      const { displayName } = await findSongBook(songBookId);
      const songs = await get(songBookId, db);
      console.log("snd", displayName, songs);
      ipfs.pubsub.publish(songBookId, JSON.stringify({ displayName, songs }));
      console.log("sent book");
      unpubShareSongBook(songBookId);
    };
  }
  console.log("subscribe share");
  ipfs.pubsub.subscribe(songBookId, _onMsg[songBookId]);
}

async function onSongBook(msg) {
  // alert(1);
  const peerId = await getPeerId();
  if (peerId === msg.from) return;
  //  alert(2);
  const data = JSON.parse(msg.data.toString());

  // alert(JSON.stringify(data, null, 2));
  const songBookId = await addSongBook(data.displayName);

  unpubGetSongBook(songBookId);
  alert(songBookId);

  await set(songBookId, data.songs, db);
  notifySongBooks();
}

let _subGetSongBook;

export async function pubGetSongBook(songBookId) {
  const ipfs = await getIpfs();
  if (!_subGetSongBook) {
    _subGetSongBook = await ipfs.pubsub.subscribe(songBookId, onSongBook);
  }
  //  alert(1);
  setTimeout(() => {
    ipfs.pubsub.publish(songBookId, "getbook");
    //   alert(2);
  }, 500);
  setTimeout(() => {
    ipfs.pubsub.publish(songBookId, "getbook");
    //   alert(2);
  }, 1000);
  setTimeout(() => {
    ipfs.pubsub.publish(songBookId, "getbook");
    //   alert(2);
  }, 2000);
}

export async function unpubShareSongBook(songBookId) {
  console.log("unsubscribe share");
  const ipfs = await getIpfs();
  const onMsg = _onMsg[songBookId];
  ipfs.pubsub.unsubscribe(songBookId, onMsg);
}

export async function unpubGetSongBook(songBookId) {
  console.log("unsubscribe");
  const ipfs = await getIpfs();
  ipfs.pubsub.unsubscribe(songBookId, onSongBook);
  _subGetSongBook = undefined;
}
*/
Object.assign(songBooks, {
  list: listSongBooks,
  add: addSongBook,
  delete: deleteSongBook,
  rename: renameSongBook,
  ipns: ipnsShareSongBook,
  ipnsShare: ipnsShareSongBook,
  find: findSongBook,
  getSongStore
});

async function getSongStore(songBookId) {
  const songBook = writable(await getSongBook());

  function notify(songs) {
    songBook.set(songs);
  }

  async function getSongBook() {
    return await get(songBookId, db);
  }

  async function editSong(song) {
    let songs = await getSongBook();
    songs = songs.filter(x => x.id !== song.id);
    songs.push(song);
    songs.sort(sortBy("title"));
    await set(songBookId, songs, db);
    notify(songs);
  }

  async function addSong(song) {
    song.id = nanoid();
    let songs = await getSongBook();
    songs.push(song);
    songs.sort(sortBy("title"));
    await set(songBookId, songs, db);
    notify(songs);
  }

  async function deleteSong(songId) {
    let songs = await getSongBook(songBookId);
    songs = songs.filter(x => x.id !== songId);
    console.log(songs);
    await set(songBookId, songs, db);
    notify(songs);
  }

  async function find(value, key = "id") {
    let songs = await getSongBook(songBookId);
    return songs.find(song => song[key] === value);
  }

  async function clear() {
    let id = nanoid();
    let songs = [];
    await set(id, songs, db);
    notify(songs);
  }

  Object.assign(songBook, {
    add: addSong,
    delete: deleteSong,
    edit: editSong,
    find,
    clear
  });
  return songBook;
}

// async function getSongBook(songBookId) {
//   return await get(songBookId, db);
// }

// async function editSong(songBookId,song) {
//   let songs = await getSongBook();
//   songs = songs.filter(x => x.id !== song.id);
//   songs.push(song);
//   songs.sort(sortBy("title"));
//   await set(songBookId, songs, db);
//   notify(songs);
// }

// async function addSong(songBookId,song) {
//   song.id = nanoid();
//   let songs = await getSongBook();
//   songs.push(song);
//   songs.sort(sortBy("title"));
//   await set(songBookId, songs, db);
//   notify(songs);
// }

// async function deleteSong(songBookId,songId) {
//   let id = nanoid();
//   let songs = await getSongBook(songBookId);
//   songs = songs.filter(x => x.id !== songId);
//   await set(id, songs, db);
//   notify(songs);
// }

// async function clearSongBook(songBookId) {
//   let songs = [];
//   await set(songBookId, songs, db);
//   notify(songs);
// }

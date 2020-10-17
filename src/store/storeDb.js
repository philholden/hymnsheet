//import { Store, set, get, del, clear } from "idb-keyval";
import * as idb from "idb-keyval";
import { writable } from "svelte/store";
import { getIpfs } from "./ipfs";

let cache = {};
let stores = {};

export const Store = idb.Store;
export async function get(...args) {
  const [key, db] = args;
  const _key = await getKey(key, db);
  if (cache[_key] !== undefined) return cache[_key];
  return await idb.get(...args);
}

export async function set(...args) {
  const [key, value, db] = args;
  const _key = await getKey(key, db);
  cache[_key] = value;
  (await getStore(key, db)).set(value);
  await idb.set(...args);
}

export async function del(...args) {
  const [key, db] = args;
  const _key = await getKey(key, db);
  delete cache[_key];
  delete stores[_key];
  await idb.del(...args);
}

export async function clear(...args) {
  cache = {};
  stores = {};
  await idb.clear(...args);
}

export async function getStore(key, db, init = null) {
  const _key = await getKey(key, db);
  console.log("get", _key, db);
  if (stores[_key]) return stores[_key];
  stores[_key] = writable(init);
  await get(key, db)
    .then((val) => {
      if (val !== undefined) stores[_key].set(val);
    })
    .catch(() => {
      console.log("problem");
    });
  return stores[_key];
}

async function getKey(key, db) {
  await db._dbp;
  return `${db.storeName}/${key}`;
}

export async function getSetlistDisplayName(setlistId) {
  const db = new Store("setlist", "setlist");
  const list = await get("list", db);
  if (!list) return;
  const item = list.find((item) => item.id === setlistId);
  if (!item) return;
  return item.displayName;
}

export async function ipfsExportSetlist(setlistId) {
  const db = new Store("setlist", "setlist");
  const list = await get("list", db);
  if (!list) return;
  const item = list.find((item) => item.id === setlistId);
  const db2 = new Store(setlistId, setlistId);
  const setlist = await get("list", db2);
  const ipfs = await getIpfs();
  return (
    await ipfs.add(
      JSON.stringify({ id: setlistId, displayName: item.displayName, setlist })
    )
  ).path;
}

export async function ipfsImportSetlist(path, callback = () => {}) {
  const ipfs = await getIpfs();
  const stream = ipfs.cat(path);

  let data = "";

  for await (const chunk of stream) {
    // chunks of data are returned as a Buffer, convert it back to a string
    data += chunk.toString();
  }

  const _data = JSON.parse(data);
  let db = new Store("setlist", "setlist");
  let list = (await get("list", db)) || [];
  let index = list.findIndex((x) => x.id === _data.id);
  let item = { id: _data.id, displayName: _data.displayName };
  if (index === -1) {
    list = [...list, item];
  } else {
    list = list.map((x) => (x.id === _data.id ? item : x));
  }
  let p1 = set("list", list, db);
  db2 = new Store(_data.setlistId, _data.setlistId);
  list = (await get("list", db)) || [];
  let p2 = set("list", list, db);
  await Promise.all([p1, p2]);
  return _data.id;
}

//import { Store, set, get, del, clear } from "idb-keyval";
import * as idb from "idb-keyval";
import { writable } from "svelte/store";

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

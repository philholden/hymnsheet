// channel has an IPNS name
// that is used as the PubSub topic
// the published record contains
// list of controller ids
// or free for all
// it could also contain info about next event contact etc
import { Store, set, get, del, clear } from "idb-keyval";
import { getIpfs, pass, getPeerId, setIpnsJson, getIpnsJson } from "./ipfs";
import { nanoid } from "nanoid";
import { writable } from "svelte/store";
import { setUrlData } from "../util";

const db = new Store("channels-hs", "channels-hs");
window.clearChannels = () => clear(db);

export const channels = writable([]);
export const keys = writable([]);

const sortBy = key => (a, b) =>
  a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;

async function listChannels() {
  return (await get("channels", db)) || [];
}

export async function getFilterControl(channel) {
  const peerId = await getPeerId();
  return channel => channel.allowAll || channel.allowList.includes(peerId);
}

async function listKeys() {
  return (await get("keys", db)) || [];
}

export async function hasKey(channelId) {
  const ipfs = await getIpfs();
  const key = await ipfs.key.list().find(x => x.name === channelId);
  if (key.name === channelId) return true;
  const keys = await listKeys();
  const dbKey = keys.find(x => x.channelId === channelId);
  if (!dbKey) return false;
  await ipfs.key.import(dbKey.channelId, dbKey.pem);
  return true;
}

async function restoreKeys() {
  const ipfs = await getIpfs();
  const keys = await listKeys();
  const active = await ipfs.key.list().map(x => x.name);
  keys.forEach(key => {
    if (!active.includes(key.channelId))
      ipfs.key.import(key.channelId, key.pem);
  });
}

async function addKey(channelId) {
  const ipfs = await getIpfs();
  const keys = await listKeys();
  if (keys.map(x => x.channelId).includes(channelId)) return;
  const { id: ipns } = await ipfs.key.gen(channelId, {
    type: "rsa",
    size: 2048
  });
  const pem = await ipfs.key.export(channelId, pass);

  keys.push({ channelId, pem });
  await set("keys", keys, db);
  notifyKeys(keys);
  return ipns;
}

async function deleteKey(channelId) {
  const ipfs = await getIpfs();
  const keys = await listKeys();

  const next = keys.filter(x => x.channelId !== channelId);
  // await ipfs.key.rm(channelId);
  await set("keys", next, db);
  notifyKeys(next);
}

export async function createChannel(
  displayName
  // allowAll = true,
  // allowList = []
) {
  const id = nanoid();
  const ipns = await addKey(id);
  const channels = await listChannels();
  const allowAll = true;
  const allowList = [await getPeerId()];
  channels.push({ id, displayName, allowList, allowAll, ipns });
  channels.sort(sortBy("displayName"));
  await set("channels", channels, db);
  await setIpnsJson(id, { id, displayName, allowList, allowAll, ipns });
  window.getIpnsJson = getIpnsJson;
  console.log(await getIpnsJson(ipns), "getback");
  notifyChannels();
  return id;
}

export async function addChannel(ipns) {
  const channels = await listChannels();
  let channel = channels.find(x => x.ipns === ipns);
  if (channel) return channel;
  channel = await getIpnsJson(ipns);

  channels.push(channel);
  channels.sort(sortBy("displayName"));
  await set("channels", channels, db);
  notifyChannels();
  return channel;
}

export async function deleteChannel(channelId) {
  console.log("delete", channelId);
  const channels = await listChannels();
  const next = channels.filter(x => x.id !== channelId);
  await set("channels", next, db);
  notifyChannels(next);
  await deleteKey(channelId);
}

// used after ipns update
export async function setChannel(channelId, next) {
  const channels = await listChannels();
  //channels.map(channel => (channelId === channel.id ? next : channel));

  const _channels = channels.filter(x => channelId !== x.id);
  _channels.push(next);
  _channels.sort(sortBy("displayName"));
  await set("channels", _channels, db);
  notifyChannels(_channels);
}

export async function updateChannel(channelId, update) {
  const channels = await listChannels();
  //channels.map(channel => (channelId === channel.id ? next : channel));

  const _channels = channels.map(x => (channelId === x.id ? update(x) : x));
  _channels.sort(sortBy("displayName"));
  await set("channels", _channels, db);
  notifyChannels(_channels);
}

export async function getChannel(channelId) {
  const channels = await listChannels();
  console.log("channels", channels);
  return channels.find(channel => channelId === channel.id);
}

export async function getChannelUrl(channelId) {
  const channel = await getChannel(channelId);
  console.log(channel, "channnn", channelId);
  return (
    window.location.origin +
    window.location.pathname +
    "#/v?" +
    setUrlData({
      // really should be ipns name
      v: channelId,
      d: channel.displayName,
      a: channel.allowAll,
      l: channel.allowList,
      i: channel.ipns
    })
  );
}

export async function isAdmin(channelId) {
  const ipfs = await getIpfs();
  const keys = await ipfs.key.list();
  return keys.find(x => x.name === channelId);
}

async function notifyChannels(_channels) {
  channels.set(_channels || (await listChannels()));
}

async function notifyKeys(_keys) {
  keys.set(_keys || (await listKeys()));
}

Object.assign(channels, {
  create: createChannel,
  getFilterControl,
  get: getChannel,
  delete: deleteChannel
});

notifyChannels();
notifyKeys();

import { getIpfs, getIpnsJson, setIpnsJson, getPeerId } from "./ipfs";
import { setChannel, getChannel, hasKey } from "./channelDb";
import { updateQueue } from "./updateQueue";
import { writable } from "svelte/store";

const _fibonacci = [800, 1300, 2100, 3400, 5500, 8900, 14400, 23300, 37700];

export function getChannelStore(channelId, placeholder) {
  let initTime = performance.now();
  let _allowList = [];
  let _allowAll = true;
  const _updateQueue = updateQueue();
  const timeouts = {};
  const metaStore = writable({});
  const valueStore = writable(placeholder);

  async function start() {
    pubSub("major", onMajor);
    pubSub("minor", onMinor);
    pubSub("init", onInit);
    pubSub("ipns", onIpns);
    join();
  }

  function getId() {
    return channelId;
  }

  async function join() {
    const fibonacci = [..._fibonacci];
    const ping = () =>
      (timeouts.join = setTimeout(publishJoin, fibonacci.shift()));
    async function publishJoin() {
      console.log("send join");
      pub("join", { head: { peerId: await getPeerId() } });
      if (fibonacci.length) ping();
    }
    ping();
  }

  const onMajor = on(async ({ majorCount, body }, { from }) => {
    console.log("onMajor", majorCount, body, from);
    _updateQueue.addMajor({
      majorPeerId: from,
      minorCount: 0,
      majorCount,
      body
    });
    // can init so stop listening
    pubUnsub("init", onInit);
    // other client sent major they can handle joins
    pubUnsub("join", onJoin);
    // stop sending join reqs
    clearTimeout(timeouts.join);
    notifyValue();
  }, true);

  const onMinor = on(
    async ({ majorCount, minorCount, majorPeerId, body }, { from }) => {
      console.log("onMinor", majorCount, body, from);
      _updateQueue.addMinor({
        majorPeerId,
        minorPeerId: from,
        majorCount,
        minorCount,
        body
      });
      pubUnsub("join", onJoin);
      notifyValue();
    },
    true
  );

  const onInit = on(async ({ majorCount, majorPeerId, body }) => {
    console.log("onInit", majorCount, body);
    _updateQueue.addMajor({
      majorPeerId,
      majorCount,
      body
    });
    pubUnsub("init", onInit);
    console.log("init");
    notifyValue();
  }, true);

  async function onIpns() {
    const content = await getIpnsJson(channelId);
    setChannel(channelId, content);
    metaStore.set(content);
  }

  const onJoin = on(async data => {
    if (performance.now() - initTime > 1000) {
      pubInit();
    } else {
      clearTimeout(timeouts.init);
      timeouts.init = setTimeout(pubInit, 1000);
    }
  }, true);

  async function pubInit() {
    console.log("init");
    const data = getLatest();
    if (!data) return;
    clearTimeout(timeouts.init);
    initTime = performance.now();
    pub("init", data);
  }

  async function pubMajor(body) {
    console.log("pubMajor", body);
    // stop sending join reqs
    clearTimeout(timeouts.join);
    const majorPeerId = await getPeerId();
    const latest = getLatest();
    const majorCount = body.first ? 0 : latest ? latest.majorCount + 1 : 0;
    pub("major", { body, majorCount: majorCount, minorCount: 0 });
    _updateQueue.addMajor({ majorCount, minorCount: 0, majorPeerId, body });
    pubSub("join", onJoin);
    pubUnsub("init", onInit);
    notifyValue();
  }

  async function pubMinor(body) {
    console.log("pubMinor", body);
    const minorPeerId = await getPeerId();
    let latest = getLatest();
    console.log("late", latest);
    if (!latest) return;
    const next = {
      body,
      majorPeerId: latest.majorPeerId,
      minorPeerId,
      majorCount: latest.majorCount,
      minorCount: latest.minorCount + 1
    };
    pub("minor", next);
    _updateQueue.addMinor(next);
    pubSub("join", onJoin);
    notifyValue();
  }

  async function updateIpnsContent(channelId, update) {
    if (!hasKey(channelId)) {
      console.log(`Can't update ipns no pk for ${channelId}`);
      return;
    }
    const channel = await getChannel(channelId);
    const content = await getIpnsJson(channel.ipns);
    const next = update(content);
    await setIpnsJson(channelId, next);
    pub("ipns", {});
  }

  function destroy() {
    Object.values(timeouts).forEach(timeout => clearTimeout);
    pubUnsub("major", onMajor);
    pubUnsub("minor", onMinor);
    pubUnsub("init", onInit);
    pubUnsub("join", onJoin);
    pubUnsub("ipns", onIpns);
  }

  // utils
  async function pubSub(path, cb) {
    const ipfs = await getIpfs();
    console.log("listening", `${channelId}-${path}`);
    ipfs.pubsub.subscribe(`${channelId}-${path}`, cb);
  }

  async function pubUnsub(path, cb) {
    const ipfs = await getIpfs();
    ipfs.pubsub.unsubscribe(`${channelId}-${path}`, cb);
  }

  async function pub(path, data) {
    console.log("publish", `${channelId}-${path}`, data);
    const ipfs = await getIpfs();
    ipfs.pubsub.publish(
      `${channelId}-${path}`,
      Buffer.from(JSON.stringify(data))
    );
  }

  function on(fn, dropMe) {
    return async msg => {
      const peerId = await getPeerId();
      const data = JSON.parse(msg.data.toString());
      const fromSelf = peerId === msg.from;
      if (fromSelf && dropMe) return;
      fn(data, { fromSelf, peerId, from: msg.from });
    };
  }

  function notifyValue() {
    let latest = getLatest();
    if (!latest) return;
    valueStore.set(latest.body);
  }
  function getLatest() {
    return _updateQueue.getLatest(_allowAll, _allowList);
  }

  start();

  return {
    start,
    getId,
    pubMajor,
    pubMinor,
    updateIpnsContent,
    destroy,
    valueStore,
    metaStore
  };
}

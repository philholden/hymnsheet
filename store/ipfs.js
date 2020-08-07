import IPFS from "ipfs";
export const pass = "some non-empty string over 20chars long";
let _ipfs;

export async function getIpfs() {
  if (!_ipfs) {
    _ipfs = IPFS.create({
      EXPERIMENTAL: {
        pubsub: true
        //        ipnsPubsub: true
      },
      pass,
      repo: "ipfs-" + Math.random(),
      config: {
        Addresses: {
          Swarm: [
            // "/ip4/127.0.0.1/tcp/4002/p2p/QmWCfY2M8Nqj4wE8epzh5daUVes2AWXHyAskRDR3NpFxr1",
            // "/ip4/127.0.0.1/tcp/5002/http",
            "/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star/"
            //  "/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star/"
          ]
        }
      }
    });
  }
  return await _ipfs;
}

export async function getIpfsContent(hash) {
  const ipfs = await getIpfs();
  const _hash = hash.replace("/ipfs/", "");
  const stream = ipfs.cat(_hash.replace("/ipfs/", ""));
  let data = "";

  for await (const chunk of stream) {
    data += chunk.toString();
  }
  return data;
}

export async function getIpnsJson(ipns) {
  const ipfs = await getIpfs();
  //ipfs.pubsub.subscribe('ipns')
  let _hash;
  for await (const hash of ipfs.name.resolve(ipns)) {
    _hash = hash;
    // /ipfs/QmQrX8hka2BtNHa8N8arAq16TCVx5qHcb46c5yPewRycLm
  }
  const content = await getIpfsContent(_hash);
  return JSON.parse(content);
}

// key name channelId
export async function setIpnsJson(keyName, content) {
  const ipfs = await getIpfs();
  const { path } = await ipfs.add(JSON.stringify(content));
  const { name } = await ipfs.name.publish(`${path}`, { key: keyName });
  return name;
}

export async function getPeerId() {
  const ipfs = await getIpfs();
  const owner = await ipfs.id();
  return owner.id;
}

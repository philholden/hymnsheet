import { getChannelStore } from "./channelStore";

let _channels = [];

export function getLiveChannel(channelId) {
  let channel = _channels.find(x => x.getId() === channelId);
  if (channel) return channel;
  channel = getChannelStore(channelId);
  _channels.push(channel);
  return channel;
}

// export async function getLiveChannelByIpns(ipns) {
//   let channel = _channels.find(x => x.getIpns() === ipns);
//   if (channel) return channel;

//   channel = getChannelStore(channelId);
//   _channels.push(channel);
// }

export function removeLiveChannel(channelId) {
  let channel = _channels.find(x => x.getId() === channelId);
  if (!channel);
  channel.destroy();
  _channels = _channels.filter(x => x.getId() !== channelId);
}

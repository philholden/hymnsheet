import URLON from "urlon";

export function canUseWebP() {
  var elem = document.createElement("canvas");

  if (!!(elem.getContext && elem.getContext("2d"))) {
    // was able or not to get WebP representation
    return elem.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }

  // very old browser like IE 8, canvas not supported
  return false;
}

export const googlish = (
  query,
  wholeWords = false,
  caseSensitive = false,
  transform
) => {
  const inquotes = /(["'])(\\\1|.)*?\1/g;
  const words = /[^\s"']+/g;
  const quoted = query.match(inquotes) || [];
  const rest = query.replace(inquotes, "").match(words) || [];
  const trim = (s) => s.substr(1, s.length - 2);
  const dequoted = quoted.map(trim);
  const cs = caseSensitive ? "" : "i";
  const wb = wholeWords ? "\\b" : "";
  const toRegExp = (word) => new RegExp(wb + word + wb, cs);
  const regExps = [...dequoted, ...rest].map(toRegExp);
  return (text) => {
    let i = 0;
    while (
      regExps[i] &&
      regExps[i].test(typeof transform === "function" ? transform(text) : text)
    )
      i++;
    return i === regExps.length;
  };
};

export function getUrlData() {
  try {
    return URLON.parse(window.location.hash.replace(/.*?\?/, ""));
  } catch {
    return {};
  }
}

export function setUrlData(obj) {
  return URLON.stringify(obj);
}

export function grow(node, value) {
  function update(value) {
    if (node.scrollHeight !== node.clientHeight) {
      node.style.height = node.scrollHeight + 2 + "px";
    }
  }

  node.addEventListener("focus", update);

  return {
    update,
    destroy: () => {
      node.removeEventListener("focus", update);
    },
  };
}

export function findPlayingAudio(src) {
  const aud = document.querySelectorAll("audio.audio");
  const audios = aud ? Array.from(aud) : [];
  return audios.find((x) => {
    return x.src === src;
  });
}

export const oLordMyGod = `title: How great Thou art
author: Carl Boberg

O Lord my God, when I in awesome wonder
Consider all the works Thy Hand hath made,
I see the stars, I hear the mighty thunder,
Thy pow'r throughout the universe displayed,

Then sings my soul, My Saviour God, to Thee,
How great Thou art! How great Thou art!
Then sings my soul, my Saviour God, to Thee,
How great Thou art! How great Thou art!

When through the woods and forest glades I wander
I hear the birds sing sweetly in the trees,
When I look down from lofty mountain grandeur
And hear the brook and feel the gentle breeze,

When Christ shall come, with shouts of acclamation,
And take me home, what joy shall fill my heart.
Then I shall bow, in humble adoration, 
And then proclaim: "My God, how great Thou art!`;

//https://github.com/hperrin/svelte-material-ui/blob/273ded17c978ece3dd87f32a58dd9839e5c61325/components/forwardEvents.js

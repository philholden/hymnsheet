export function decodeSong(text) {
  const out = {};
  let tags = ["author", "title", "id"];
  let _text = text.replace(/\r/g, "");

  function extractTag(tag) {
    let tagEx = new RegExp("^" + tag + ":\\s*(.*)$", "m");
    let tagDel = new RegExp("^" + tag + ":\\s*(.*)[\n]?", "m");
    let val = text.match(tagEx);
    val = (val && val[1] && val[1].trim()) || null;
    if (val !== null) {
      out[tag] = val;
    }
    _text = _text.replace(tagDel, "");
  }

  tags.forEach(extractTag);
  out.lyrics = _text.trim();
  return out;
}

export function encodeSong(song) {
  const keys = ["title", "author"];
  let text = "";
  for (let key of keys) {
    if (song[key]) text += `${key}: ${song[key]}\n`;
  }
  if (text && song.lyrics) text += "\n";
  if (song.lyrics) text += song.lyrics;
  return text;
}

export function getVerses(text) {
  let verses;
  verses = text.trim().split("\n\n");
  verses = verses.map(verse => ({
    lines: verse.split("\n")
  }));

  verses = verses.filter(
    verse => !(verse.lines.length === 1 && verse.lines[0] === "")
  );

  return verses;
}

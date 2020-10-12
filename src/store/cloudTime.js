let rows = [];
let delta = 0;
let rtt = 1000;

init();

function add(item) {
  rows.push(item);
  const a = Math.max(...rows.map((x) => x[0]));
  const b = Math.min(...rows.map((x) => x[1]));
  const stampNormal = Math.min(...rows.map((x) => x[1]));
  rtt = b - a;
  delta = stampNormal - rtt / 2;

  console.log(`rtt: ${rtt}; delta: ${delta}; stampNormal: ${stampNormal}`);
}

async function init() {
  for (let i = 0; i < 5000; i += 500) {
    setTimeout(async () => add(await date()), i);
  }
}
//jolly-fog-1742
//odd-mouse-6ea3
//https://jolly-fog-1742.hymnsheet.workers.dev/
async function date() {
  const start = Date.now();
  const res = await fetch("https://time.hymnsheet.io/");
  const serverStamp = 1 * (await res.text());
  console.log(Date.now(), serverStamp);
  const end = Date.now();
  const length = end - start;
  const stampNormal = serverStamp * 1 - start;
  const range = [
    stampNormal - length,
    stampNormal,
    stampNormal - (stampNormal - length),
    //   () => now + stampNormal - length / 2
  ];
  return range;
}

export async function onCloudTime(callback, time) {
  if (rtt >= 120) return;
  //time undefined
  //add delta to date now get servertime
  const offset = time - (delta + Date.now());
  console.log("calc", time, delta, Date.now());
  console.log("offset", offset);
  setTimeout(callback, offset);
}

export function getCloudTime() {
  return Date.now() + delta;
}

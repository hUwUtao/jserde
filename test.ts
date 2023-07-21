import {
  Deserialization,
  build,
  decu8,
  extract_scalar,
  extract_str,
  makeFixed,
  toui8a,
} from "./index";

console.time();
console.time("str");
// example data lol
const built_bin = [
  // funny
  false,
  // min
  ...makeFixed(extract_scalar(32), 6),
  // msg
  ...extract_str("Hello World!"),
  // max
  ...makeFixed(extract_scalar(255), 8),
  // date
  ...makeFixed(extract_scalar(Date.now()), 42),
];
const built = build(built_bin); // fill end
console.timeEnd("str");
console.time("ser");
const de = decu8(built),
  btoaed = btoa(de).replaceAll("=", "");
console.timeEnd("ser");
console.time("de");
const se = toui8a(de);
console.timeEnd("de");
console.log(built, JSON.stringify(de), btoaed);
console.log(se, JSON.stringify(atob(btoaed)));

const reader = new Deserialization(se);
const funny = reader.b(),
  min = reader.u(6),
  msg = reader.s(12),
  max = reader.u(8),
  date = reader.u(42);
console.log(funny, min, msg, max, date);

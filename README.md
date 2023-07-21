# jserde - Bit-level serialization written in typescript

## Use

Should take a look at `test.ts`!

Another `JWT` replacement?

## Known limitations

Currently: 
- You can't store negative, floats, just unsigned int

## Detailed use

- Serialization

```ts
import {
  Deserialization,
  build,
  decu8,
  extract_scalar,
  extract_str,
  makeFixed,
  toui8a,
} from "jserde";

// example data lol
const data = [
  false, // Boolean can be passed directly
  ...makeFixed(extract_scalar(32), 6),
  ...extract_str("Hello World!"), // Remember your string length?
  ...makeFixed(extract_str("no bye"), 16/* Max string length*/ * 8)
  ...makeFixed(extract_scalar(255), 8),
  ...makeFixed(extract_scalar(Date.now()), 42),
];

const uint8array = build(data), // build into utf-8 data
  decodedui8 = decu8(uint8array)
```

- Deserialization

```ts
const reader = new Deserialization(se);
const funny = reader.b(),
  // read unsigned
  min = reader.u(6),
  // read string
  msg = reader.s(12),
  msgf = reader.s(16),
  max = reader.u(8),
  date = reader.u(42);
```

## Strategies

- Variable length string

```ts
const words = "You know the rules, and so do I";
[
    ...makeFixed(extract_scalar(words.length), 24), // parse into 24bit string
    ...extract_str(words) // and read it
]
```

```ts
const reader = new Deserialization(ui8a);
const str = reader.s(reader.u(24));
```

...and more, if you smart enough

## Benchmark???

I found this interesting. 

```
bun's result:
[1.39ms] str
[0.18ms] ser
[0.05ms] de
```

```
node's result:
str: 0.452ms
ser: 0.179ms
de: 0.007ms
```

```
and browser's
str: 0.3330078125 ms
ser: 0.0732421875 ms
de: 0.004150390625 ms
```

so it must be `extract_*`'s fault, maybe?

haha, enjoy!

## 

This project was created using `bun init` in bun v0.6.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

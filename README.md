# jserde - Bit-level serialization written in typescript

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v0.6.14. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Use

Should take a look at `test.ts`!

Another `JWT` replacement?

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


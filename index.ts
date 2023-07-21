export type Serdeable = number | boolean | string;
type bit = boolean;
type byte = number;

function filno(s: number) {
  return Array(s).fill(false);
}

export function build(b: bit[]) {
  const f = [...b, ...filno(8 - (b.length % 8))];
  const buf = [];
  for (let i = 0; i < b.length; i += 8) {
    buf.push(compact_u(f.slice(i, i + 8)));
  }
  return Uint8Array.from(buf);
}

// Again, zero foolproof
export function makeFixed(bit: bit[], size: number) {
  // console.timeLog()
  return [...filno(size - bit.length), ...bit];
}

/**
 * should work well with u8 (is this scalable?)
 * @param b any number
 * @returns bit
 */
export function extract_scalar(b: number): bit[] {
  return b
    .toString(2)
    .split("")
    .map((s) => Boolean(s.charCodeAt(0) - 48));
}

export function extract_u8a(u8a: Uint8Array, pad = 0): bit[] {
  return u8a.reduce((ba: boolean[], b: byte) => {
    const s = extract_scalar(b);
    return [...ba, ...(pad ? makeFixed(s, pad) : s)];
  }, []);
}

export function toui8a(str: string) {
  return Uint8Array.from(str.split("").map((x) => x.charCodeAt(0)));
}

export function decu8(ui: Uint8Array) {
  return [...ui].map((v) => String.fromCharCode(v)).join("");
}

export function extract_str(str: string): bit[] {
  return extract_u8a(toui8a(str), 8);
}

export function compact_u(b: bit[]) {
  return parseInt(
    b
      .map((b) =>
        String.fromCharCode(
          //@ts-ignore bithacks
          b + 48
        )
      )
      .join(""),
    2
  );
}

export class Deserialization {
  private src: bit[];
  private cursor = 0;
  readonly buf: Serdeable[] = [];
  constructor(src: Uint8Array) {
    this.src = extract_u8a(src, 8);
  }
  // zero foolproof haha
  private read(size: number) {
    return this.src.slice(this.cursor, (this.cursor += size));
  }
  // This likely won't work because parseint always read positive. Yay
  // i() {
  //   return compact_u(this.read(32));
  // }
  /**
   * Read from fixed size bit array
   * @param size size of unsigned
   */
  u(size: number) {
    return compact_u(this.read(size));
  }
  s(size: number) {
    return decu8(build(this.read(size * 8)));
  }
  b() {
    return this.read(1)[0];
  }
}

// export class DeserializationToArray {}

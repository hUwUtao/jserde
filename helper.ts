import {
  Deserialization,
  extract_scalar,
  extract_str,
  makeFixed,
  build as i_build,
  toui8a as en8,
  decu8 as de8,
} from "./index";

type bit = boolean;
type size = number;

const { pow } = Math;

function thrower(data: any, type: string) {
  throw Error(`${JSON.stringify(data)} won't fit ${type}`);
}

export function u(s: size, d: number): bit[] {
  if (d > pow(2, s)) thrower(d, "unsigned int");
  return makeFixed(extract_scalar(d), s);
}

/**
 * Build variable string. Optimized for long to very long string
 * @param str Data
 * @param fit "Counter" value datatype
 * @returns
 */
export function vstr(str: string, fit: size = 32) {
  if (str.length * 8 > pow(2, fit))
    thrower(str, "varchar with unsigned " + fit + " counter");
  return [...u(fit, str.length), ...extract_str(str)];
}

/**
 *
 * @param reader pass initialized `Deserialization`
 * @param fit "Counter" value datatype (must match with serializor)
 * @returns the string
 */
export function rvstr(reader: Deserialization, fit: size) {
  return reader.s(reader.u(fit));
}

export function build(...i: (bit | bit[])[]) {
  return i_build(
    // @ts-ignore typefyck
    i.reduce((l: bit[], b) => [...l, ...(typeof b == "boolean" ? [b] : b)], []),
  );
}

export { en8, de8 };

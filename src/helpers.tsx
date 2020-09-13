import { Tone } from "./types";

export const merge = (
    A: Tone[],
    B: Tone,
  ) => {
    const C = A.map((e) => {
      return e.uid === B.uid ? {...e, ...B} : e;
    });
    return C;
};
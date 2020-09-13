export type Tone = {freq: number, label: string, uid: string};
export interface ToneGenerator {
    tones?: Tone[]
  }
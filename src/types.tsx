export type Tone = {
    freq: number,
    oscillator: OscillatorNode,
    gain: GainNode,
    isPlaying: Boolean,
    label: string,
    uid: string,
};
export interface ToneGenerator {
    tones?: Tone[]
  }
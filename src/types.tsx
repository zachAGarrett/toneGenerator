export type Tone = {
    freq: any,
    oscillator: OscillatorNode,
    gain: GainNode,
    isPlaying: Boolean,
    label: string,
    uid: string,
};
export interface ToneGenerator {
    tones?: Tone[]
  }
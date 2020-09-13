import cuid from 'cuid';
import React, { useEffect } from 'react';
import './App.css';
import Controller from './components/controller';
import { merge } from './helpers';
import { Tone } from './types';
// Helper functions
interface ToneGenerator {
  tones?: Tone[]
}
const App: React.FC<ToneGenerator> = (props) => {
  // audio context
  const audioCtx = new (window.AudioContext)(),
  // state
  [tones, alter] = React.useState(props.tones),
  [isPlaying, togglePlay] = React.useState(false),
  [options, updateOptions] = React.useState({volume: 1, mute: !isPlaying}),
  // actions
  addTone = () => {
    const state = tones ? tones : [],
    tone = {
      freq: 500,
      oscillator: audioCtx.createOscillator(),
      gain: audioCtx.createGain(),
      isPlaying: false,
      label: `tone ${tones ? tones.length : 0}`,
      uid: cuid(),
    },
    toMerge = [...state, tone];
    tone.oscillator.connect(tone.gain);
    tone.gain.connect(audioCtx.destination);
    tone.oscillator.start();
    return alter(toMerge);
  },
  removeTone = (uid: string) => {
    if (tones) {
      const toRemove = tones.findIndex(tone => tone.uid === uid);
      tones[toRemove].oscillator.stop();
      const removed = tones.filter((tone) => tone.uid !== uid);
      return alter(removed);
    }
    return;
  },
  // render tone controllers
  render = (toneArray: typeof props.tones) => {
    return (toneArray?.map((el) => (
      <Controller
        key={el.uid}
        uid={el.uid}
        freq={el.freq}
        oscillator={el.oscillator}
        gain={el.gain}
        isPlaying={el.isPlaying}
        label={el.label}
        dismiss={(uid) => removeTone(uid)}
        updateFreq={(newFreq, node, gain, isPlaying, label, uid) => {
          const tone: Tone = {
            freq: newFreq,
            oscillator: node,
            gain: gain,
            isPlaying: isPlaying,
            label: label,
            uid: uid,
          };
          if (tones) {
            const toUpdate = tones.findIndex(tone => tone.uid === uid);
            tones[toUpdate].oscillator.frequency.value = newFreq;
            return alter(merge(tones, tone));
          }
          return alter([tone]);
      }}/>
    )));
  };
  // update
  // useEffect(() => )
  return (
    <div className="App">
      <div className="render">{render(tones) || 'Add a tone'}</div>
      <button className="add" onClick={() => addTone()}>Add a tone</button>
      <button className="isPlaying" onClick={() => togglePlay(!isPlaying)}>{isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
}

export default App;

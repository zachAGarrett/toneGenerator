import cuid from 'cuid';
import React, { useEffect } from 'react';
import './App.css';
import { colors } from './components/colors';
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
    [currToneUID, updateCurrentUID] = React.useState(''),
    // action
    addTone = () => {
      const state = tones ? tones : [],
        tone = {
          freq: 500,
          oscillator: audioCtx.createOscillator(),
          gain: audioCtx.createGain(),
          isPlaying: false,
          label: `Tone ${tones ? tones.length + 1 : 1}`,
          uid: cuid(),
        },
        toMerge = [...state, tone];
      tone.oscillator.connect(tone.gain);
      tone.gain.connect(audioCtx.destination);
      tone.gain.gain.setValueAtTime(0, audioCtx.currentTime);
      tone.oscillator.frequency.value = tone.freq;
      tone.oscillator.start();
      return alter(toMerge);
    },
    removeTone = (uid: string) => {
      if (tones) {
        const toRemove = tones.findIndex(tone => tone.uid === uid);
        tones[toRemove].isPlaying && tones[toRemove].oscillator.stop();
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
          updateTone={(tone) => {
            updateCurrentUID(tone.uid)
            if (tones) {
              return alter(merge(tones, tone));
            }
            return alter([tone]);
          }} />
      )));
    };
  // update
  useEffect(() => {
    if (tones && currToneUID) {
      try {
        const toUpdate = tones.findIndex((el) => el.uid === currToneUID),
          currTone = tones[toUpdate];
        currTone.oscillator.frequency.value = currTone.freq;
        currTone.isPlaying
          ? currTone.gain.gain.setValueAtTime(1, audioCtx.currentTime)
          : currTone.gain.gain.setValueAtTime(0, audioCtx.currentTime);
      } catch (error) {
        console.log(error)
      }
    }
  }, [tones])
  return (
    <div className="App">
      <div className="Render">{render(tones) || 'Add a tone'}</div>
      <button className="Add" onClick={() => addTone()}>Add a tone</button>
    </div>
  );
}

export default App;

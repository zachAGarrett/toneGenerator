import cuid from 'cuid';
import React from 'react';
import './App.css';
import Controller from './components/controller';
import { merge } from './helpers';
import { Tone } from './types';
// Helper functions
interface ToneGenerator {
  tones?: Tone[]
}
const App: React.FC<ToneGenerator> = (props) => {
  const [tones, alter] = React.useState(props.tones),
  [count, counter] = React.useState(0),
  addTone = () => {
    const state = tones ? tones : [],
    tone = {freq: 500, label: `tone ${count}`, uid: cuid()},
    toMerge = [...state, tone];
    alter(toMerge);
    console.log(toMerge);
    return counter(count + 1);
  },
  removeTone = (uid: string) => {
    if (tones) {
      const removed = tones.filter(tone => tone.uid !== uid);
      console.log(removed);      
      return alter(removed);
    }
    return;
  },
  render = (toneArray: typeof props.tones) => {
    return (toneArray?.map(el => (
      <Controller
        key={el.uid}
        uid={el.uid}
        freq={el.freq}
        label={el.label}
        dismiss={(uid) => removeTone(uid)}
        updateFreq={(newFreq, label, uid) => {
          const tone: Tone = {freq: newFreq, label: label, uid: uid};
          if (tones) {
            return alter(merge(tones, tone));
          }
          return alter([tone]);
      }}/>
    )));
  };
  return (
    <div className="App">
      <div className="render">{render(tones) || 'Add a tone'}</div>
      <button className="add" onClick={() => addTone()}>Add a tone</button>
    </div>
  );
}

export default App;

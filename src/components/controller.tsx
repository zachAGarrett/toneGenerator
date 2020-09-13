import React, { useEffect } from 'react';
import { Tone } from '../types';
interface Controller extends Tone {
    dismiss: (uid: string) => void;
    updateTone: (arg0: Tone) => void;
  }
const Controller: React.FC<Controller> = (props) => {
    const initialState: Tone = {
        freq: props.freq,
        oscillator: props.oscillator,
        gain: props.gain,
        isPlaying: props.isPlaying,
        label: props.label,
        uid: props.uid,
    },
    [values, updateValues] = React.useState(initialState),
    onTriggerUpdate = (payload: {}) => {
        const merged = {...values, ...payload};
        console.log(props.uid, merged)
        props.updateTone(merged);
        return updateValues(merged);
    };
    return (
      <div className="ToneController">
        <div className="HeaderRow">
          <h1 className="Label">{props.label}</h1>
          <button className="HeaderButton" onClick={() => props.dismiss(props.uid)}>X</button>
        </div>
        <div className="FreqDisplay">
          <div>{props.freq}</div>
          <input
            type="number"
            value={props.freq}
            onChange={(e) => onTriggerUpdate({freq: e.target.value})}
            placeholder={props.freq.toString() || 'Enter a frequency'}>
          </input>
        </div>
        <button className="IsPlaying" onClick={() => onTriggerUpdate({isPlaying: !values.isPlaying})}>{values.isPlaying ? 'Pause' : 'Play'}</button>
      </div>
    )
  }
export default Controller;
import React from 'react';
import { Tone } from '../types';
interface Controller extends Tone {
    dismiss: (uid: string) => void;
    updateFreq: (
        freq: any,
        oscillator: OscillatorNode,
        gain: GainNode,
        isPlaying: Boolean,
        label: string,
        uid: string,
        ) => void;
  }
const Controller: React.FC<Controller> = (props) => {
    return (
      <div className="toneController">
        <div className="headerRow">
          <h1 className="label">{props.label}</h1>
          <button className="headerButton" onClick={() => props.dismiss(props.uid)}>X</button>
        </div>
        <div className="freqDisplay">
            <div>{props.freq}</div>
          <input
            type="number"
            value={props.freq}
            onChange={(e) => {
                props.updateFreq(
                    e.target.value,
                    props.oscillator,
                    props.gain,
                    props.isPlaying,
                    props.label,
                    props.uid,
                )
            }}
            placeholder={props.freq.toString() || 'Enter a frequency'}>
          </input>
        </div>
      </div>
    )
  }
export default Controller;
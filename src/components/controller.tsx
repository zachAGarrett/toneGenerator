import React from 'react';
import { Tone } from '../types';
interface Controller extends Tone {
    dismiss: (uid: string) => void;
    updateFreq: (freq: number, label: string, uid: string) => void;
  }
const Controller: React.FC<Controller> = (props) => {
    return (
      <div className="toneController">
        <div className="headerRow">
          <h1 className="label">{props.label}</h1>
          <button className="headerButton" onClick={() => props.dismiss(props.uid)}>X</button>
        </div>
        <div className="freqDisplay">
          <input type="number"
            pattern="[0-9]*"
            onInput={(e) => props.updateFreq(1, props.label, props.uid)}
            placeholder={props.freq.toString() || 'Enter a frequency'}>
          </input>
        </div>
      </div>
    )
  }
export default Controller;
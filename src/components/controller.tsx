import React, { useEffect } from 'react';
import { DeleteTwoTone, PauseCircleTwoTone, PlayCircleTwoTone } from '@ant-design/icons';
import { Tone } from '../types';
import { colors, sizes } from './colors';
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
      const merged = { ...values, ...payload };
      console.log(props.uid, values)
      console.log(props.uid, merged)
      updateValues(merged);
    },
    handleController = props.updateTone;
  useEffect(() => {
    console.log(values)
    return handleController(values);
  }, [values])
  return (
    <div className="ToneController" style={{ backgroundColor: colors.themeOne.lightGrey }}>
      <div className="InputRow" style={{ height: sizes.root }}>
        <div style={{ height: sizes.child }}>
          <input value={props.label}
            onChange={(e) => onTriggerUpdate({ label: e.target.value })}
            placeholder={props.label} />
        </div>
        <div style={{ height: sizes.child }}
          onClick={() => props.dismiss(props.uid)}>
          <DeleteTwoTone
            style={{ fontSize: sizes.grandchild }}
            twoToneColor={colors.themeOne.utilityRed} />
        </div>
      </div>
      <div className="FreqDisplay"
        style={{ minHeight: sizes.root }}>
        <div className="InputRow">
          <div style={{ height: sizes.child }}>
            <input type="number"
              value={props.freq}
              onChange={(e) => onTriggerUpdate({ freq: e.target.value })}
              placeholder={props.freq.toString() || 'Enter a frequency'}>
            </input>
          </div>
          <div>Hz</div>
        </div>
      </div>
      <div className="ButtonRow"
        style={{ height: sizes.root }}
        onClick={() => onTriggerUpdate({ isPlaying: !values.isPlaying })}>
        {
          values.isPlaying
            ? <PauseCircleTwoTone style={{ fontSize: sizes.child }} twoToneColor={colors.themeOne.utilityBlue} />
            : <PlayCircleTwoTone style={{ fontSize: sizes.child }} twoToneColor={colors.themeOne.utilityBlue} />
        }
      </div>
    </div>
  )
}
export default Controller;
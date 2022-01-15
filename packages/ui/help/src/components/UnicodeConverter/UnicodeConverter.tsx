import React, { useState } from 'react';
import './UnicodeConverter.scss';
import { TextEncoder } from 'util';
import type { UnicodeConverterProps } from './UnicodeConverter.d';
import type { HigherOrderConverterProps } from '../BaseConverter';
// eslint-disable-next-line import/prefer-default-export
export const UnicodeConverter = (props: UnicodeConverterProps) => {
  const {
    byteLength, state, setState, isReadOnly,
  } = props;
  if (typeof byteLength !== 'number') throw Error('byteLength must be a number');
  else if (byteLength < 0) throw Error('byteLength must be positive');

  // Convert state to an array of bytes
  const parseValue = (value: number) => {
    const values: number[] = [];
    let workValue = value;
    for (let i = 0; i < byteLength; i += 1) {
      const local = workValue % 256;
      values.unshift(local);
      workValue = (workValue - local) / 256;
    }
    return String.fromCharCode(...values);
  };

  // Keep track of the string without clobbering global state
  const [localState, setLocalState] = useState(parseValue(state));

  // If localState is bad, reset to known-good external state
  const resetValue = () => { setLocalState(parseValue(state)); };

  // Call when wanting to commit `localState` to global `state`
  const onValidate = () => {
    // If string is empty, set to 0.
    if (localState.length === 0) {
      setLocalState(parseValue(0));
      setState(0);
    }

    const encoder = new TextEncoder();
    const bytes = encoder.encode(localState);

    let accumulator = 0n;

    if (bytes.length > byteLength) return resetValue();
    bytes.forEach((e) => { accumulator = accumulator * 256n + BigInt(e); });

    const downCasted = BigInt.asUintN(8 * byteLength, accumulator);
    // Don't accept value if it doesn't fit in byteLength bytes.
    if (downCasted !== accumulator) return resetValue();
    // Don't accept change if value isn't exactly representable as an int.
    if (downCasted > Number.MAX_SAFE_INTEGER) return resetValue();
    const asNumber = Number(downCasted);
    // Must also update local state, or string will not render correctly.
    setLocalState(parseValue(asNumber));
    setState(asNumber);
    return undefined;
  };

  // Update local state when characters appended, not global state
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Reject changes when read only
    if (isReadOnly) return;
    const stringValue = e.currentTarget.value;
    setLocalState(stringValue);
  };

  // Trigger validation on "enter" keypress
  const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key.toLowerCase()) {
      case 'enter': onValidate(); break;
      default: break;
    }
  };

  return (
    <div className="UnicodeConverter" data-testid="UnicodeConverter">
      <input value={localState} onChange={onChange} onBlur={onValidate} onKeyPress={onKeyPress} />
    </div>
  );
};

export const toHigherOrder = (byteLength: number) => (props: HigherOrderConverterProps) => {
  const { state, setState } = props;
  return <UnicodeConverter byteLength={byteLength} state={state} setState={setState} />;
};

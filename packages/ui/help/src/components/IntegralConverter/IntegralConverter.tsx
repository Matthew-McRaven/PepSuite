import React, { ChangeEvent } from 'react';
import './IntegralConverter.scss';

import type { IntegralConverterProps } from './IntegralConverter.d';
import type { HigherOrderConverterProps } from '../BaseConverter';

const basePrefix = (base: number): string => {
  switch (base) {
    case 2: return '0b';
    case 10: return '';
    case 16: return '0x';
    default: throw Error('Unsupported base');
  }
};
// Return a regex that matches a line containing only the prefix.
const regexBasePrefix = (base: number): RegExp => RegExp(`^${basePrefix(base)}$`);

// Get a regex that allows only valid strings for a given base.
// Is signed is only followed in base10
const regexFromBase = (base: number, isSigned: boolean): RegExp => {
  switch (base) {
    case 2: return /0[b|B][0|1]+/;
    case 10:
      if (isSigned) return /-?[0-9]+/;
      return /[0-9]+/;
    case 16: return /0[x|X][0-9,a-f,A-F]+/;
    default: throw Error('Unsupported base');
  }
};

// Component that displays a byte in different bases.
// If multiple components are linked to the same state
// it would have the effect of converting between bases.
export const IntegralConverter = (props: IntegralConverterProps) => {
  const {
    base, byteLength, isReadOnly, isSigned, state, setState,
  } = props;

  // Preconditions
  if (isSigned && base !== 10) throw Error('isSigned can only be true in base 10');
  else if (!byteLength) throw Error('byteLength must be defined');
  else if (byteLength <= 0) throw Error('byteLength must be positive');
  else if (byteLength > 4) throw Error('byteLength must be less or equal to than 4. Only 32-bit integers are supported');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Reject changes when read only
    if (isReadOnly) return;

    const stringValue = e.currentTarget.value;
    // If the string is empty (after striping base prefix), set to 0.
    if (regexBasePrefix(base).exec(stringValue)) {
      setState(0); return;
    }
    // Reject values that don't match the regex
    const match = regexFromBase(base, isSigned || false).exec(stringValue);
    if (!match) return;

    // I'm a C++ programmer, I know how bitwise operations work.

    const unsignedMaxValue = (2 ** (8 * byteLength)) - 1;
    // eslint-disable-next-line no-bitwise
    const allOnes = unsignedMaxValue >>> 0;
    const signedMaxValue = (2 ** (8 * byteLength - 1) - 1);
    const signedMinValue = -(2 ** (8 * byteLength - 1));
    // Must strip base prefix from string before parsing
    // Coerce signed to unsigned using shift 0: https://stackoverflow.com/a/16155417
    let bitValue = parseInt(stringValue.substring(basePrefix(base).length), base);
    // console.log(stringValue, bitValue, unsignedMaxValue, bitValue & unsignedMaxValue)

    // Constrain values to (unsigned) [0,2**byteLength - 1]
    if (isSigned) {
      // TODO: Check that this works for 32 bit values.
      // TODO: If stringValue has leading -, keep it in the render.
      // In theory, min/max values are floats, so this should be safe.
      if (bitValue > signedMaxValue || bitValue < signedMinValue) return;
      // eslint-disable-next-line no-bitwise
      bitValue = (bitValue & allOnes) >>> 0;
    } else {
      // eslint-disable-next-line no-bitwise
      bitValue >>>= 0;
      if (bitValue > unsignedMaxValue || bitValue < 0) return;
    }

    setState(bitValue);
  };

  const formatValue = () => {
    if (isSigned) {
      // If the high order bit of state is a 1, then we must sign extend
      // eslint-disable-next-line no-bitwise
      if ((state >>> 0) & ((2 ** (8 * byteLength)) >>> 1)) {
        // left-pad from bit 31 down to bit 8*byteLength-1
        // eslint-disable-next-line no-bitwise
        const maskPattern = (0xFFFFFFFF >>> 0) - ((2 ** (8 * byteLength) - 1) >>> 0);
        // eslint-disable-next-line no-bitwise
        const paddedState = (maskPattern | state) >> 0;
        // eslint-disable-next-line no-bitwise
        // console.log(maskPattern.toString(16), (paddedState >>> 0).toString(16), paddedState);
        return `${Number(paddedState)}`;
      }
    }
    // Add prefix to value if necessary
    return `${basePrefix(base)}${state.toString(base).toUpperCase()}`;
  };

  return (
    <div className="IntegralConverter" data-testid="IntegralConverter">
      <input value={formatValue()} onChange={onChange} />
    </div>
  );
};

// ESLint keeps trying to "fix" this line, and breaking it worse than it originally was.
// eslint-disable-next-line max-len
export const toHigherOrder = (base: number, byteLength: number, readOnly?: boolean, isSigned?: boolean) => (props: HigherOrderConverterProps) => {
  const { state, setState } = props;
  return (
    <IntegralConverter
      base={base}
      byteLength={byteLength}
      isSigned={isSigned || false}
      isReadOnly={readOnly || false}
      state={state}
      setState={setState}
    />
  );
};

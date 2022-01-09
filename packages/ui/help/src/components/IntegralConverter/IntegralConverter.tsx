import React, { ChangeEvent } from 'react';
import './IntegralConverter.scss';

import type { IntegralConverterProps } from './IntegralConverter.d';

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
const regexFromBase = (base: number): RegExp => {
  switch (base) {
    case 2: return /0[b|B][0|1]+/;
    case 10: return /[0-9]+/;
    case 16: return /0[x|X][0-9,a-f,A-F]+/;
    default: throw Error('Unsupported base');
  }
};

// Component that displays a byte in different bases.
// If multiple components are linked to the same state, it would have the effect of converting between bases.
const IntegralConverter = (props: IntegralConverterProps) => {
  const { state, setState, base } = props;
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const stringValue = e.currentTarget.value;
    // If the string is empty (after striping base prefix), set to 0.
    if (regexBasePrefix(base).exec(stringValue)) {
      setState(0); return;
    }
    // Reject values that don't match the regex
    const match = regexFromBase(base).exec(stringValue);
    if (!match) return;
    // Must strip base prefix from string before parsing
    const intValue = parseInt(stringValue.substring(basePrefix(base).length), base);
    // Constrain values to [0,255]
    if (intValue > 255 || intValue < 0) return;
    setState(intValue);
  };

  // Add prefix to value if necessary
  const formattedValue = `${basePrefix(base)}${state.toString(base).toUpperCase()}`;
  return (
    <div className="IntegralConverter" data-testid="IntegralConverter">
      <input value={formattedValue} onChange={onChange} />
    </div>
  );
};

export default IntegralConverter;

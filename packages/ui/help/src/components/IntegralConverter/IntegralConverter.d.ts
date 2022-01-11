import React from 'react';

export interface IntegralConverterProps {
  // Will always be in [0, 255]
  state: number;
  // Currently supported bases [2, 10, 16]
  base: number;
  // eslint-disable-next-line no-unused-vars
  // Must enforce that newState is in [0, 255].
  setState: (newState: number) => void;
}

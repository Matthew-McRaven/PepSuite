import React from 'react';

export interface IntegralConverterProps {
  // Only makes sense when working with base10
  isSigned?: boolean;
  // Are edits allowed?
  isReadOnly?: boolean;
  // Must be strictly positive
  byteLength: number;
  // Will be in (unsigned) [0, 2**byteLength - 1]
  state: number;
  // Currently supported bases [2, 10, 16]
  base: number;
  // eslint-disable-next-line no-unused-vars
  // Must enforce that newState is in (unsigned) [0, 2**byteLength - 1].
  setState: (newState: number) => void;
}

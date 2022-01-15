import React from 'react';

export interface BaseConverterProps {
  // Are edits allowed?
  isReadOnly?: boolean;
  // Must be strictly positive
  byteLength: number;
  // Will be in (unsigned) [0, 2**byteLength - 1]
  state: number;
  // Must enforce that newState is in (unsigned) [0, 2**byteLength - 1].
  // eslint-disable-next-line no-unused-vars
  setState: (newState: number) => void;
}

export type HigherOrderConverter =
  // eslint-disable-next-line no-unused-vars
  (props: { state: number, setState: (newState: number) => void }) => React.ReactElement

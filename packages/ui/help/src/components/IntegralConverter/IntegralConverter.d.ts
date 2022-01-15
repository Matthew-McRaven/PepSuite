import type { BaseConverterProps } from '../BaseConverter';

export interface IntegralConverterProps extends BaseConverterProps {
  // Only makes sense when working with base10
  isSigned?: boolean;
  // Currently supported bases [2, 10, 16]
  base: number;
  // Must enforce that newState is in (unsigned) [0, 2**byteLength - 1].
  // eslint-disable-next-line no-unused-vars
  setState: (newState: number) => void;
}

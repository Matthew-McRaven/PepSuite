import type { BaseConverterProps } from '../BaseConverter';

// eslint-disable-next-line no-unused-vars
export type MappingFunction = (key: number) => string
export interface MapConverterProps extends BaseConverterProps {
  map: MappingFunction
}

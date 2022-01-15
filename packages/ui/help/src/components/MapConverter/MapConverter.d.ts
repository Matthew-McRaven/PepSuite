import type { BaseConveterProps } from '../BaseConverter';

// eslint-disable-next-line no-unused-vars
export type MappingFunction = (key: number) => string
export interface MapConverterProps extends BaseConveterProps {
  map: MappingFunction
}

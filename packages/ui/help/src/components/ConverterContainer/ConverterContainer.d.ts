import { HigherOrderConverter } from '../BaseConverter';

export interface ConverterContainerProps {
  startState?: number
  children: Array<HigherOrderConverter>;
}

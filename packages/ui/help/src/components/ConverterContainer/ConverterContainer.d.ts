import { HigherOrderConverter } from '../BaseConverter';

export interface ConverterContainerProps {
  startState?: number
  children: Array<HigherOrderConverter>;
  // eslint-disable-next-line no-unused-vars
  error: (message: string) => void
}

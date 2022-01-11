import React from 'react';

export type HigherOrderConverter = (props: { state: number, setState: (newState: number) => void }) => React.Element
export interface ConverterContainerProps {
  startState?: number
  children: Array<HigherOrderConverter>;
}

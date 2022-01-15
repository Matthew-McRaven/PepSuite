import React, { useState } from 'react';
import './ConverterContainer.scss';
import type { ConverterContainerProps } from './ConverterContainer.d';

const ConverterContainer = (props: ConverterContainerProps) => {
  const { children, startState } = props;
  const [state, setState] = useState<number>(startState || 65);
  return (
    <div className="ConverterContainer" data-testid="ConverterContainer">
      {children.map((Hoc, index) => <Hoc state={state} setState={setState} key={index} />)}
    </div>
  );
};

export default ConverterContainer;

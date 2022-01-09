import React, { useState } from 'react';
import IntegralConverter from './IntegralConverter';

export default {
  title: 'Help/IntegralConverter',
  component: IntegralConverter,

};

const Template = (args: { base: 2 | 10 | 16 }) => {
  const { base } = args;
  const [state, setState] = useState(0);
  return <IntegralConverter state={state} setState={setState} base={base} />;
};

export const Decimal = Template.bind({});
Decimal.args = { base: 10 };

export const Binary = Template.bind({});
Binary.args = { base: 2 };

export const Hex = Template.bind({});
Hex.args = { base: 16 };

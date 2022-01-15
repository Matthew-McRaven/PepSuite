import React from 'react';

import { toHigherOrder as AsciiToHigher } from '../AsciiMapConverter';
import { toHigherOrder as IntegralToHigher } from '../IntegralConverter';
import ConverterContainer from './ConverterContainer';
import type { HigherOrderConverter } from '../BaseConverter';

export default {
  title: 'Help/ConverterContainer',
  component: ConverterContainer,
  argTypes: {
  },
};

interface TemplateProps { children: Array<HigherOrderConverter> }
const Template = (args: TemplateProps) => {
  const { children } = args;
  return <ConverterContainer>{children}</ConverterContainer>;
};

export const IntegralGroup = Template.bind({});
IntegralGroup.args = {
  children: [
    IntegralToHigher(2, 1),
    IntegralToHigher(10, 1),
    IntegralToHigher(16, 1),
  ],
};

export const AsciiGroup = Template.bind({});
AsciiGroup.args = {
  children: [
    IntegralToHigher(2, 1),
    IntegralToHigher(10, 1),
    IntegralToHigher(16, 1),
    AsciiToHigher(),
  ],
};

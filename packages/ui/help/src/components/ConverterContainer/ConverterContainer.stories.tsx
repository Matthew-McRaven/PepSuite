import React from 'react';

import { toHigherOrder as AsciiToHigher } from '../AsciiMapConverter';
import { toHigherOrder as IntegralToHigher } from '../IntegralConverter';
import ConverterContainer from './ConverterContainer';
import type { HigherOrderConverter } from './ConverterContainer.d'

export default {
  title: 'Help/ConverterContainer',
  component: ConverterContainer,
  argTypes: {
  },
};


const Template = (args: { children: Array<HigherOrderConverter> }) => <ConverterContainer children={args.children} />;

export const IntegralGroup = Template.bind({});
IntegralGroup.args = {
  children: [
    IntegralToHigher(2),
    IntegralToHigher(10),
    IntegralToHigher(16)
  ]
}

export const AsciiGroup = Template.bind({});
AsciiGroup.args = {
  children: [
    IntegralToHigher(2, 1),
    IntegralToHigher(10, 1),
    IntegralToHigher(16, 1),
    AsciiToHigher(),
  ]
}
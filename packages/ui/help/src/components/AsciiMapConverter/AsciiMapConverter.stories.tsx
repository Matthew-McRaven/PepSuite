import React from 'react';
import { AsciiMapConverter as _AsciiMapConverter } from './AsciiMapConverter';

export default {
  title: 'Help/AsciiMapConverter',
  component: _AsciiMapConverter,
  argTypes: {
  },
  parameters: {
    state: 5
  }
};

const Template = (args: { state: number }) => {
  const { state } = args;
  return <_AsciiMapConverter state={state} />;
};
export const AsciiMapConverter = Template.bind({});
AsciiMapConverter.args = {
  state: 65
}


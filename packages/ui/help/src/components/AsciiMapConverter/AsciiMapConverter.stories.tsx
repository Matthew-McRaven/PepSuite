import React from 'react';
import { AsciiMapConverter as LocalAsciiMapConverter } from './AsciiMapConverter';

export default {
  title: 'Help/AsciiMapConverter',
  component: LocalAsciiMapConverter,
  argTypes: {
  },
  parameters: {
    state: 5,
  },
};

const Template = (args: { state: number }) => {
  const { state } = args;
  return <LocalAsciiMapConverter state={state} />;
};
export const AsciiMapConverter = Template.bind({});
AsciiMapConverter.args = {
  state: 65,
};

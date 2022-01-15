import React from 'react';
import AsciiConverter from './AsciiConverter';

export default {
  title: 'AsciiConverter',
  component: AsciiConverter,
  argTypes: {
  },
};

const Template = () => <AsciiConverter />;

export const withTemplate = Template.bind({});

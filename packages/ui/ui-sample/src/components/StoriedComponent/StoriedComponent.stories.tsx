import React from 'react';
import StoriedComponent from './StoriedComponent';

export default {
  title: 'StoriedComponent',
  component: StoriedComponent,
  argTypes: {
  },
};

const Template = (args) => <StoriedComponent text={args.text} />;

export const withTemplate = Template.bind({});
withTemplate.args = {
  text: 'Hello World',
};

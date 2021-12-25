import React from 'react';
import StoriedComponent from './StoriedComponent';

export default {
  title: 'StoriedComponent',
  component: StoriedComponent,
  argTypes: {
  },
};

const Template = () => <StoriedComponent />;

export const withTemplate = Template.bind({});

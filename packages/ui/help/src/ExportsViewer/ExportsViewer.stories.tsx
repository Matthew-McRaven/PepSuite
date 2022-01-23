import React from 'react';
import ExportsViewer from './ExportsViewer';

export default {
  title: 'ExportsViewer',
  component: ExportsViewer,
  argTypes: {
  },
};

const Template = () => <ExportsViewer />;

export const withTemplate = Template.bind({});

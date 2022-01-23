import React from 'react';
import ExportsViewer from './ExportsViewer';
import type { ExportDefinition } from './ExportsViewer';

export default {
  title: 'Help/ExportsViewer',
  component: ExportsViewer,
  argTypes: {
  },
};
const Template = (args: { definitions: ExportDefinition[] }) => {
  const { definitions } = args;
  return <ExportsViewer definitions={definitions} />;
};

export const View = Template.bind({});
View.args = {
  definitions: [{
    name: 'true',
    value: 1,
    sourceDefinition: 'true: .EQUATE 1',
  }, {
    name: 'false',
    value: 0,
    sourceDefinition: 'false: .EQUATE 0',
  }],
};

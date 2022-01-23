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
    base: 10,
    sourceDefinition: 'true: .EQUATE 1',
  }, {
    name: 'false',
    value: 0,
    base: 10,
    sourceDefinition: 'false: .EQUATE 0',
  }, {
    name: 'bitMsk',
    value: 0b110110,
    base: 2,
    sourceDefinition: 'bitMsk: .EQUATE 0b110110',
  }, {
    name: 'charIn',
    value: 0xFEED,
    base: 16,
    sourceDefinition: 'charIn: .BLOCK 1',
  }],
};

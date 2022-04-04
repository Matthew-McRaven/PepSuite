import React from 'react';
import ObjectCodePane from './ObjectCodePane';

export default {
  title: 'Editors/ObjectCodePane',
  component: ObjectCodePane,
  argTypes: {
  },
};

interface Props {
  objectCode: string,
  bytesPerLine: number
}
const Template = (args: Props) => {
  const { objectCode, bytesPerLine } = args;
  return <ObjectCodePane objectCode={objectCode} bytesPerLine={bytesPerLine} />;
};

export const objectCodePane = Template.bind({});
objectCodePane.args = {
  objectCode: 'AA BB CC DD EE FF ZZ',
  bytesPerLine: 2,
};

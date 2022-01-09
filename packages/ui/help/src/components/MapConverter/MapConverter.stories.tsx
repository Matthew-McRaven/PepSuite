import React from 'react';
import { default as _MapConverter } from './MapConverter';

export default {
  title: 'Help/MapConverter',
  component: _MapConverter,
  argTypes: {
  },
};

const Template = (args: { state: number, map: Array<string> }) => {
  return <_MapConverter {...args} />;
}

export const MapConverter = Template.bind({});
MapConverter.args = {
  state: 5,
  map: Array.from({ length: 256 }, (e, i) => `${i}`)
}

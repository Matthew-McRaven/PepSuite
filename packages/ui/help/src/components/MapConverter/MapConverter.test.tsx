import React from 'react';
import { shallow } from 'enzyme';
import MapConverter from './MapConverter';

describe('Integral <MapConverter />', () => {
  const map = Array.from({ length: 256 }, (e, i) => `${i}`);
  it('has been mounted', () => {
    const component = shallow(<MapConverter state={5} map={map} />);
    expect(component.length).toBe(1);
  });
  it('renders each character correctly', () => {
    for (const i of Array(256).keys()) {
      const component = shallow(<MapConverter state={i} map={map} />);
      expect(component.getElement().props.children).toBe(`${i}`)
    }
  });
});

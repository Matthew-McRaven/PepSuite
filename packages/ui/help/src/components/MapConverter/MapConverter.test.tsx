import React from 'react';
import { shallow } from 'enzyme';
import MapConverter from './MapConverter';

describe('<MapConverter />', () => {
  it('has been mounted', () => {
    const component = shallow(<MapConverter />);
    expect(component.length).toBe(1);
  });
});

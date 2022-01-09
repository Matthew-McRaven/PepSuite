import React from 'react';
import { shallow } from 'enzyme';
import IntegralConverter from './IntegralConverter';

describe('<IntegralConverter />', () => {
  it('has been mounted', () => {
    const component = shallow(<IntegralConverter />);
    expect(component.length).toBe(1);
  });
});

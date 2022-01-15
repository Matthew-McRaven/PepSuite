import React from 'react';
import { shallow } from 'enzyme';
import AsciiConverter from './AsciiConverter';

describe('<AsciiConverter />', () => {
  it('has been mounted', () => {
    const component = shallow(<AsciiConverter />);
    expect(component.length).toBe(1);
  });
});

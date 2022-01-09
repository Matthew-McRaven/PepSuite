import React from 'react';
import { shallow } from 'enzyme';
import AsciiMapConverter from './AsciiMapConverter';

describe('<AsciiMapConverter />', () => {
  it('has been mounted', () => {
    const component = shallow(<AsciiMapConverter state={5} />);
    expect(component.length).toBe(1);
  });
});

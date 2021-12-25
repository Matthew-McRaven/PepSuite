import React from 'react';
import { shallow } from 'enzyme';
import StoriedComponent from './StoriedComponent';

describe('<StoriedComponent />', () => {
  it('has been mounted', () => {
    const component = shallow(<StoriedComponent />);
    expect(component.length).toBe(1);
  });
});

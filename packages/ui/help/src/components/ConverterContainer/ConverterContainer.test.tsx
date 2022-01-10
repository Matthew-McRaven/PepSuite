import React from 'react';
import { shallow } from 'enzyme';
import ConverterContainer from './ConverterContainer';

describe('<ConverterContainer />', () => {
  it('has been mounted', () => {
    const component = shallow(<ConverterContainer />);
    expect(component.length).toBe(1);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import ObjectCodePane from './ObjectCodePane';

describe('<ObjectCodePane />', () => {
  it('has been mounted', () => {
    const component = shallow(<ObjectCodePane objectCode="aa bb ZZ" bytesPerLine={3} />);
    expect(component.length).toBe(1);
  });
});

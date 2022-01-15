import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import ConverterContainer from './ConverterContainer';
import { toHigherOrder as IntegralToHigher } from '../IntegralConverter';

describe('Integral <ConverterContainer />', () => {
  const children = [IntegralToHigher(2, 1), IntegralToHigher(10, 1), IntegralToHigher(16, 1)];
  it('has been mounted', () => {
    const component = shallow(<ConverterContainer>{children}</ConverterContainer>);
    expect(component.length).toBe(1);
  });
  it('has three children', () => {
    const component = shallow(<ConverterContainer>{children}</ConverterContainer>);
    expect(component.prop('children').length).toBe(3);
  });
  it('links the state of children', async () => {
    const component = mount(<ConverterContainer>{children}</ConverterContainer>);
    const converters = component.find('IntegralConverter');
    // This was a pain: https://stackoverflow.com/a/56512772
    Array.from(Array(256).keys()).forEach((i) => {
      // Needed because DOM is being updated
      act(() => { converters.get(0).props.setState(i); });
      // And top-level component must be re-rendered
      component.update();
      // And must re-find the converters, because the old reference is invalid
      component.find('IntegralConverter').forEach((converter) => { expect(converter.prop('state')).toBe(i); });
    });
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import IntegralConverter from './IntegralConverter';

/*****************************
* Decimal Integral Converter *
******************************/
describe('Decimal <IntegralConverter />', () => {
  let state = 5;
  const setState = (newState: number) => { state = newState; };
  it('has been mounted', () => {
    const component = shallow(<IntegralConverter state={state} setState={setState} base={10} />);
    expect(component.length).toBe(1);
  });
  // Default to 0 when only given prefix
  state = 255
  it('defaults to 0 ', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={10} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '' } });
    expect(state).toBe(0)
  });
  it('can have it\'s value set in [0,255]', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={10} />);
    const input = wrapper.find("input");
    for (let i of Array(255).keys()) {
      input.simulate('change', { currentTarget: { value: `${i}` } });
      expect(state).toBe(i)
    }

  });
  it('rejects negative numbers', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={10} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '-25' } });
    expect(state).not.toBe(-25)
  });
  it('rejects numbers larger than 255', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={10} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '257' } });
    expect(state).not.toBe(257)
  });
  // Set state to something other than 1 for following tests.
  state = 2;
  it('rejects binary strings', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={10} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '0b01' } });
    expect(state).not.toBe(1)
  });
  it('rejects hexadecimal strings', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={10} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '0x01' } });
    expect(state).not.toBe(1)
  });
});
/****************************
* Binary Integral Converter *
*****************************/
describe('Binary <IntegralConverter />', () => {
  let state = 5;
  const setState = (newState: number) => { state = newState; };
  it('has been mounted', () => {
    const component = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    expect(component.length).toBe(1);
  });
  // Default to 0 when only given prefix
  state = 255
  it('defaults to 0 ', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '0b' } });
    expect(state).toBe(0)
  });
  // Check that prefixes 0b and 0B work
  it('accepts uppercase B ', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: `0B11` } });
    expect(state).toBe(3)
  });
  it('accepts lowercase b ', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: `0b101` } });
    expect(state).toBe(5)
  });
  it('can have it\'s value set in [0,255]', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    const input = wrapper.find("input");
    for (let i of Array(255).keys()) {
      input.simulate('change', { currentTarget: { value: `0b${i.toString(2)}` } });
      expect(state).toBe(i)
    }
  });

  it('rejects negative numbers', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '-25' } });
    expect(state).not.toBe(-25)
  });
  it('rejects numbers larger than 255', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: `0b${(257).toString(2)}` } });
    expect(state).not.toBe(257)
  });


  // Set state to something other than 1 for following tests.
  state = 2;
  it('rejects decimal strings', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '1' } });
    expect(state).not.toBe(1)
  });
  it('rejects hexadecimal strings', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={2} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '0x01' } });
    expect(state).not.toBe(1)
  });
});

/*********************************
* Hexadecimal Integral Converter *
**********************************/
describe('Hexadecimal <IntegralConverter />', () => {
  let state = 5;
  const setState = (newState: number) => { state = newState; };
  it('has been mounted', () => {
    const component = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    expect(component.length).toBe(1);
  });
  // Default to 0 when only given prefix
  state = 255
  it('defaults to 0 ', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '0x' } });
    expect(state).toBe(0)
  });
  // Check that prefixes 0x and 0x work
  it('accepts uppercase X ', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: `0X03` } });
    expect(state).toBe(3)
  });
  it('accepts lowercase x ', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: `0x05` } });
    expect(state).toBe(5)
  });
  it('can have it\'s value set in [0,255]', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    const input = wrapper.find("input");
    for (let i of Array(255).keys()) {
      input.simulate('change', { currentTarget: { value: `0x${i.toString(16)}` } });
      expect(state).toBe(i)
    }
  });

  it('rejects negative numbers', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '-25' } });
    expect(state).not.toBe(-25)
  });
  it('rejects numbers larger than 255', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: `0x${(257).toString(16)}` } });
    expect(state).not.toBe(257)
  });


  // Set state to something other than 1 for following tests.
  state = 2;
  it('rejects binary strings', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '0b1' } });
    expect(state).not.toBe(1)
  });
  it('rejects decimal strings', () => {
    const wrapper = shallow(<IntegralConverter state={state} setState={setState} base={16} />);
    const input = wrapper.find("input");
    input.simulate('change', { currentTarget: { value: '01' } });
    expect(state).not.toBe(1)
  });
});


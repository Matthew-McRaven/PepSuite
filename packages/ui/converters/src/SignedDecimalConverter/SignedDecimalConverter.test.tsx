import React from 'react';
import { shallow } from 'enzyme';
import { SignedDecimalConverter } from './SignedDecimalConverter';

/** ***************************
* 1-byte signed Decimal Integral Converter *
***************************** */

describe('1-byte <SignedDecimalConverter />', () => {
  it('has been mounted', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const component = shallow(<SignedDecimalConverter
      byteLength={1}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    expect(component.length).toBe(1);
  });

  // Default to 0 when only given prefix
  it('defaults to 0 ', () => {
    let state = 255;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={1}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).toBe(0);
  });

  it('can have it\'s value set in [-128,127]', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={1}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    Array.from(Array(255).keys()).forEach((i) => {
      wrapper.find('input').simulate('change', { currentTarget: { value: `${i - 128}` } });
      wrapper.find('input').simulate('blur', {});
      // eslint-disable-next-line no-bitwise
      expect(state).toBe(((i - 128) >>> 0) & 0xFF);
    });
  });

  it('rejects numbers greater than 127', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={1}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '128' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).not.toBe(128);
  });

  it('rejects numbers less than -128', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={1}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '-129' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).not.toBe(-129);
  });

  // Set state to something other than 1 for following tests.
  it('rejects binary strings', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={1}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '0b01' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).not.toBe(1);
  });

  it('rejects hexadecimal strings', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={1}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '0x01' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).not.toBe(1);
  });
});

/** ***************************
* 2-byte signed Decimal Integral Converter *
***************************** */
describe('2-byte Unsigned Decimal <IntegralConverter />', () => {
  it('has been mounted', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const component = shallow(<SignedDecimalConverter
      byteLength={2}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    expect(component.length).toBe(1);
  });

  // Default to 0 when only given prefix
  it('defaults to 0 ', () => {
    let state = 255;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={2}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).toBe(0);
  });

  it('can have it\'s value set in [-2**16-1,2**(16-1)-1]', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={2}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    Array.from(Array(0x1000).keys()).forEach((i) => {
      wrapper.find('input').simulate('change', { currentTarget: { value: `${i - 0x8000}` } });
      wrapper.find('input').simulate('blur', {});
      // eslint-disable-next-line no-bitwise
      expect(state).toBe(((i - 0x8000) >>> 0) & 0xFFFF);
    });
  });

  it('rejects numbers greater than 2**(16-1)-1', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={2}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '32768' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).not.toBe(32768);
  });

  it('rejects numbers less than -2**16-1', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={2}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '-32769' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).not.toBe(-32769);
  });

  // Set state to something other than 1 for following tests.
  it('rejects binary strings', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={2}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '0b01' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).not.toBe(1);
  });

  it('rejects hexadecimal strings', () => {
    let state = 5;
    const setState = (newState: number) => { state = newState; };
    const wrapper = shallow(<SignedDecimalConverter
      byteLength={2}
      error={() => { }}
      state={state}
      setState={setState}
    />);
    wrapper.find('input').simulate('change', { currentTarget: { value: '0x01' } });
    wrapper.find('input').simulate('blur', {});
    expect(state).not.toBe(1);
  });
});
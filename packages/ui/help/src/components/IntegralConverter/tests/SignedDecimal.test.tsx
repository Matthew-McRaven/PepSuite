import React from 'react';
import { shallow } from 'enzyme';
import IntegralConverter from '../IntegralConverter';

/*****************************
* 1-byte signed Decimal Integral Converter *
******************************/
/*
describe('1-byte Unsigned Decimal <IntegralConverter />', () => {
	let state = 5;
	const setState = (newState: number) => { state = newState; };
	it('has been mounted', () => {
		const component = shallow(<IntegralConverter byteLength={1} isSigned={true} state={state} setState={setState} base={10} />);
		expect(component.length).toBe(1);
	});
	// Default to 0 when only given prefix
	state = 255
	it('defaults to 0 ', () => {
		const wrapper = shallow(<IntegralConverter byteLength={1} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '' } });
		expect(state).toBe(0)
	});
	it('can have it\'s value set in [-128,127]', () => {
		const wrapper = shallow(<IntegralConverter byteLength={1} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		for (let i of Array(255).keys()) {
			input.simulate('change', { currentTarget: { value: `${i - 128}` } });
			expect(state).toBe(((i - 128) >>> 0) & 0xFF)
		}

	});
	it('rejects numbers greater than 127', () => {
		const wrapper = shallow(<IntegralConverter byteLength={1} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '128' } });
		expect(state).not.toBe(128)
	});
	it('rejects numbers less than -128', () => {
		const wrapper = shallow(<IntegralConverter byteLength={1} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '-129' } });
		expect(state).not.toBe(-129)
	});
	// Set state to something other than 1 for following tests.
	state = 2;
	it('rejects binary strings', () => {
		const wrapper = shallow(<IntegralConverter byteLength={1} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '0b01' } });
		expect(state).not.toBe(1)
	});
	it('rejects hexadecimal strings', () => {
		const wrapper = shallow(<IntegralConverter byteLength={1} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '0x01' } });
		expect(state).not.toBe(1)
	});
});*/

/*****************************
* 2-byte signed Decimal Integral Converter *
******************************/
describe('2-byte Unsigned Decimal <IntegralConverter />', () => {
	let state = 5;
	const setState = (newState: number) => { state = newState; };
	it('has been mounted', () => {
		const component = shallow(<IntegralConverter byteLength={2} isSigned={true} state={state} setState={setState} base={10} />);
		expect(component.length).toBe(1);
	});
	// Default to 0 when only given prefix
	state = 255
	it('defaults to 0 ', () => {
		const wrapper = shallow(<IntegralConverter byteLength={2} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '' } });
		expect(state).toBe(0)
	});
	it('can have it\'s value set in [-2**16-1,2**(16-1)-1]', () => {
		const wrapper = shallow(<IntegralConverter byteLength={2} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		for (let i of Array(0xFFFF).keys()) {
			input.simulate('change', { currentTarget: { value: `${i - 0x8000}` } });
			expect(state).toBe(((i - 0x8000) >>> 0) & 0xFFFF)
		}

	});
	it('rejects numbers greater than 2**(16-1)-1', () => {
		const wrapper = shallow(<IntegralConverter byteLength={2} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '32768' } });
		expect(state).not.toBe(32768)
	});
	it('rejects numbers less than -2**16-1', () => {
		const wrapper = shallow(<IntegralConverter byteLength={2} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '-32769' } });
		expect(state).not.toBe(-32769)
	});
	// Set state to something other than 1 for following tests.
	state = 2;
	it('rejects binary strings', () => {
		const wrapper = shallow(<IntegralConverter byteLength={2} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '0b01' } });
		expect(state).not.toBe(1)
	});
	it('rejects hexadecimal strings', () => {
		const wrapper = shallow(<IntegralConverter byteLength={2} isSigned={true} state={state} setState={setState} base={10} />);
		const input = wrapper.find("input");
		input.simulate('change', { currentTarget: { value: '0x01' } });
		expect(state).not.toBe(1)
	});
});
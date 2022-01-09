import React from 'react';
import './AsciiMapConverter.scss';
import MapConverter from '../MapConverter/MapConverter';
import type { AsciiMapConverterProps } from './AsciiMapConverter.d'

export const AsciiMapConverter = (props: AsciiMapConverterProps) => {
	const { state } = props;
	const consecutive = Array.from({ length: 256 }, (e, i) => String.fromCharCode(i))
	return <MapConverter map={consecutive} state={state} />
}
export default AsciiMapConverter;

import React from 'react';
import './MapConverter.scss';
import type { MapConverterProps } from "./MapConverter.d"

export const toHigherOrder = (map: string[]) => {
	return (props: { state: number, setState: (arg0: number) => void }) => {
		const { state } = props;
		return <MapConverter map={map} state={state} />
	}
}

const MapConverter = (props: MapConverterProps) => {
	const { map, state } = props;

	if (map.length != 256) throw Error("Map must contain exactly 256 entries.")

	return <div className="MapConverter" data-testid="MapConverter" >
		{/*TODO: Convert to Array.at() when more widely supported.*/}
		{map[state]}
	</div>;
}

export default MapConverter
import React from 'react';
import './MapConverter.scss';
import type { MapConverterProps, MappingFunction } from './MapConverter.d';
import { HigherOrderConverterProps } from '../BaseConverter';

export const MapConverter = (props: MapConverterProps) => {
  const { map, state } = props;

  return (
    <div className="MapConverter" data-testid="MapConverter">
      {map(state)}
    </div>
  );
};

export const toHigherOrder = (map: MappingFunction, byteLength: number) => {
  const localFn = (props: HigherOrderConverterProps) => {
    const { error, state, setState } = props;
    return <MapConverter map={map} error={error} state={state} byteLength={byteLength} setState={setState} />;
  };
  return localFn;
};

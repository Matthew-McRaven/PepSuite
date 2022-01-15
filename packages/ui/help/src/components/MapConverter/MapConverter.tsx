import React from 'react';
import './MapConverter.scss';
import type { MapConverterProps, MappingFunction } from './MapConverter.d';
import { BaseConveterProps } from '../BaseConverter';

export const MapConverter = (props: MapConverterProps) => {
  const { map, state } = props;

  return (
    <div className="MapConverter" data-testid="MapConverter">
      {map(state)}
    </div>
  );
};

export const toHigherOrder = (map: MappingFunction) => (props: BaseConveterProps) => {
  const { byteLength, state, setState } = props;
  return <MapConverter map={map} state={state} byteLength={byteLength} setState={setState} />;
};

import React from 'react';
import './AsciiMapConverter.scss';
import { MapConverter } from '../MapConverter';
import type { MappingFunction } from '../MapConverter';
import type { AsciiMapConverterProps } from './AsciiMapConverter.d';

const consecutive = Array.from({ length: 256 }, (e, i) => String.fromCharCode(i));

export const AsciiMapConverter = (props: AsciiMapConverterProps) => {
  const { state } = props;

  const errorMap = (value: number) => {
    if (value < 0 || value > 255) throw new Error(`${value} outside the range of valid ASCII characters.`);
    return consecutive.at(value);
  };
  // errorMap can return undefined, but in that case it raises an error, so being undefined is
  // the least of our worries.
  const map = errorMap as MappingFunction;
  return <MapConverter map={map} state={state} byteLength={1} setState={() => { }} />;
};

export const toHigherOrder = () => (props: { state: number, }) => {
  const { state } = props;
  return <AsciiMapConverter state={state} />;
};

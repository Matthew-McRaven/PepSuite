import React from 'react';

export interface MapConverterProps {
  // Must contain exactly 256 elements
  map: Array<string>
  // Will always be in [0, 255]
  state: number
}

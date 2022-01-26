import React from 'react';
import './ExportsViewer.scss';
import { UnsignedIntegral } from '@pep10/ui-converters';

export interface ExportDefinition {
  name: string
  value: number
  base: UnsignedIntegral.SupportedBases
  sourceDefinition: string

}

export interface ExportsViewerProps {
  definitions: ExportDefinition[]
}

const ExportRow = (props: ExportDefinition) => {
  const {
    name, base, value, sourceDefinition,
  } = props;
  return (
    <div className="Row">
      <div>{name}</div>
      <div>
        {UnsignedIntegral.UnsignedIntegralConverter({
          state: value,
          base,
          setState: () => { },
          error: () => { },
          isReadOnly: true,
          byteLength: 2,
        })}
      </div>
      <div>{sourceDefinition}</div>
    </div>
  );
};

const ExportsViewer = (props: ExportsViewerProps) => {
  const { definitions } = props;
  return (
    <div className="ExportsViewer" data-testid="ExportsViewer">
      {definitions.map((def) => ExportRow(def))}
    </div>
  );
};

export default ExportsViewer;

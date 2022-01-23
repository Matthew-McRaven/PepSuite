import React from 'react';
import './ExportsViewer.scss';
import { Integral } from '@pep10/ui-converters';

export interface ExportDefinition {
  name: string
  value: number
  sourceDefinition: string

}

export interface ExportsViewerProps {
  definitions: ExportDefinition[]
}

const ExportRow = (props: ExportDefinition) => {
  const { name, value, sourceDefinition } = props;
  return (
    <div className="Row">
      <div>{name}</div>
      <div>
        {Integral.IntegralConverter({
          state: value,
          base: 16,
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

import React from 'react';
import './ExportsViewer.scss';

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
      <div>{value}</div>
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

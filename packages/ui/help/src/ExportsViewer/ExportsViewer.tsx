import React from 'react';
import './ExportsViewer.scss';

export interface ExportsViewerProps {
  heading: string;
  content: React.ReactNode;
}

const ExportsViewer = () => <div className="ExportsViewer" data-testid="ExportsViewer" />;

export default ExportsViewer;

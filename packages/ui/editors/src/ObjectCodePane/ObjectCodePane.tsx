import React from 'react';
import './ObjectCodePane.scss';

export interface ObjectCodePaneProps {
  heading: string;
  content: React.ReactNode;
}

const ObjectCodePane = () => <div className="ObjectCodePane" data-testid="ObjectCodePane" />;

export default ObjectCodePane;

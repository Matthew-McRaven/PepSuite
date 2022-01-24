import React, { useState } from 'react';
import './ObjectCodePane.scss';
import { formatBytesLike } from '../ObjectCodeParser';

export interface ObjectCodePaneProps {
  objectCode: string
  bytesPerLine: number
}

const reproject = (arg0: string, bytesPerLine: number) => formatBytesLike(arg0.split(/\s/), bytesPerLine);

const ObjectCodePane = (props: ObjectCodePaneProps) => {
  const { objectCode, bytesPerLine } = props;
  const [lastSeenState, setLastSeenState] = useState(objectCode);
  const [localState, setLocalState] = useState(reproject(objectCode, bytesPerLine));

  if (lastSeenState !== objectCode) {
    setLastSeenState(objectCode);
    setLocalState(reproject(objectCode, bytesPerLine));
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const stringValue = e.currentTarget.value;
    if (!/^[0-9a-fA-FzZ \n]*$/.exec(stringValue)) return;
    setLocalState(stringValue);
  };

  return (
    <div className="ObjectCodePane" data-testid="ObjectCodePane">
      <textarea
        spellCheck={false}
        cols={16 * bytesPerLine}
        onChange={onChange}
        value={localState}
      />
    </div>
  );
};

export default ObjectCodePane;

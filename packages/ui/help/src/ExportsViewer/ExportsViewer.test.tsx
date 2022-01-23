import React from 'react';
import { shallow } from 'enzyme';
import ExportsViewer from './ExportsViewer';

describe('<ExportsViewer />', () => {
  it('has been mounted', () => {
    const component = shallow(<ExportsViewer />);
    expect(component.length).toBe(1);
  });
});

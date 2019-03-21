import React from 'react';
import renderer from 'react-test-renderer';
import ComponentToTest from 'Pages/RangeSlider/Provider';
// import ReactTestUtils from 'react-dom/test-utils';

const props = {
  canShowTooltip: false,
  layout: '',
  top: '',
  children: ''
};

describe('context ', () => {
  const component = renderer.create(<ComponentToTest {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});

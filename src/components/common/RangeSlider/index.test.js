import React from 'react';
import renderer from 'react-test-renderer';
import ComponentToTest from 'components/common/RangeSlider';
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

import React from 'react';
import renderer from 'react-test-renderer';
import WithDualRangeSliderHOC from 'components/common/RangeSlider';
// import ReactTestUtils from 'react-dom/test-utils';

const DummyComponent = () => <span />;

const ComponentToTest = WithDualRangeSliderHOC(DummyComponent);

const props = {
  from: 21,
  to: 71
};

describe('context ', () => {
  const component = renderer.create(<ComponentToTest {...props} />);
  it('should match snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});

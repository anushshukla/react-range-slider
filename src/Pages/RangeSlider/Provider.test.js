import React from 'react';
import { mount } from 'enzyme';
import ComponentToTest from 'src/Pages/Provider';
import ReactTestUtils from 'react-dom/test-utils';

const props = {
  canShowTooltip: false,
  layout: '',
  top: '',
  children: '',
};

describe('context ', () => {
  const component = mount(<ComponentToTest {...props} />);
});

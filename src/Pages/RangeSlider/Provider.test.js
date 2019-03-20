import React from 'react';
import { mount } from 'enzyme';
import ComponentToTest from 'ComponentToTest';
import ContextProvider from '../../Context';
import TooltipBox from '../../TooltipBox';
import TooltipQuestionMark from '../../../../theme/TooltipQuestionMark';
import { act } from 'react-dom/test-utils';

const props = {
  canShowTooltip: false,
  layout: '',
  top: '',
  children: '',
};

describe('context ', () => {
  const component = mount(<ComponentToTest {...props} />);
});

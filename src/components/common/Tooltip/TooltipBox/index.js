import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TooltipBtmWrap = styled.div`
  display: block;
  width: 207px;
  background-color: #51505d;
  color: #fff;
  border-radius: 6px;
  text-align: left;
  padding: 11px;
  position: absolute;
  z-index: 4;
  border-radius: 3px;
  right: ${props => props.right};
  top: ${props => props.top};
  font: 300 12px/16px 'Roboto', sans-serif;
  &:before {
    content: '';
    position: absolute;
    right: ${props => props.afterRight};
    top: ${props => props.afterTop};
    margin-left: -5px;
    border-width: 6.5px;
    border-style: solid;
    border-color: transparent transparent #51505d transparent;
    transform: rotate ${props => props.rotate};
  }
`;

const TooltipBox = ({
  onFocus,
  onBlur,
  onMouseOver,
  onMouseOut,
  top,
  right,
  afterTop,
  afterRight,
  rotate,
  innerRef,
  children
}) => (
  <TooltipBtmWrap
    onFocus={onFocus}
    onBlur={onBlur}
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut}
    top={top}
    right={right}
    afterTop={afterTop}
    afterRight={afterRight}
    rotate={rotate}
    ref={innerRef}
  >
    {children}
  </TooltipBtmWrap>
);

TooltipBox.defaultProps = {
  onFocus() {},
  onBlur() {},
  onMouseOver() {},
  onMouseOut() {},
  innerRef() {},
  top: '35px',
  right: '-1px',
  afterTop: '-10px',
  afterRight: '7px',
  rotate: '(-0deg)'
};

TooltipBox.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  innerRef: PropTypes.func,
  top: PropTypes.string,
  right: PropTypes.string,
  afterTop: PropTypes.string,
  afterRight: PropTypes.string,
  rotate: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default TooltipBox;

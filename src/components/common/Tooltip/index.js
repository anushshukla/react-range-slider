import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TooltipBox from 'components/common/Tooltip/TooltipBox';
import { TooltipQuestionMark, FlexWrap } from 'components/common/styles';

const TooltipMainWrap = styled.div`
  -webkit-tap-highlight-color: transparent;
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const ToolTip = props => {
  let timeOut;
  const {
    canShowTooltip,
    isMobile,
    alignItems,
    id,
    top,
    right,
    afterTop,
    afterRight,
    children
  } = props;
  const initalState = {
    canShowTooltip,
    tooltipTop: 0
  };
  const tooltipElement = useRef(null);
  const tooltipBoxElement = useRef(null);
  const [state, setState] = useState(initalState);

  const hideTooltip = (event = {}) => {
    if (!state.canShowTooltip) {
      return;
    }
    event.stopPropagation();
    event.preventDefault();
    const isTooltipClicked = tooltipElement.current.contains(event.target);
    const isTooltipBoxClicked =
      tooltipBoxElement && tooltipBoxElement.current.contains(event.target);
    if (
      ((isTooltipClicked && !isMobile()) || isTooltipBoxClicked) &&
      event.type === 'click'
    ) {
      return;
    }
    timeOut = setTimeout(() => setState({ canShowTooltip: false }), 250);
  };

  const toggleDocClickListner = action =>
    document.body[`${action}EventListener`]('click', hideTooltip, false);

  const addDocClickListner = () => toggleDocClickListner('add');

  const removeDocClickListner = () => toggleDocClickListner('remove');

  const afterShowingTooltip = () => {
    if (isMobile()) addDocClickListner();
    if (state.canShowTooltip) {
      setState({
        tooltipTop:
          (tooltipBoxElement.current.scrollHeight -
            tooltipElement.current.scrollHeight) /
          2,
        tooltipLeft:
          (tooltipBoxElement.current.scrollWidth -
            tooltipElement.current.scrollWidth) /
          2
      });
    }
  };

  const showTooltip = event => {
    event.stopPropagation();
    event.preventDefault();
    clearTimeout(timeOut);
    if (state.canShowTooltip && isMobile() && event.type === 'click') {
      hideTooltip();
      return;
    }
    setState({ canShowTooltip: true }, afterShowingTooltip);
  };

  const getTop = () => (isMobile() ? '35px' : `-${state.tooltipTop}px`);

  const getRight = () => (isMobile() ? `-18px` : '-238px');

  const getArrowDirection = () => (isMobile() ? '' : '(-87deg)');

  const getAfterTop = () => (isMobile() ? '-12px' : 'calc(50%)');

  const getAfterRight = () => (isMobile() ? `calc(10%)` : '228px');

  const getTooltipQuestionMarkProps = () => {
    if (isMobile()) {
      return {
        onClick: showTooltip
      };
    }
    return {
      onMouseOver: showTooltip,
      onMouseOut: hideTooltip
    };
  };

  // @todo make tooltip content box position adjust as per viewport screen size
  /* getElementPos = element => {
    let node = element;
    let top = 0;
    let left = 0;
    let curTop = 0;
    let curLeft = 0;
    let curLeftscroll = 0;
    let curTopscroll = 0;
    if (node.offsetParent) {
      do {
        curTop += node.offsetTop;
        curLeft += node.offsetLeft;
        curTopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
        curLeftscroll += node.offsetParent ? node.offsetParent.scrollLeft : 0;
      } while ((node = node.offsetParent)); // eslint-disable-line no-cond-assign
      top = curTop - curTopscroll;
      left = curLeft - curLeftscroll;
    }
    return { top, left };
  };
  componentDidMount = () => {
    tooltipBoxElement.current.offsetWidth
  } */
  useEffect(() => {
    return () => {
      removeDocClickListner();
    };
  });

  return (
    <FlexWrap alignItems={alignItems}>
      <TooltipMainWrap>
        <TooltipQuestionMark
          {...getTooltipQuestionMarkProps()}
          isActive={state.canShowTooltip}
          ref={tooltipElement}
          id={id}
        />
        {state.canShowTooltip && (
          <TooltipBox
            {...getTooltipQuestionMarkProps()}
            ref={tooltipBoxElement}
            top={top || getTop()}
            right={right || getRight()}
            afterTop={afterTop || getAfterTop()}
            afterRight={afterRight || getAfterRight()}
            rotate={getArrowDirection()}
          >
            {children}
          </TooltipBox>
        )}
      </TooltipMainWrap>
    </FlexWrap>
  );
};

ToolTip.defaultProps = {
  canShowTooltip: false,
  children: '',
  id: '',
  alignItems: 'flex-end',
  isMobile() {},
  top: undefined,
  right: undefined,
  afterTop: undefined,
  afterRight: undefined
};

ToolTip.propTypes = {
  isMobile: PropTypes.func,
  canShowTooltip: PropTypes.bool,
  id: PropTypes.string,
  top: PropTypes.string,
  right: PropTypes.string,
  afterTop: PropTypes.string,
  afterRight: PropTypes.string,
  alignItems: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

export default ToolTip;

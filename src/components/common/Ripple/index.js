import React, { useRef, memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentWindowWidth } from 'helpers/device';
import { Relative, Absolute, RippleElement } from 'components/common/styles';

const Ripple = props => {
  const { afterClick, getWrapperRef, onMouseDown, color } = props;
  const [state, setState] = useState({
    window: { width: getCurrentWindowWidth() },
    wrapper: { width: 0, height: 0 }
  });
  const [canShowRipple, setCanShowRipple] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [scale, setScale] = useState(0);
  const time = 0.5;
  let timeOut;
  const setStateCb = updateState => latestState => ({
    ...latestState,
    ...updateState
  });
  const updateScreenSize = () => {
    setState(setStateCb({ window: { width: getCurrentWindowWidth() } }));
  };
  const rippleTimedOut = () => setCanShowRipple(false);
  const onTouchEnd = event => {
    if (isMoving) return;
    event.persist();
    afterClick(event);
  };
  const showRipple = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const mouseToTouchEventMock = [
      { clientX: event.pageX, clientY: event.pageX }
    ];
    const { touches = mouseToTouchEventMock } = event;
    const { clientX, clientY } = touches[0];
    const x = clientX - bounds.left;
    const y = clientY - bounds.top;
    setIsMoving(false);
    setCanShowRipple(true);
    setLeft(`${x}px`);
    setTop(`${y}px`);
    setScale(bounds.width);
    if (timeOut) clearTimeout(timeOut);
    timeOut = setTimeout(rippleTimedOut, time * 1000);
  };
  const onTouchMove = () => setIsMoving(true);
  useEffect(() => {
    const element = getWrapperRef();
    const { width, height } = element.getBoundingClientRect();
    setState({ ...state, width, height });
    window.addEventListener('resize', updateScreenSize, false);
    window.addEventListener('orientationchange', updateScreenSize, false);
    return () => {
      clearTimeout(timeOut);
      window.removeEventListener('resize', updateScreenSize);
      window.removeEventListener('orientationchange', updateScreenSize);
    };
  }, {});
  const rippleProps = {
    canShowRipple,
    left,
    top,
    scale,
    time: `${time}s`
  };
  return (
    <Relative
      onTouchStart={showRipple}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      width={`${state.wrapper.width}px`}
      height={`${state.wrapper.height}px`}
    >
      {canShowRipple && <RippleElement color={color} {...rippleProps} />}
    </Relative>
  );
};

Ripple.defaultProps = {
  afterClick() {},
  onMouseDown: undefined
};

Ripple.propTypes = {
  afterClick: PropTypes.func,
  onMouseDown: PropTypes.func,
  getWrapperRef: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  isMobile: PropTypes.func.isRequired
};

export const RippleWrap = ({ children, ...props }) => {
  const wrapperRef = useRef(null);
  return (
    <Relative overflow="hidden">
      <div ref={wrapperRef}>{children}</div>
      <Absolute top={0} left={0}>
        <Ripple {...props} getWrapperRef={() => wrapperRef.current} />
      </Absolute>
    </Relative>
  );
};

RippleWrap.propTypes = {
  children: PropTypes.node.isRequired
};

export default memo(RippleWrap);

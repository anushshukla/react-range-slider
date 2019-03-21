import React, { useState, useEffect, useRef, memo } from 'react';
import PropTypes from 'prop-types';

const getCurrentWindowWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

const getNearestMultipleOf = (number, multiplier) =>
  Math.round(number / multiplier) * multiplier;

const WithDualRangeSliderHOC = Component => {
  const WithDualRangeSlider = props => {
    const wrapperRef = useRef(null);
    const sliderIconRef = useRef(null);
    const { to, from } = props;
    const getUnit = () => 100 / (to - from);
    const getRangeStartLeft = () =>
      getUnit() * (props.defaultRangeStart - from);
    const getRangeEndLeft = () => getUnit() * (props.defaultRangeEnd - from);
    const initialState = {
      rangeSliderWidth: 0,
      activeRange: '',
      unit: getUnit(),
      rangeStartLeft: getRangeStartLeft(),
      rangeEndLeft: getRangeEndLeft(),
      isTouchActive: false,
      window: {
        width: getCurrentWindowWidth()
      }
    };
    const [state, setState] = useState(initialState);
    const getSelectedRangeWidth = () =>
      state.rangeEndLeft - state.rangeStartLeft;
    const getRangeStart = (currentState = state) =>
      Math.round(currentState.rangeStartLeft / state.unit + from);
    const getRangeEnd = (currentState = state) =>
      Math.round(currentState.rangeEndLeft / state.unit + from);
    const getRange = () => ({
      start: getRangeStart(),
      end: getRangeEnd()
    });
    const getSliderIconDiameter = () =>
      Math.round((state.unit * state.rangeSliderWidth) / 100) - 1;
    const getXFromEvent = event => {
      const leftAbsolute =
        'ontouchstart' in window ? event.touches[0].clientX : event.pageX;
      const leftOffset =
        leftAbsolute - event.currentTarget.getBoundingClientRect().left;
      if (leftOffset > state.rangeSliderWidth) {
        return state.rangeSliderWidth;
      }
      if (leftOffset < 0) {
        return 0;
      }
      const finalLeftOffset = leftOffset - state.sliderIconDiameter;
      return finalLeftOffset;
    };
    const getLeftPercent = event =>
      (getXFromEvent(event) / state.rangeSliderWidth) * 100;
    const setStateCb = updateState => latestState => ({
      ...latestState,
      ...updateState
    });
    const onDragStart = event => {
      event.preventDefault();
      event.stopPropagation();
      return false;
    };
    const onContextMenu = event => {
      event.preventDefault();
      return false;
    };
    const onTouchStart = event => {
      const left = getLeftPercent(event);
      const { rangeStartLeft, rangeEndLeft } = state;
      const rangeStartLeftDiff = Math.abs(rangeStartLeft - left);
      const rangeEndLeftDiff = Math.abs(rangeEndLeft - left);
      const activeRange =
        rangeStartLeftDiff < rangeEndLeftDiff
          ? 'rangeStartLeft'
          : 'rangeEndLeft';
      const updateState = {
        ...state,
        [activeRange]: getNearestMultipleOf(left, state.unit),
        activeRange,
        isTouchActive: true
      };
      const rangeDiff = getRangeEnd(updateState) - getRangeStart(updateState);
      const canMove = rangeDiff >= props.rangeDiffLimit;
      if (!canMove) return;
      setState(updateState);
    };
    const onMove = event => {
      if (!state.isTouchActive) return;
      const left = getLeftPercent(event);
      const updateState = {
        ...state,
        [state.activeRange]: getNearestMultipleOf(
          left,
          state.unit,
          state.activeRange
        )
      };
      const rangeDiff = getRangeEnd(updateState) - getRangeStart(updateState);
      const canMove = rangeDiff >= props.rangeDiffLimit;
      if (!canMove) return;
      setState(updateState);
    };
    const onTouchEnd = () =>
      setState(setStateCb({ activeRange: '', isTouchActive: false }));
    const updateScreenSize = () => {
      setState(setStateCb({ window: { width: getCurrentWindowWidth() } }));
    };
    const isActiveRange = range => state.activeRange === range;
    /*
     * below use effect gets called only
     * if window width screen changes including on load
     * as range slider's width is fetched via ref
     * along with diameter of both the slider icons
     */
    useEffect(() => {
      const {
        width: rangeSliderWidth
      } = wrapperRef.current.getBoundingClientRect();
      const {
        width: sliderIconDiameter
      } = sliderIconRef.current.getBoundingClientRect();
      setState(
        setStateCb({
          rangeSliderWidth,
          sliderIconDiameter
        })
      );
      window.addEventListener('mouseup', onTouchEnd, false);
      window.addEventListener('resize', updateScreenSize, false);
      window.addEventListener('orientationchange', updateScreenSize, false);
      return () => {
        window.removeEventListener('mouseup', onTouchEnd);
        window.removeEventListener('resize', updateScreenSize);
        window.removeEventListener('orientationchange', updateScreenSize);
      };
    }, [state.window.width]);
    /*
     * below use effect gets called only
     * if rangeStartLeft (state), rangeEndLeft (state) or from (props) gets changed
     * as getRange is calculated upon it
     * and onAfterChange (props) hook is to be called when getRange value changes
     */
    useEffect(() => {
      props.onAfterChange(getRange());
    }, [state.rangeStartLeft, state.rangeEndLeft, from]);
    /*
     * below use effect gets called only
     * if from (props) or to (props) gets changed
     * as unit, rangeStartLeft and rangeEndLeft is calculated again
     */
    useEffect(() => {
      setState(
        setStateCb({
          unit: getUnit(),
          rangeStartLeft: getRangeStartLeft(),
          rangeEndLeft: getRangeEndLeft()
        })
      );
    }, [from, to]);
    return (
      <Component
        {...props}
        {...state}
        onTouchStart={onTouchStart}
        onMove={onMove}
        onTouchEnd={onTouchEnd}
        onDragStart={onDragStart}
        onContextMenu={onContextMenu}
        selectedRangeWidth={getSelectedRangeWidth()}
        getRange={getRange}
        getSliderIconDiameter={getSliderIconDiameter}
        wrapperRef={wrapperRef}
        isActiveRange={isActiveRange}
        sliderIconRef={sliderIconRef}
      />
    );
  };

  WithDualRangeSlider.defaultProps = {
    defaultRangeStart: 0,
    defaultRangeEnd: 0,
    onAfterChange() {}
  };

  WithDualRangeSlider.propTypes = {
    from: PropTypes.number.isRequired,
    to: PropTypes.number.isRequired,
    rangeDiffLimit: PropTypes.number.isRequired,
    defaultRangeStart: PropTypes.number,
    defaultRangeEnd: PropTypes.number,
    onAfterChange: PropTypes.func
  };

  return memo(WithDualRangeSlider);
};

export default WithDualRangeSliderHOC;

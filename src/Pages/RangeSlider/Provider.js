import React, { useState, useEffect, useRef, memo } from "react";

const WithDualRangeSliderHOC = Component => {
  const WithDualRangeSlider = props => {
    const wrapperRef = useRef(null);
    const getScale = () => props.scale || props.to - props.from;
    const getUnit = () => 100 / getScale();
    const initialState = {
      rangeSliderWidth: 0,
      rangeStartLeft: getUnit() * (props.defaultRangeStart - props.from),
      rangeEndLeft: getUnit() * (props.defaultRangeEnd - props.from),
      activeRange: '',
      isTouchActive: false,
    };
    const [state, setState] = useState(initialState);
    const getXFromEvent = event => {
      const leftAbsolute = !!('ontouchstart' in window) ? event.touches[0].clientX : event.pageX;
      const leftOffset = leftAbsolute - event.currentTarget.getBoundingClientRect().left;
      if (leftOffset > state.rangeSliderWidth) {
        return state.rangeSliderWidth;
      } else if (leftOffset < 0) {
        return 0;
      } else {
        return leftOffset;
      }
    }
    const getLeftPercent = event =>
      getXFromEvent(event) / state.rangeSliderWidth * 100;
    const getRoundedLeft = (percent, activeRange) => Math.floor(percent/getUnit())*getUnit();
    const setStateCb = updateState => latestState => ({
      ...latestState,
      ...updateState
    }) 
    const onTouchStart = event => {
      const left = getLeftPercent(event);
      const { rangeStartLeft, rangeEndLeft }  = state;
      const rangeStartLeftDiff = Math.abs(rangeStartLeft - left);
      const rangeEndLeftDiff = Math.abs(rangeEndLeft - left);
      const activeRange = rangeStartLeftDiff < rangeEndLeftDiff ? 'rangeStartLeft' : 'rangeEndLeft';
      const updateState = { ...state, [activeRange]: getRoundedLeft(left, activeRange), activeRange, isTouchActive: true };
      const rangeDiff = Math.abs(getRangeStart(updateState) - getRangeEnd(updateState));
      const canMove = rangeDiff >= props.rangeDiffLimit;
      if (!canMove) return;
      setState(updateState);
    }
    const onMove = event => {
      if (!state.isTouchActive) return;
      const left = getLeftPercent(event);
      const updateState = { ...state, [state.activeRange]: getRoundedLeft(left, state.activeRange) };
      const rangeDiff = getRangeEnd(updateState) - getRangeStart(updateState);
      const canMove = rangeDiff >= props.rangeDiffLimit;
      if (!canMove) return;
      setState(updateState);
    }
    const onTouchEnd = event => {
      const updateState = { activeRange: '', isTouchActive: false };
      setState(setStateCb(updateState));
    }
    const getSelectedRangeWidth = () => state.rangeEndLeft - state.rangeStartLeft;
    const getRangeStart = () =>
      Math.round(state.rangeStartLeft / getUnit() + props.from);
    const getRangeEnd = () =>
      Math.round(state.rangeEndLeft / getUnit() + props.from);
    const getRange = () => ({
      start: getRangeStart(),
      end: getRangeEnd()
    })
    const updateScreenSize = event => {
      const currentWindowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      setState(setStateCb({ window: { width: currentWindowWidth } }));
    }
    const getSliderIconDiameter = () => Math.floor(getUnit() * state.rangeSliderWidth / 100) - 1;
    const isActiveRange = range => state.activeRange === range;
    useEffect(() => {
      const { width: rangeSliderWidth } = wrapperRef.current.getBoundingClientRect();
      const updateState = { ...state, rangeSliderWidth: rangeSliderWidth };
      setState(updateState);
      window.addEventListener('mouseup', onTouchEnd, false);
      window.addEventListener("resize", updateScreenSize, false);
      window.addEventListener("orientationchange", updateScreenSize, false);
      return () => {
        window.removeEventListener('mouseup', onTouchEnd);
        window.removeEventListener('resize', updateScreenSize);
        window.removeEventListener('orientationchange', updateScreenSize);
      }
    }, {});
    /*
     * below use effect gets called only
     * if rangeStartLeft (state), rangeEndLeft (state) or from (props) gets changed
     * as getRange is calculated upon it
     * and onAfterChange (props) hook is to be called when getRange value changes
     */
    // 
    useEffect(() => {
      props.onAfterChange(getRange());
    }, [state.rangeStartLeft, state.rangeEndLeft, props.from])
    return <Component
        onTouchStart={onTouchStart}
        onMove={onMove}
        onTouchEnd={onTouchEnd}
        selectedRangeWidth={getSelectedRangeWidth()}
        {...state}
        isActiveRange={isActiveRange}
        getRange={getRange}
        getSliderIconDiameter={getSliderIconDiameter}
        wrapperRef={wrapperRef}
        {...props}
      />
  }
  WithDualRangeSlider.defaultProps = {
    defaultRangeStart: 0,
    defaultRangeEnd: 0,
    onAfterChange(){}
  }
  return memo(WithDualRangeSlider);
};

export default WithDualRangeSliderHOC;
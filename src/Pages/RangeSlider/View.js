import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  DualRangeSliderSection,
  Flex,
  RangeValue,
  SliderLineContainer,
  SliderLineWrapper,
  SliderLine,
  SelectedSliderLine,
  LeftSliderIcon,
  RightSliderIcon
} from './styles';

const View = props => {
  const isTouchSupported = !!('ontouchstart' in window);
  const start = isTouchSupported ? 'onTouchStart' : 'onMouseDown';
  const up = isTouchSupported ? 'onTouchEnd' : 'onMouseUp';
  const move = isTouchSupported ? 'onTouchMove' : 'onMouseMove';
  const {
    getSliderIconDiameter,
    onTouchStart,
    onMove,
    onTouchEnd,
    onDragStart,
    onContextMenu,
    isActiveRange,
    getRange,
    rangeStartLeft,
    rangeEndLeft,
    wrapperRef,
    selectedRangeWidth,
    sliderIconRef
  } = props;
  const eventListners = {
    [start]: onTouchStart,
    [move]: onMove,
    [up]: onTouchEnd,
    onDragStart
  };
  const sliderIconScaling = activeRange => (isActiveRange(activeRange) ? 2 : 1);
  const sliderRangeHeight = 2;
  const sliderIconPosTop = (getSliderIconDiameter() - sliderRangeHeight) / 2;
  return (
    <DualRangeSliderSection>
      <Flex>
        <RangeValue>From {getRange().start} years</RangeValue>
        <RangeValue textAlign="right">To {getRange().end} years</RangeValue>
      </Flex>
      <SliderLineContainer onContextMenu={onContextMenu}>
        <SliderLineWrapper {...eventListners}>
          <SliderLine ref={wrapperRef} height={`${sliderRangeHeight}px`}>
            <SelectedSliderLine
              left={`${rangeStartLeft}%`}
              width={`${selectedRangeWidth}%`}
            />
            <LeftSliderIcon
              diameter={`${getSliderIconDiameter()}px`}
              top={`-${sliderIconPosTop}px`}
              positionFrom="right"
              positionAt={`${100 - rangeStartLeft}%`}
              scale={sliderIconScaling('rangeStartLeft')}
              ref={sliderIconRef}
            />
            <RightSliderIcon
              diameter={`${getSliderIconDiameter()}px`}
              top={`-${sliderIconPosTop}px`}
              positionFrom="left"
              positionAt={`${rangeEndLeft}%`}
              scale={sliderIconScaling('rangeEndLeft')}
            />
          </SliderLine>
        </SliderLineWrapper>
      </SliderLineContainer>
      <div className="range-ruler">
        <div className="range-start" />
        <div className="range-end" />
      </div>
    </DualRangeSliderSection>
  );
};

View.propTypes = {
  getSliderIconDiameter: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  isActiveRange: PropTypes.func.isRequired,
  getRange: PropTypes.func.isRequired,
  rangeStartLeft: PropTypes.number.isRequired,
  rangeEndLeft: PropTypes.number.isRequired,
  wrapperRef: PropTypes.shape({}).isRequired,
  selectedRangeWidth: PropTypes.number.isRequired,
  sliderIconRef: PropTypes.shape({}).isRequired
};

export default memo(View);

import React, { memo } from "react";
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
  const up = isTouchSupported ? 'onTouchEnd'   : 'onMouseUp';
  const move = isTouchSupported ? 'onTouchMove'  : 'onMouseMove';
  const {
    getSliderIconDiameter,
    onTouchStart,
    onMove,
    onTouchEnd,
    isActiveRange,
    getRange,
    rangeStartLeft,
    rangeEndLeft,
    wrapperRef,
    selectedRangeWidth
  } = props;
  const eventListners = {
    [start]: onTouchStart,
    [move]: onMove,
    [up]: onTouchEnd,
  };
  const sliderIconScaling = activeRange => isActiveRange(activeRange) ? 2 : 1;
  const sliderRangeHeight = 2;
  const sliderIconPosTop = (getSliderIconDiameter() - sliderRangeHeight) / 2;
  return (
    <DualRangeSliderSection>
      <Flex>
        <RangeValue>From {getRange().start} years</RangeValue>
        <RangeValue textAlign="right">To {getRange().end} years</RangeValue>
      </Flex>
      <SliderLineContainer>
        <SliderLineWrapper {...eventListners}>
          <SliderLine ref={wrapperRef} height={`${sliderRangeHeight}px`} >
            <SelectedSliderLine left={`${rangeStartLeft}%`} width={`${selectedRangeWidth}%`} />
            <LeftSliderIcon
              diameter={`${getSliderIconDiameter()}px`}
              top={`-${sliderIconPosTop}px`}
              left={`${rangeStartLeft}%`}
              scale={sliderIconScaling('rangeStartLeft')}
            />
            <RightSliderIcon
              diameter={`${getSliderIconDiameter()}px`}
              top={`-${sliderIconPosTop}px`}
              positionFrom={`${rangeEndLeft === 100 ? 'right' : 'left'}`}
              positionAt={`${rangeEndLeft === 100 ? 0 : `${rangeEndLeft}%`}`}
              scale={sliderIconScaling('rangeEndLeft')}
            />
          </SliderLine>
        </SliderLineWrapper>
      </SliderLineContainer>
      <div className='range-ruler'>
        <div className='range-start' />
        <div className='range-end' />
      </div>
    </DualRangeSliderSection>
  );
};

export default memo(View);
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  DualRangeSliderSection,
  Flex,
  RangeValue,
  SliderLineContainer,
  SliderLine,
  SelectedSliderLine,
  LeftSliderIcon,
  RightSliderIcon
} from './styles';

const View = props => {
  const {
    getSliderIconDiameter,
    eventListners,
    isActiveRange,
    getRange,
    rangeStartLeft,
    rangeEndLeft,
    selectedRangeWidth,
    wrapperRef,
    leftSliderIconRef,
    rightSliderIconRef,
    rangeSliderWidth
  } = props;
  const sliderIconScaling = activeRange => (isActiveRange(activeRange) ? 2 : 1);
  const sliderRangeHeight = 2;
  const sliderIconPosTop = (getSliderIconDiameter() - sliderRangeHeight) / 2;
  return (
    <DualRangeSliderSection>
      <Flex>
        <RangeValue>From {getRange().start} years</RangeValue>
        <RangeValue textAlign="right">To {getRange().end} years</RangeValue>
      </Flex>
      <SliderLineContainer {...eventListners}>
        <SliderLine ref={wrapperRef} height={`${sliderRangeHeight}px`}>
          <SelectedSliderLine
            scale={selectedRangeWidth / 100}
            translate={`${(rangeStartLeft / 100) * rangeSliderWidth}px`}
            height={`${sliderRangeHeight}px`}
          />
          <LeftSliderIcon
            diameter={`${getSliderIconDiameter()}px`}
            top={`-${sliderIconPosTop}px`}
            scale={sliderIconScaling('rangeStartLeft')}
            ref={leftSliderIconRef}
            translate={`-${rangeSliderWidth -
              (rangeStartLeft / 100) * rangeSliderWidth}px`}
          />
          <RightSliderIcon
            diameter={`${getSliderIconDiameter()}px`}
            top={`-${sliderIconPosTop}px`}
            scale={sliderIconScaling('rangeEndLeft')}
            ref={rightSliderIconRef}
            translate={`${(rangeEndLeft / 100) * rangeSliderWidth}px`}
          />
        </SliderLine>
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
  isActiveRange: PropTypes.func.isRequired,
  getRange: PropTypes.func.isRequired,
  rangeStartLeft: PropTypes.number.isRequired,
  rangeEndLeft: PropTypes.number.isRequired,
  wrapperRef: PropTypes.shape({}).isRequired,
  selectedRangeWidth: PropTypes.number.isRequired,
  leftSliderIconRef: PropTypes.shape({}).isRequired,
  rightSliderIconRef: PropTypes.shape({}).isRequired,
  eventListners: PropTypes.shape({}).isRequired,
  rangeSliderWidth: PropTypes.number.isRequired
};

export default memo(View);

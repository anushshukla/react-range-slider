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
    wrapperRef,
    selectedRangeWidth,
    sliderIconRef,
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
            width={`${selectedRangeWidth}%`}
            translate={`${(rangeStartLeft / 100) * rangeSliderWidth}px`}
          />
          <LeftSliderIcon
            diameter={`${getSliderIconDiameter()}px`}
            top={`-${sliderIconPosTop}px`}
            translate={`-${rangeSliderWidth -
              (rangeStartLeft / 100) * rangeSliderWidth}px`}
            scale={sliderIconScaling('rangeStartLeft')}
            ref={sliderIconRef}
          />
          <RightSliderIcon
            diameter={`${getSliderIconDiameter()}px`}
            top={`-${sliderIconPosTop}px`}
            translate={`${(rangeEndLeft / 100) * rangeSliderWidth}px`}
            scale={sliderIconScaling('rangeEndLeft')}
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
  sliderIconRef: PropTypes.shape({}).isRequired,
  eventListners: PropTypes.shape({}).isRequired,
  rangeSliderWidth: PropTypes.number.isRequired
};

export default memo(View);

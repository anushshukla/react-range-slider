import React from "react";
import { 
  Flex,
  RangeValue,
  SliderLine,
  SelectedSliderLine,
  SliderIcon
} from './styles';
import "./styles.css";

const WithDualRangeSlider2HOC = Component => props => {
  class WithDualRangeSlider2 extends React.Component {
    getUnit = () => this.props.scale/this.props.boxSize;
    state = {
      rangeStartLeft: this.getUnit() * 100 * (this.props.defaultRangeStart - this.props.rangeStartMin),
      rangeEndLeft: this.getUnit() * 100 * (this.props.defaultRangeEnd - this.props.rangeStartMin),
      activeRange: ''
    };
    getXFromEvent = event => {
      const leftAbsolute = !!('ontouchstart' in window) ? event.touches[0].clientX : event.pageX;
      const leftOffset = leftAbsolute - event.currentTarget.getBoundingClientRect().left;
      if (leftOffset > this.props.boxSize) {
        return this.props.boxSize;
      } else if (leftOffset < 0) {
        return 0;
      } else {
        return leftOffset;
      }
    }
    getLeft = event =>
      Math.round(this.getXFromEvent(event) / this.props.scale) * this.getUnit() * 100
    onTouchStart = event => {
      const left = this.getLeft(event);  
      this.setState(state => {
        const { rangeStartLeft, rangeEndLeft }  = state;
        const rangeStartLeftDiff = Math.abs(rangeStartLeft - left);
        const rangeEndLeftDiff = Math.abs(rangeEndLeft - left);
        const activeRange = rangeStartLeftDiff < rangeEndLeftDiff ? 'rangeStartLeft' : 'rangeEndLeft';
        const updateState = { ...state, [activeRange]: left, activeRange };
        const rangeDiff = Math.abs(this.getRangeStart(updateState) - this.getRangeEnd(updateState));
        if (rangeDiff < props.rangeDiffLimit) {
          return null;
        }
        return updateState;
      });
    }
    onTouchMove = event => {
      const left = this.getLeft(event);  
      this.setState(({ activeRange, ...state }) => {
        const updateState = { ...state, [activeRange]: left };
        const rangeDiff = Math.abs(this.getRangeStart(updateState) - this.getRangeEnd(updateState));
        if (rangeDiff < props.rangeDiffLimit) {
          return null;
        }
        return updateState;
      });
    }
    onTouchEnd = event => {
      this.setState({ activeRange: '' });
    }
    get selectedRangeWidth() {
      return this.state.rangeEndLeft - this.state.rangeStartLeft;
    }
    getRangeStart = (state = this.state) =>
      Math.round(state.rangeStartLeft / this.getUnit() / 100, 10) + this.props.rangeStartMin;
    getRangeEnd = (state = this.state) =>
      Math.round(state.rangeEndLeft / this.getUnit() / 100, 10) + this.props.rangeStartMin;
    isActiveRange = range => this.state.activeRange === range;
    render = () => (
      <Component
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        selectedRangeWidth={this.selectedRangeWidth}
        {...this.state}
        isActiveRange={this.isActiveRange}
        range={{
          start: this.getRangeStart(),
          end: this.getRangeEnd(),
        }}
        {...this.props}
      />
    );
  }
  WithDualRangeSlider2.defaultProps = {
    defaultRangeStart: 50,
    defaultRangeEnd: 8000,
    boxSize: 270
  }
  return <WithDualRangeSlider2 {...props} />;
};

const Slider2 = props => {
  const isTouchSupported = !!('ontouchstart' in window);
  const start = isTouchSupported ? 'onTouchStart' : 'onMouseDown';
  const up = isTouchSupported ? 'onTouchEnd'   : 'onMouseUp';
  const move = isTouchSupported ? 'onTouchMove'  : 'onMouseMove';
  const eventListners = {
    [start]: props.onTouchStart,
    [up]: props.onTouchEnd,
    [move]: props.onTouchMove,
  };
  return (
    <section className="range-slider">
      <Flex>
        <RangeValue>From {props.range.start} years</RangeValue>
        <RangeValue>To {props.range.end} years</RangeValue>
      </Flex>
      <div style={{ margin: '15px 0'}}>
        <div style={{ padding: '10px 0'}} {...eventListners}>
        <SliderLine>
          <SelectedSliderLine left={`${props.rangeStartLeft}%`} width={`${props.selectedRangeWidth}%`} />
          <SliderIcon
            left={`${props.rangeStartLeft}%`}
            scale={props.isActiveRange('rangeStartLeft') ? 2 : 1}
          />
          <SliderIcon
            left={`${props.rangeEndLeft}%`}
            scale={props.isActiveRange('rangeEndLeft') ? 2 : 1}
          />
        </SliderLine>
        </div>
      </div>
      <div className='range-ruler'>
        <div className='range-start' />
        <div className='range-end' />
      </div>
    </section>
  );
};

const SliderWithDrag2 = WithDualRangeSlider2HOC(Slider2);

const onAfterChange = state => console.log(state);

export const Version2 = props => <SliderWithDrag2 onAfterChange={onAfterChange} {...props} />

export default Version2;

import React from "react";
import { Link } from 'react-router-dom';
import { 
  Flex,
  RangeValue,
  SliderLine,
  SelectedSliderLine,
  SliderIcon
} from './styles';
import "./styles.css";

const Menu = props => 
  <>
    <div>
      <Link to="version-1">
        Version 1
      </Link>
    </div>
    <div>
      <Link to="version-2">
        Version 2
      </Link>
    </div>
  </>

const WithDualRangeSlider2HOC = Component => props => {
  class WithDualRangeSlider2 extends React.Component {
    getUnit = () => this.props.scale/this.props.boxSize;
    state = {
      rangeStartLeft: this.getUnit() * 100 * (this.props.defaultRangeStart - this.props.rangeStartMin),
      rangeEndLeft: this.getUnit() * 100 * (this.props.defaultRangeEnd - this.props.rangeStartMin),
      activeRange: ''
    };
    onInputRangeChange = rangePosition => event => {
      event.persist();
      const value = Number.parseInt(
        event.target.value,
        10
      );
      this.setState(state => {
        const { range } = state;
        
        return {
          ...state,
          range: {
            ...range,
            [rangePosition]: value
          }
        };
      }, this.afterOnChange);
    };
    getXFromEvent = event => {
      const leftOffset = event.touches[0].clientX - event.currentTarget.getBoundingClientRect().left;
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

const Slider2 = props => (
  <section className="range-slider">
    <Flex>
      <RangeValue>From {props.range.start} years</RangeValue>
      <RangeValue>To {props.range.end} years</RangeValue>
    </Flex>
    <SliderLine
      onTouchStart={props.onTouchStart}
      onTouchMove={props.onTouchMove}
      onTouchEnd={props.onTouchEnd}
    >
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
    <div className='range-ruler'>
      <div className='range-start' />
      <div className='range-end' />
    </div>
  </section>
);

const SliderWithDrag2 = WithDualRangeSlider2HOC(Slider2);

const onAfterChange = state => console.log(state);

export const Version2 = props =>
  <>
    <Menu />
    <SliderWithDrag2 onAfterChange={onAfterChange} {...props} />
  </>

export default Version2;

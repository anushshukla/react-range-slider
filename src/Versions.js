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

const WithDualRangeSliderHOC = Component => props => {
  class WithDualRangeSlider extends React.Component {
    state = {
      range: {
        start: this.props.defaultRangeStart || 50,
        end: this.props.defaultRangeEnd || 8000
      }
    };
    afterOnChange = () => {
      this.props.onAfterChange &&
        this.props.onAfterChange(this.state);
    };
    onInputRangeChange = rangePosition => event => {
      event.persist();
      const value = Number.parseInt(
        event.target.value,
        10
      );
      this.setState(state => {
        const { range } = state;
        if (
          rangePosition === "start" &&
          (value > range.end ||
            value < this.props.rangeStartMin ||
            value > this.props.rangeStartMax)
        ) {
          return null;
        }
        if (
          rangePosition === "end" &&
          (value < range.start ||
            value < this.props.rangeEndMin ||
            value > this.props.rangeEndMax)
        ) {
          return null;
        }
        return {
          ...state,
          range: {
            ...range,
            [rangePosition]: value
          }
        };
      }, this.afterOnChange);
    };
    disableKeyPadOpen = event =>
      event.preventDefault();
    render = () => (
      <Component
        {...this.state}
        onInputRangeChange={this.onInputRangeChange}
        {...this.props}
      />
    );
  }
  return <WithDualRangeSlider {...props} />;
};

const WithDualRangeSlider2HOC = Component => props => {
  class WithDualRangeSlider2 extends React.Component {
    state = {
      rangeStartLeft: parseInt(100/this.props.scale * (this.props.defaultRangeStart - this.props.rangeStartMin), 10),
      rangeEndLeft: parseInt(100/this.props.scale * (this.props.rangeStartMin + this.props.scale - this.props.defaultRangeEnd), 10),
      range: {
        start: this.props.defaultRangeStart,
        end: this.props.defaultRangeEnd,
      }
    };
    onInputRangeChange = rangePosition => event => {
      event.persist();
      const value = Number.parseInt(
        event.target.value,
        10
      );
      this.setState(state => {
        const { range } = state;
        if (
          rangePosition === "start" &&
          (value > range.end ||
            value < this.props.rangeStartMin ||
            value > this.props.rangeStartMax)
        ) {
          return null;
        }
        if (
          rangePosition === "end" &&
          (value < range.start ||
            value < this.props.rangeEndMin ||
            value > this.props.rangeEndMax)
        ) {
          return null;
        }
        return {
          ...state,
          range: {
            ...range,
            [rangePosition]: value
          }
        };
      }, this.afterOnChange);
    };
    getXFromEvent = event => event.touches[0].pageX || event.touches[0].clientX;
    onTouchStart = event => {
      const cordX = this.getXFromEvent(event);
      const left =  parseInt(cordX/this.props.boxSize * 100, 10);
      const rangeStartLeftDiff = Math.abs(this.state.rangeStartLeft - left);
      const rangeEndLeftDiff = Math.abs(this.state.rangeEndLeft - left);
      this.setState(state => {
        let rangeStartLeft = state.rangeStartLeft;
        let rangeEndLeft = state.rangeEndLeft;
        if (rangeStartLeftDiff > rangeEndLeftDiff) {
          rangeStartLeft = left;
        } else {
          rangeEndLeft = left;
        }
        const updateState = { rangeStartLeft, rangeEndLeft };
        console.error('onTouchStart', left, state, updateState);
        return updateState;
      });
    }
    onTouchMove = event => {
      const cordX = this.getXFromEvent(event);
      const left =  parseInt(cordX/this.props.boxSize * 100, 10);
      console.error('onTouchMove', left);
      this.setState({ isMoving: true });
      if (left === this.state.rangeStartLeft) {
        this.setState({ rangeStartLeft: left });
      } else if (left === this.state.rangeEndLeft) {
        this.setState({ rangeEndLeft: left });
      }
    }
    onTouchEnd = event => {
      this.setState({ isMoving: true });
    }
    get selectedRangeWidth() {
      return this.state.rangeEndLeft - this.state.rangeStartLeft;
    }
    render = () => (
      <Component
        {...this.state}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        rangeStartLeft={this.state.rangeStartLeft}
        rangeEndLeft={this.state.rangeEndLeft}
        selectedRangeWidth={this.selectedRangeWidth}
        {...this.props}
      />
    );
  }
  WithDualRangeSlider2.defaultProps = {
    defaultRangeStart: 50,
    defaultRangeEnd: 8000,
    boxSize: 300
  }
  return <WithDualRangeSlider2 {...props} />;
};

const Slider = props => (
  <section className="range-slider">
    <Flex>
      <RangeValue>Range Start: {props.range.start}</RangeValue>
      <RangeValue>Range End: {props.range.end}</RangeValue>
    </Flex>
    <input
      value={props.range.start}
      onKeyDown={props.disableKeyPadOpen}
      max={props.scale}
      step={props.step}
      type="range"
      onChange={props.onInputRangeChange("start")}
    />
    <input
      value={props.range.end}
      onKeyDown={props.disableKeyPadOpen}
      max={props.scale}
      step={props.step}
      type="range"
      onChange={props.onInputRangeChange("end")}
    />
  </section>
);

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
      <SliderIcon left={`${props.rangeStartLeft}%`} />
      <SliderIcon left={`${props.rangeEndLeft}%`} />
    </SliderLine>
    <div className='range-ruler'>
      <div className='range-start' />
      <div className='range-end' />
    </div>
  </section>
);

const SliderWithDrag =  WithDualRangeSliderHOC(Slider);

const SliderWithDrag2 = WithDualRangeSlider2HOC(Slider2);

const onAfterChange = state => console.log(state);

export const Version1 = props =>
  <>
    <Menu />
    <SliderWithDrag onAfterChange={onAfterChange} {...props} />
  </>

export const Version2 = props =>
  <>
    <Menu />
    <SliderWithDrag2 onAfterChange={onAfterChange} {...props} />
  </>
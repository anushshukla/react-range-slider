import React from "react";
import { Link } from 'react-router-dom';
import { 
  Flex,
  RangeValue,
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

const SliderWithDrag =  WithDualRangeSliderHOC(Slider);

const onAfterChange = state => console.log(state);

const Version1 = props =>
  <>
    <Menu />
    <SliderWithDrag onAfterChange={onAfterChange} {...props} />
  </>

export default Version1;
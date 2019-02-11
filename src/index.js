import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

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
    <span className="rangeValues" />
    <div>Step: {props.step}</div>
    <div>Scale: {props.scale}</div>
    <div>Range Start Min : {props.rangeStartMin}</div>
    <div>Range Start: {props.range.start}</div>
    <div>Range Start Max : {props.rangeStartMax}</div>
    <div>Range End Min: {props.rangeEndMin}</div>
    <div>Range End: {props.range.end}</div>
    <div>Range End Max: {props.rangeEndMax}</div>
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

const SliderWithDrag = WithDualRangeSliderHOC(Slider);

const onAfterChange = state => console.log(state);

function App() {
  return (
    <div className="App">
      <h1>Range Slider</h1>
      <h2>Example!</h2>
      <SliderWithDrag
        rangeStartMin={3000}
        defaultRangeStart={7000}
        rangeStartMax={15000}
        rangeEndMin={30000}
        defaultRangeEnd={35000}
        rangeEndMax={40000}
        step={500}
        scale={50000}
        onAfterChange={onAfterChange}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

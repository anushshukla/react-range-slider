import React, { useState } from 'react';
import Provider from 'components/common/RangeSlider';
import View from 'Pages/Demos/RangeSlider/View';
import { Label } from 'components/common/styles';

const SliderWithDrag = Provider(View);
const RangeSlider = props => <SliderWithDrag {...props} />;

const RangeSliderDemo = props => {
  const [rangeStartMin, setRangeStartMin] = useState(21);
  const [rangeStartMax, setRangeStartMax] = useState(70);
  const [rangeEndMin, setRangeEndMin] = useState(22);
  const [rangeEndMax, setRangeEndMax] = useState(71);
  const [defaultRangeStart, setDefaultRangeStart] = useState(25);
  const [defaultRangeEnd, setDefaultRangeEnd] = useState(29);
  const [rangeDiffLimit, setRangeDiffLimit] = useState(1);
  const [to, setTo] = useState(71);
  const [from, setFrom] = useState(21);
  const [state, setState] = useState({ response: {} });
  const onAfterChange = response => setState({ response });
  const moreProps = {
    rangeStartMin,
    rangeStartMax,
    rangeEndMin,
    rangeEndMax,
    from,
    to,
    defaultRangeStart,
    defaultRangeEnd,
    rangeDiffLimit,
    onAfterChange
  };
  const updateInput = updateFunc => event =>
    updateFunc(
      event.target.value ? parseInt(event.target.value, 10) : undefined
    );
  return (
    <>
      <h1>Dual Range Slider</h1>
      <h2>Demo</h2>
      <Label htmlFor="">From</Label>&nbsp;&nbsp;
      <input type="number" value={from || ''} onChange={updateInput(setFrom)} />
      &nbsp;&nbsp;<Label htmlFor="">To</Label>&nbsp;&nbsp;
      <input type="number" value={to || ''} onChange={updateInput(setTo)} />
      <br />
      <br />
      <Label htmlFor="">Range Start Min</Label>
      <br />
      <br />
      <input
        type="number"
        value={rangeStartMin || ''}
        onChange={updateInput(setRangeStartMin)}
      />
      <br />
      <br />
      <Label htmlFor="">Default Range Start </Label>
      <br />
      <input
        type="number"
        value={defaultRangeStart || ''}
        onChange={updateInput(setDefaultRangeStart)}
      />
      <br />
      <br />
      <Label htmlFor="">Range Start Max</Label>
      <br />
      <br />
      <input
        type="number"
        value={rangeStartMax || ''}
        onChange={updateInput(setRangeStartMax)}
      />
      <br />
      <br />
      <Label htmlFor="">Default Range End</Label>
      <br />
      <br />
      <input
        type="number"
        value={defaultRangeEnd || ''}
        onChange={updateInput(setDefaultRangeEnd)}
      />
      <br />
      <br />
      <Label htmlFor="">Range End Min</Label>
      <br />
      <input
        type="number"
        value={rangeEndMin || ''}
        onChange={updateInput(setRangeEndMin)}
      />
      <br />
      <br />
      <Label htmlFor="">Range End Max</Label>
      <br />
      <br />
      <input
        type="number"
        value={rangeEndMax || ''}
        onChange={updateInput(setRangeEndMax)}
      />
      <br />
      <br />
      <Label htmlFor="">Range Difference</Label>
      <br />
      <input
        type="number"
        value={rangeDiffLimit || ''}
        onChange={updateInput(setRangeDiffLimit)}
      />
      <RangeSlider {...props} {...moreProps} />
      <div>
        onAfterChange props callback reponse
        <br />
        <code>{JSON.stringify(state.response, null, 2)}</code>
      </div>
    </>
  );
};

export default RangeSliderDemo;

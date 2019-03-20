import React, { useState, useEffect } from "react";
import Provider from 'Pages/RangeSlider/Provider';
import View from 'Pages/RangeSlider/View';

const SliderWithDrag = Provider(View);
const RangeSlider = props => <SliderWithDrag  {...props} />

export default props => {
  const [rangeStartMin, setRangeStartMin] = useState(21);
  const [rangeStartMax, setRangeStartMax] = useState(36);
  const [rangeEndMin, setRangeEndMin] = useState(24);
  const [rangeEndMax, setRangeEndMax] = useState(36);
  const [defaultRangeStart, setDefaultRangeStart] = useState(25);
  const [defaultRangeEnd, setDefaultRangeEnd] = useState(29);
  const [rangeDiffLimit, setRangeDiffLimit] = useState(3);
  const [to, setTo] = useState(46);
  const [from, setFrom] = useState(21);
  const [scale, setScale] = useState(to - from);
  const [state, setState] = useState({ response: {} });
  const onAfterChange = response => setState({ response })
  const moreProps = {
    rangeStartMin,
    rangeStartMax,
    rangeEndMin,
    rangeEndMax,
    scale,
    from,
    to,
    defaultRangeStart,
    defaultRangeEnd,
    rangeDiffLimit,
    onAfterChange
  }
  useEffect(() => {
    const computedScale = to - from;
    computedScale !== scale && setScale(computedScale);
  }, [to, from])
  const updateInput = updateFunc => event => updateFunc(event.target.value);
  return (
    <div className="App">
      <h1>Range Slider</h1>
      <h2>Example!</h2>
      <br />
      <br /><label>From</label><br/>
      <input type="number" value={from} onChange={updateInput(setFrom)} />
      <br /><label>To</label><br/>
      <input type="number" value={to} onChange={updateInput(setTo)} />
      <br />
      <br />
      <label>
        Scale: {scale}
        <br />(Difference between from and to
        <br />which gets auto calculated
        <br /> on changing from and to)
      </label>
      <br/>
      <br/>
      <label>Range Start Min <br/>(Will be implemented if required)</label><br/>
      <input type="number" value={rangeStartMin} onChange={updateInput(setRangeStartMin)} />
      <br /><label>Default Range Start </label><br/>
      <input type="number" value={defaultRangeStart} onChange={updateInput(setDefaultRangeStart)} />
      <br /><label>Range Start Max  <br/>(Will be implemented if required)</label><br/>
      <input type="number" value={rangeStartMax} onChange={updateInput(setRangeStartMax)} />
      <br /><label>Default Range End  <br/>(Will be implemented if required)</label><br/>
      <input type="number" value={defaultRangeEnd} onChange={updateInput(setDefaultRangeEnd)} />
      <br /><label>Range End Min</label><br/>
      <input type="number" value={rangeEndMin} onChange={updateInput(setRangeEndMin)} />
      <br /><label>Range End Max <br/>(Will be implemented if required)</label><br/>
      <input type="number" value={rangeEndMax} onChange={updateInput(setRangeEndMax)} />
      <br /><label>Range Difference</label><br/>
      <input type="number" value={rangeDiffLimit} onChange={updateInput(setRangeDiffLimit)} />
      <RangeSlider {...props} {...moreProps} />
      <div>
        onAfterChange props callback reponse
        <br />
        <code>
          {JSON.stringify(state.response, null, 2) }
        </code>
      </div>
    </div>
  )
};
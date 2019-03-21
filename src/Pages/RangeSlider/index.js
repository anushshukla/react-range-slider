import React, { useState, useEffect } from 'react';
import Provider from 'Pages/RangeSlider/Provider';
import View from 'Pages/RangeSlider/View';
import { TopSpace, ResponsiveWidth, Label } from 'components/common/styles';

const SliderWithDrag = Provider(View);
const RangeSlider = props => <SliderWithDrag {...props} />;

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
  const onAfterChange = response => setState({ response });
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
  };
  useEffect(() => {
    setScale(to - from);
  }, [to, from]);
  const updateInput = updateFunc => event => updateFunc(event.target.value);
  return (
    <TopSpace space="60px">
      <ResponsiveWidth width="500px">
        <h1>Dual Range Slider</h1>
        <h2>Demo</h2>
        <Label htmlFor="">From</Label>
        <br />
        <input type="number" value={from} onChange={updateInput(setFrom)} />
        <br />
        <Label htmlFor="">To</Label>
        <br />
        <input type="number" value={to} onChange={updateInput(setTo)} />
        <br />
        <br />
        <Label htmlFor="">
          Scale: {scale}
          <br />
          (Difference between from and to
          <br />
          which gets auto calculated
          <br /> on changing from and to)
        </Label>
        <br />
        <br />
        <Label htmlFor="">
          Range Start Min <br />
          (Will be implemented if required)
        </Label>
        <br />
        <input
          type="number"
          value={rangeStartMin}
          onChange={updateInput(setRangeStartMin)}
        />
        <br />
        <Label htmlFor="">Default Range Start </Label>
        <br />
        <input
          type="number"
          value={defaultRangeStart}
          onChange={updateInput(setDefaultRangeStart)}
        />
        <br />
        <Label htmlFor="">
          Range Start Max <br />
          (Will be implemented if required)
        </Label>
        <br />
        <input
          type="number"
          value={rangeStartMax}
          onChange={updateInput(setRangeStartMax)}
        />
        <br />
        <Label htmlFor="">
          Default Range End <br />
          (Will be implemented if required)
        </Label>
        <br />
        <input
          type="number"
          value={defaultRangeEnd}
          onChange={updateInput(setDefaultRangeEnd)}
        />
        <br />
        <Label htmlFor="">Range End Min</Label>
        <br />
        <input
          type="number"
          value={rangeEndMin}
          onChange={updateInput(setRangeEndMin)}
        />
        <br />
        <Label htmlFor="">
          Range End Max <br />
          (Will be implemented if required)
        </Label>
        <br />
        <input
          type="number"
          value={rangeEndMax}
          onChange={updateInput(setRangeEndMax)}
        />
        <br />
        <Label htmlFor="">Range Difference</Label>
        <br />
        <input
          type="number"
          value={rangeDiffLimit}
          onChange={updateInput(setRangeDiffLimit)}
        />
        <RangeSlider {...props} {...moreProps} />
        <div>
          onAfterChange props callback reponse
          <br />
          <code>{JSON.stringify(state.response, null, 2)}</code>
        </div>
      </ResponsiveWidth>
    </TopSpace>
  );
};

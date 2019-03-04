import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Version1, Version2 } from './Versions';

const Routes = () => {
  const [rangeStartMin, setRangeStartMin] = useState(22);
  const [rangeStartMax, setRangeStartMax] = useState(46);
  const [rangeEndMin, setRangeEndMin] = useState(22);
  const [rangeEndMax, setRangeEndMax] = useState(46);
  const [defaultRangeStart, setDefaultRangeStart] = useState(25);
  const [defaultRangeEnd, setDefaultRangeEnd] = useState(29);
  const [step, setStep] = useState(1);
  const [scale, setScale] = useState(15);
  const moreProps = {
    rangeStartMin,
    rangeStartMax,
    rangeEndMin,
    rangeEndMax,
    step,
    scale,
    defaultRangeStart,
    defaultRangeEnd
  }
  const updateInput = updateFunc => event => updateFunc(event.target.value);
  return (
    <div className="App">
      <h1>Range Slider</h1>
      <h2>Example!</h2>
      <br /><label>Step</label><br/>
      <input type="number" value={step} onChange={updateInput(setStep)} />
      <br /><label>Scale</label><br/>
      <input type="number" value={scale} onChange={updateInput(setScale)} />
      <br /><label>Range Start Min </label><br/>
      <input type="number" value={rangeStartMin} onChange={updateInput(setRangeStartMin)} />
      <br /><label>Default Range Start </label><br/>
      <input type="number" value={defaultRangeStart} onChange={updateInput(setDefaultRangeStart)} />
      <br /><label>Range Start Max </label><br/>
      <input type="number" value={rangeStartMax} onChange={updateInput(setRangeStartMax)} />
      <br /><label>Default Range End </label><br/>
      <input type="number" value={defaultRangeEnd} onChange={updateInput(setDefaultRangeEnd)} />
      <br /><label>Range End Min</label><br/>
      <input type="number" value={rangeEndMin} onChange={updateInput(setRangeEndMin)} />
      <br /><label>Range End Max</label><br/>
      <input type="number" value={rangeEndMax} onChange={updateInput(setRangeEndMax)} />
      <Router>
        <Switch>
          <Route path="/" exact component={props => <Version1 {...props} {...moreProps} />} />
          <Route path="/version-1" exact component={props => <Version1 {...props} {...moreProps} />} />
          <Route path="/version-2" exact component={props => <Version2 {...props} {...moreProps} />} />
        </Switch>
      </Router>
    </div>
  )
};

export default Routes;
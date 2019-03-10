import React, { useState } from "react";
/*import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom';*/
import Version1 from './Version1';
import Version2 from './Version2';


/*<Router>
  <Menu>
    <Switch>
      <Route path="/" exact component={props => <Version2 {...props} {...moreProps} />} />
      <Route path="/version-1" exact component={props => <Version1 {...props} {...moreProps} />} />
      <Route path="/version-2" exact component={props => <Version2 {...props} {...moreProps} />} />
    </Switch>
  </Menu>
</Router>*/

/*const Menu = props => 
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
    {props.children}
  </>*/

const Routes = () => {
  const [rangeStartMin, setRangeStartMin] = useState(21);
  const [rangeStartMax, setRangeStartMax] = useState(36);
  const [rangeEndMin, setRangeEndMin] = useState(24);
  const [rangeEndMax, setRangeEndMax] = useState(36);
  const [defaultRangeStart, setDefaultRangeStart] = useState(21);
  const [defaultRangeEnd, setDefaultRangeEnd] = useState(24);
  const [rangeDiffLimit, setRangeDiffLimit] = useState(3);
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
    defaultRangeEnd,
    rangeDiffLimit
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
      <br /><label>Range Difference</label><br/>
      <input type="number" value={rangeDiffLimit} onChange={updateInput(setRangeDiffLimit)} />
      <Version2 {...moreProps} />
    </div>
  )
};

export default Routes;
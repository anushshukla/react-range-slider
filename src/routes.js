import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import RangeSlider from 'Pages/RangeSlider';

export default () =>  (
  <Router>
    <Switch>
      <Route path="/" exact component={RangeSlider} />
      <Route path="/demo/range-slider" exact component={RangeSlider} />
    </Switch>
  </Router>
)

import React from 'react';
import { Route } from 'react-router-dom';
import RangeSlider from 'Pages/Demos/RangeSlider';
import Ripple from 'Pages/Demos/Ripple';
import Tooltip from 'Pages/Demos/Tooltip';
import Virtualization from 'Pages/Demos/Virtualization';

const DemoRoutes = () => (
  <>
    <Route path="/demo/range-slider" exact component={RangeSlider} />
    <Route path="/demo/ripple" exact component={Ripple} />
    <Route path="/demo/tooltip" exact component={Tooltip} />
    <Route path="/demo/virtualization" exact component={Virtualization} />
  </>
);

export default DemoRoutes;

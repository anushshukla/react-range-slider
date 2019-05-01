import React from 'react';
import { Route } from 'react-router-dom';
import RangeSlider from 'Pages/Demos/RangeSlider';
import Ripple from 'Pages/Demos/Ripple';
import Tooltip from 'Pages/Demos/Tooltip';
import Virtualization from 'Pages/Demos/Virtualization';

const DemoRoutes = () => (
  <>
    <Route path="/demos/range-slider" exact component={RangeSlider} />
    <Route path="/demos/ripple" exact component={Ripple} />
    <Route path="/demos/tooltip" exact component={Tooltip} />
    <Route path="/demos/virtualization" exact component={Virtualization} />
  </>
);

export default DemoRoutes;

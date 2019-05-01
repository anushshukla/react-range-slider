import React from 'react';
import { Link } from 'react-router-dom';
import DemoRoutes from 'Routes/DemoRoutes';

const Menus = props => (
  <div>
    Homepage &gt; Demos
    <DemoRoutes {...props} />
    <ul>
      <li>
        <Link to="/demos/range-slider">Range Slider Demo</Link>
      </li>
      <li>
        <Link to="/demos/ripple">Ripple Demo</Link>
      </li>
      <li>
        <Link to="/demos/tooltip">Tooltip Demo</Link>
      </li>
      <li>
        <Link to="/demos/virtualization">Virtualization Demo</Link>
      </li>
    </ul>
  </div>
);

export default Menus;

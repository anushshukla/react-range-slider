import React from 'react';
import { Link } from 'react-router-dom';

const Menus = () => (
  <div>
    <ul>
      <li>
        <Link to="/demo/range-slider">Range Slider Demo</Link>
      </li>
      <li>
        <Link to="/demo/ripple">Ripple Demo</Link>
      </li>
      <li>
        <Link to="/demo/tooltip">Tooltip Demo</Link>
      </li>
      <li>
        <Link to="/demo/virtualization">Virtualization Demo</Link>
      </li>
    </ul>
  </div>
);

export default Menus;

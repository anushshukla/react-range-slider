import React from 'react';
import 'Pages/Homepage/menus.css';
import { Link } from 'react-router-dom';

const Menus = () => (
  <div>
    <ul>
      <li>
        <Link to="/">Homepage</Link>
      </li>
      <li>
        <Link to="/demo/range-slider">Range Slider Demo</Link>
      </li>
    </ul>
  </div>
);

export default Menus;

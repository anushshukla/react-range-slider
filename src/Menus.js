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
        <Link to="/demo">Demos</Link>
      </li>
    </ul>
  </div>
);

export default Menus;

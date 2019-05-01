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
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/sign-up">Signup</Link>
      </li>
      <li>
        <Link to="/demos">Demos</Link>
      </li>
    </ul>
  </div>
);

export default Menus;

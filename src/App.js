import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'Routes';
import Menus from 'Menus';

const App = () => (
  <Router>
    <Menus />
    <Routes />
  </Router>
);

export default App;

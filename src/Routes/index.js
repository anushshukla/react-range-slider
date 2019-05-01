import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Demos from 'Pages/Demos';
import Homepage from 'Pages/Homepage';
import Login from 'Pages/Login';
import Signup from 'Pages/Signup';
import DemoRoutes from 'Routes/DemoRoutes';
import { TopSpace, ResponsiveWidth, Font } from 'components/common/styles';

export default () => (
  <TopSpace space="60px">
    <ResponsiveWidth width="500px">
      <Font size="0.8em">
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={Login} />
          <Route path="/sign-up" exact component={Signup} />
          <Route path="/demos" exact component={Demos} />
          <DemoRoutes />
        </Switch>
      </Font>
    </ResponsiveWidth>
  </TopSpace>
);

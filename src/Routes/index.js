import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Demos from 'Pages/Demos';
import Homepage from 'Pages/Homepage';
import DemoRoutes from 'Routes/DemoRoutes';
import { TopSpace, ResponsiveWidth, Font } from 'components/common/styles';

export default () => (
  <TopSpace space="60px">
    <ResponsiveWidth width="500px">
      <Font size="0.8em">
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/demo" exact component={Demos} />
          <DemoRoutes />
        </Switch>
      </Font>
    </ResponsiveWidth>
  </TopSpace>
);

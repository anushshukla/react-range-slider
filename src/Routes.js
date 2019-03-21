import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RangeSlider from 'Pages/RangeSlider';
import Homepage from 'Pages/Homepage';
import { TopSpace, ResponsiveWidth } from 'components/common/styles';

export default () => (
  <TopSpace space="60px">
    <ResponsiveWidth width="500px">
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/demo/range-slider" exact component={RangeSlider} />
      </Switch>
    </ResponsiveWidth>
  </TopSpace>
);

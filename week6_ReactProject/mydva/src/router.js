import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Goods from './routes/Goods';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/goods" component={Goods} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

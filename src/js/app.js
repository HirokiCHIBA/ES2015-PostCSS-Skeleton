import '../css/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { Router, Route, useRouterHistory } from 'react-router'
import MainView from './components/MainView';

const browserHistory = useRouterHistory(createHistory)({
    basename: '/members/chiba/taskeval'
});

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/:reviewerID" component={MainView}/>
  </Router>
), document.getElementById('container'));

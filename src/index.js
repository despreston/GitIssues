import React from 'react';
import { render } from 'react-dom';
import App from './components/app/App';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Issue from './components/issue/Issue';
import IssueList from './components/issue-list/IssueList';

window.CONFIG = {
  owner: "rails",
  repo: "rails"
};

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="issues">
        <IndexRoute component={IssueList} />
        <Route path=":page" component={IssueList} />
      </Route>
      <Route path="issue/:number" component={Issue} />
    </Route>
  </Router>
), document.getElementById('root'));

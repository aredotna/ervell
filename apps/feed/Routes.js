import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FeedPage from 'react/pages/feed/FeedPage';
import NotificationPage from 'react/pages/feed/NotificationPage';

export default () => (
  <Switch>
    <Route path="/feed" component={FeedPage} />
    <Route path="/notifications" component={NotificationPage} />
    <Route path="/" component={FeedPage} />
  </Switch>
);

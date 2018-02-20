import axios from 'axios';
import express from 'express';

import { NODE_ENV, GRAPHQL_ENDPOINT, X_APP_TOKEN } from 'config.coffee';

const app = module.exports = express();

app.post('/graphql', (req, res, next) => {
  if (NODE_ENV !== 'development' && req.hostname.replace('www.', '') !== 'are.na') {
    const err = new Error('Requests must originate from are.na');
    return next(err);
  }

  const X_AUTH_TOKEN = req.user && req.user.get('authentication_token') || '';

  const headers = {
    'X-AUTH-TOKEN': req.headers['x-auth-token'] || X_AUTH_TOKEN,
    'X-APP-TOKEN': req.headers['x-app-token'] || X_APP_TOKEN,
  };

  axios({
    method: 'post',
    url: GRAPHQL_ENDPOINT,
    data: req.body,
    headers: headers,
  })
    .then(({ data }) => res.json(data))
    .catch(next)
});

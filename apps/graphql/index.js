import axios from 'axios';
import express from 'express';
import sharify from 'sharify';

import { NODE_ENV } from 'config.coffee';

const app = module.exports = express();

const { data: { GRAPHQL_ENDPOINT, X_APP_TOKEN, CURRENT_USER } } = sharify;
const X_AUTH_TOKEN = CURRENT_USER && CURRENT_USER.authentication_token || '';

app.post('/graphql', (req, res, next) => {
  if (NODE_ENV !== 'development' && req.hostname !== 'are.na') {
    const err = new Error('Requests must originate from are.na');
    return next(err);
  }

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

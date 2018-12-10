import express from 'express';
import gql from 'graphql-tag';

import apolloMiddleware from 'react/apollo/middleware';

const app = express();

const middlewareStack = [
  apolloMiddleware,
];

const resolve = [
  ...middlewareStack, (req, res, next) => {
    req.apollo.render()
      .then((apollo) => {
        if (apollo.error) throw apollo.error;

        const identifiable = extractIdentifiable(apollo.client, req.params.id);

        if (identifiable.__typename === 'Group') {
          const error = new Error('Not Found');
          error.status = 404;
          throw error;
        }

        const view = req.path.split('/').pop();

        res.render('index', {
          apollo,
          // meta.jade
          view,
          title: identifiable.title,
          name: identifiable.name,
          description: identifiable.description,
          canonical: identifiable.canonical,
          is_indexable: identifiable.is_indexable,
          href: identifiable.href,
        });
      })
      .catch(next);
  },
];

app
  .set('views', __dirname)
  .set('view engine', 'jade')
  .get('/dev/topbar', ...resolve);

module.exports = app;

import express from 'express';
import gql from 'graphql-tag';

import apolloMiddleware from 'react/apollo/middleware';

import Routes from 'apps/profile/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

const extractIdentifiable = (client, id) => {
  const { identifiable } = client.readFragment({
    id: `$ROOT_QUERY.identity({"id":"${id}"})`,
    fragment: gql`
      fragment ProfileTitle on Identity {
        identifiable {
          __typename
          ... on User {
            title: name
          }
          ... on Group {
            title: name
          }
        }
      }
    `,
  });

  return identifiable;
};

const resolve = [
  apolloMiddleware, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes))
      .then((apollo) => {
        // TODO: Consider properly handing errors in the SSR function
        if (apollo.error) throw apollo.error;

        const identifiable = extractIdentifiable(apollo.client, req.params.id);

        if (identifiable.__typename === 'Group') {
          const error = new Error('Not Found');
          error.status = 404;
          throw error;
        }

        res.render('index', { apollo, title: identifiable.title });
      })
      .catch(next);
  },
];

app
  .set('views', __dirname)
  .set('view engine', 'jade')

  .get('/:id/', ...resolve)
  .get('/:id/all', ...resolve)
  .get('/:id/blocks', ...resolve)
  .get('/:id/channels', ...resolve)
  .get('/:id/index', ...resolve)
  .get('/:id/followers', ...resolve)
  .get('/:id/following', ...resolve);

module.exports = app;

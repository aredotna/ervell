import express from 'express';
import gql from 'graphql-tag';

import apolloMiddleware from 'react/apollo/middleware';

import Routes from 'apps/profile/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

const app = express();

const extractTitle = (client, id) => {
  const { identifiable: { title } } = client.readFragment({
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

  return title;
};

const resolve = [
  apolloMiddleware, (req, res, next) => {
    req.apollo.render(withStaticRouter(Routes))
      .then((apollo) => {
        // TODO: Should just be a component once we move to a full page component
        // (Off of the Jade layout)
        const title = extractTitle(apollo.client, req.params.id);

        res.render('index', { apollo, title });
      })
      .catch(next);
  },
];

app
  .set('views', __dirname)
  .set('view engine', 'jade')

  .get('/:id/', ...resolve)
  .get('/:id/blocks', ...resolve)
  .get('/:id/channels', ...resolve)
  .get('/:id/index', ...resolve);

module.exports = app;

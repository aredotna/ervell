import React from 'react';
import express from 'express';
import gql from 'graphql-tag';

import apolloMiddleware from 'react/apollo/middleware';
import setSeedMiddleware from 'lib/middleware/setSeed';

import Routes from 'apps/profile/Routes';
import withStaticRouter from 'react/hocs/WithStaticRouter';

import profileMetaTagsFragment from 'react/pages/profile/ProfilePage/components/ProfileMetaTags/fragments/profileMetaTags';

const app = express();

const middlewareStack = [apolloMiddleware, setSeedMiddleware];

const extractIdentifiable = (client, id) => {
  const { identifiable } = client.readFragment({
    id: `$ROOT_QUERY.identity({"id":"${id}"})`,
    fragment: gql`
      fragment ProfileTitleAndMeta on Identity {
        identifiable {
          ... ProfileMetaTags
        }
      }
      ${profileMetaTagsFragment}
    `,
    fragmentName: 'ProfileTitleAndMeta',
  });

  return identifiable;
};

const resolve = [
  ...middlewareStack, (req, res, next) => {
    const { seed } = res.locals;
    req.apollo.render(withStaticRouter(Routes, { seed }))
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

const SimpleComponent = () => (<div> <h1>H!</h1> {console.log('hi') }</div>);

app
  .set('views', __dirname)
  .set('view engine', 'jade')

  .get('/:id/', ...resolve)
  .get('/:id/all', ...resolve)
  .get('/:id/blocks', ...resolve)
  .get('/:id/channels', ...resolve)
  .get('/:id/index', ...resolve)
  .get('/:id/followers', ...resolve)
  .get('/:id/testing', apolloMiddleware, (req, res, next) => {
    req.apollo.render(SimpleComponent).then((apollo) => {
      res.send(apollo.html);
    });
  })
  .get('/:id/following', ...resolve);

module.exports = app;

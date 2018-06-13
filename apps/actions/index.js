import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';
import formatErrors from 'react/util/formatErrors';

import acceptChannelTransferMutation from 'apps/actions/mutations/acceptChannelTransfer';
import rejectChannelTransferMutation from 'apps/actions/mutations/rejectChannelTransfer';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const middlewareStack = [
  ensureLoggedInMiddleware,
  apolloMiddleware,
];

const handleErrors = (_req, res, next) => (err) => {
  const message = formatErrors(err);

  if (message.toLowerCase() === 'not found') { // Invalid/incorrect correct token
    return res.status(404).render('not_found');
  }

  if (message.toLowerCase() === 'unauthorized') { // Wrong user
    return res.status(401).render('access_denied');
  }

  return next(err);
};

app
  .get('/actions/transfer-channel/confirm/:token', ...middlewareStack, (req, res, next) => {
    req.apollo.client.mutate({
      mutation: acceptChannelTransferMutation,
      variables: {
        token: req.params.token,
      },
    })
      .then(({ data }) => {
        const {
          accept_channel_transfer: {
            channel_transfer_request: {
              channel: {
                href,
              },
            },
          },
        } = data;

        res.redirect(href);
      })
      .catch(handleErrors(req, res, next));
  })

  .get('/actions/transfer-channel/reject/:token', ...middlewareStack, (req, res, next) => {
    req.apollo.client.mutate({
      mutation: rejectChannelTransferMutation,
      variables: {
        token: req.params.token,
      },
    })
      .then(({ data }) => {
        const {
          cancel_channel_transfer: {
            channel,
          },
        } = data;

        res.render('rejected', { channel });
      })
      .catch(handleErrors(req, res, next));
  });

module.exports = app;

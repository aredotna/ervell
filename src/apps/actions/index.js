import express from 'express';

import apolloMiddleware from 'react/apollo/middleware';
import ensureLoggedInMiddleware from 'lib/middleware/ensure_logged_in.coffee';

import TransferChannelConfirmedPage from 'react/pages/actions/TransferChannelConfirmedPage';
import TransferChannelRejectedPage from 'react/pages/actions/TransferChannelRejectedPage';
import TransferChannelNotFoundPage from 'react/pages/actions/TransferChannelNotFoundPage';
import TransferChannelAccessDeniedPage from 'react/pages/actions/TransferChannelAccessDeniedPage';

import acceptChannelTransferMutation from 'apps/actions/mutations/acceptChannelTransfer';
import rejectChannelTransferMutation from 'apps/actions/mutations/rejectChannelTransfer';

const app = express();

app.set('views', `${__dirname}/templates`);
app.set('view engine', 'jade');

const middlewareStack = [
  ensureLoggedInMiddleware,
  apolloMiddleware,
];

const handleErrors = (req, res, next) => (err) => {
  const STATUS_CODE = err.graphQLErrors[0].extensions.code;

  res.locals.sd.STATUS_CODE = STATUS_CODE;

  switch (STATUS_CODE) {
    case 'UNAUTHORIZED': // Wrong user
      return req.apollo.render(TransferChannelAccessDeniedPage)
        .then(apollo => res.status(401).render('index', { apollo }));

    case 'NOT_FOUND': // Invalid/incorrect correct token
      return req.apollo.render(TransferChannelNotFoundPage)
        .then(apollo => res.status(404).render('index', { apollo }));

    default:
      return next(err);
  }
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
              channel,
            },
          },
        } = data;

        res.locals.sd.STATUS_CODE = 'OK';
        res.locals.sd.APOLLO = { channel };

        return req.apollo.render(TransferChannelConfirmedPage, { channel });
      })
      .then(apollo => res.render('index', { apollo }))
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
          reject_channel_transfer: {
            channel,
          },
        } = data;

        res.locals.sd.STATUS_CODE = 'OK';
        res.locals.sd.APOLLO = { channel };

        return req.apollo.render(TransferChannelRejectedPage, { channel });
      })
      .then(apollo => res.render('index', { apollo }))
      .catch(handleErrors(req, res, next));
  });

module.exports = app;

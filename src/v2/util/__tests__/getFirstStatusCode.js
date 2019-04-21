import getFirstStatusCode from 'v2/util/getFirstStatusCode';

describe('getFirstStatusCode', () => {
  const ERROR = new Error('This is an error.');
  const ERROR_RESPONSE = {
    data: {
      me: null,
    },
    errors: [
      {
        message: 'Requires sign in',
        locations: [
          {
            line: 2,
            column: 3,
          },
        ],
        path: ['me'],
        extensions: {
          code: 'UNAUTHORIZED',
        },
      },
    ],
  };

  describe('errors with no GraphQL errors', () => {
    it('returns null', () => {
      expect(getFirstStatusCode(ERROR)).toBeNull();
    });
  });

  describe('errors with GraphQL errors, sans extensions', () => {
    it('returns null', () => {
      expect(
        getFirstStatusCode({ graphQLErrors: [{ foo: 'bar' }] })
      ).toBeNull();
    });
  });

  describe('reasonable error response', () => {
    it('returns the first status code', () => {
      expect(
        getFirstStatusCode({ graphQLErrors: ERROR_RESPONSE.errors })
      ).toEqual('UNAUTHORIZED');
    });
  });
});

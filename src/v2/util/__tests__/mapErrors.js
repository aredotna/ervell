import mapErrors from 'v2/util/mapErrors';

describe('mapErrors', () => {
  describe('handles errors with no graphQL errors', () => {
    const ERROR = new Error('This is an error.');

    it('handles the error properly', () => {
      expect(mapErrors(ERROR)).toEqual({
        attributeErrors: {},
        errorMessage: 'This is an error.',
      });
    });
  });

  describe('a response with no attribute errors and a single overall error', () => {
    const RESPONSE = {
      data: { registration: null },
      errors: [
        {
          message:
            'An account with this email already exists. Login to continue.',
          locations: [{ line: 2, column: 3 }],
          path: ['registration'],
          extensions: { code: 'BAD_REQUEST' },
        },
      ],
    };

    it('pulls out the errorMessage', () => {
      expect(mapErrors({ graphQLErrors: RESPONSE.errors })).toEqual({
        attributeErrors: {},
        errorMessage:
          'An account with this email already exists. Login to continue.',
      });
    });
  });

  describe('a response with multiple attribute errors', () => {
    const RESPONSE = {
      data: { registration: null },
      errors: [
        {
          message: "doesn't match Password",
          locations: [{ line: 2, column: 3 }],
          path: ['registration'],
          extensions: {
            code: 'UNPROCESSABLE_ENTITY',
            attribute: 'password_confirmation',
          },
        },
        {
          message: 'is too short (minimum is 6 characters)',
          locations: [{ line: 2, column: 3 }],
          path: ['registration'],
          extensions: { code: 'UNPROCESSABLE_ENTITY', attribute: 'password' },
        },
      ],
    };

    it('maps the error messages into their respective attributes', () => {
      expect(mapErrors({ graphQLErrors: RESPONSE.errors })).toEqual({
        attributeErrors: {
          password: 'is too short (minimum is 6 characters)',
          password_confirmation: "doesn't match Password",
        },
        errorMessage: null,
      });
    });
  });

  describe('a response with both multiple general messages and attribute errors', () => {
    const RESPONSE = {
      data: { registration: null },
      errors: [
        {
          message: 'Some other error.',
          locations: [{ line: 2, column: 3 }],
          path: ['registration'],
          extensions: { code: 'BAD_REQUEST' },
        },
        {
          message: 'Lots of errors here.',
          locations: [{ line: 2, column: 3 }],
          path: ['registration'],
          extensions: { code: 'BAD_REQUEST' },
        },
        {
          message:
            'An account with this email already exists. Login to continue.',
          locations: [{ line: 2, column: 3 }],
          path: ['registration'],
          extensions: { code: 'BAD_REQUEST' },
        },
        {
          message: "doesn't match Password",
          locations: [{ line: 2, column: 3 }],
          path: ['registration'],
          extensions: {
            code: 'UNPROCESSABLE_ENTITY',
            attribute: 'password_confirmation',
          },
        },
        {
          message: 'is too short (minimum is 6 characters)',
          locations: [{ line: 2, column: 3 }],
          path: ['registration'],
          extensions: { code: 'UNPROCESSABLE_ENTITY', attribute: 'password' },
        },
      ],
    };

    it('maps the error messages into their respective attributes and returns a correctly formatted errorMessage', () => {
      expect(mapErrors({ graphQLErrors: RESPONSE.errors })).toEqual({
        errorMessage:
          'Some other error. Lots of errors here. An account with this email already exists. Login to continue.',
        attributeErrors: {
          password: 'is too short (minimum is 6 characters)',
          password_confirmation: "doesn't match Password",
        },
      });
    });
  });

  describe('a response with no errors (network error)', () => {
    it('returns the message', () => {
      expect(
        mapErrors({
          graphQLErrors: [],
          message: 'Network error: Failed to fetch',
        })
      ).toEqual({
        errorMessage: 'Network error: Failed to fetch',
        attributeErrors: {},
      });
    });
  });
});

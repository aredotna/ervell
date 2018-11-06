module.exports = config => {
  config.resolve.extensions = [
    '.mjs',
    '.jade',
    ...config.resolve.extensions,
  ];

  config.module.rules = [
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    },
    {
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    },
    {
      test: /\.coffee$/,
      exclude: /node_modules/,
      loader: 'coffee-loader',
    },
    {
      test: /\.(jade|pug)$/,
      exclude: /node_modules/,
      loader: 'pug-loader',
      options: {
        doctype: 'html',
        root: __dirname,
      },
    },
    ...config.module.rules,
  ];

  return config;
 };

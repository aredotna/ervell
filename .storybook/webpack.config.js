module.exports = config => {
  config.resolve.extensions = [
    '.mjs',
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
    ...config.module.rules,
  ];

  return config;
 };

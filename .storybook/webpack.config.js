module.exports = ({ config }) => {
  config.resolve.extensions.push(
    '.mjs',
    '.jade',
  )

  config.module.rules.push(
    {
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    },
    {
      test: /\.(graphql|gql)$/,
      include: /src/,
      loader: 'graphql-tag/loader',
    },
    {
      test: /\.coffee$/,
      include: /src/,
      loader: 'coffee-loader',
    },
    {
      test: /\.(jade|pug)$/,
      include: /src/,
      loader: 'pug-loader',
      options: {
        doctype: 'html',
        root: __dirname,
      },
    },
  );

  return config;
 };

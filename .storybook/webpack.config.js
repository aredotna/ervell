const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = ({ config }) => {
  config.resolve.extensions.push('.ts', '.tsx', '.mjs', '.jade')

  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      formatter: 'codeframe',
      formatterOptions: 'highlightCode',
      checkSyntacticErrors: true,
      watch: ['./src'],
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
      skipFirstNotification: true,
    })
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
    {
      test: /\.(ts|tsx)$/,
      include: /src/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      },
    }
  )

  return config
}

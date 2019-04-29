// @ts-check

const webpack = require('webpack')
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const developmentConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      formatter: 'codeframe',
      formatterOptions: 'highlightCode',
      checkSyntacticErrors: true,
      watch: ['./src'],
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
      skipFirstNotification: true,
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin(),
  ],
}

module.exports = developmentConfig

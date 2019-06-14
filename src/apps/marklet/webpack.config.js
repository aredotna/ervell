// @ts-check

const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const { NODE_ENV } = process.env

const rootDir = process.cwd()

const bookmarkletConfig = {
  mode: NODE_ENV,
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: true,
  },
  entry: path.join(rootDir, 'src/assets/loader.js'),
  output: {
    filename: 'loader.js',
    path: path.join(rootDir, 'src/apps/marklet/public'),
  },
  module: {
    rules: [
      {
        test: /(\.(js|ts)x?$)/,
        include: path.resolve(rootDir, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [['@babel/plugin-transform-modules-commonjs']],
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [
          'Bookmarklet successfully compiled to src/apps/marklet/public',
        ],
        notes: ['Great job.'],
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    symlinks: false,
    modules: ['node_modules'],
  },
}

module.exports = bookmarkletConfig

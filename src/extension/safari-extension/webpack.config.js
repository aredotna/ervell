// @ts-check

const path = require('path')
const Dotenv = require('dotenv-webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const { NODE_ENV } = process.env

const rootDir = process.cwd()

const safariExtensionConfig = {
  mode: NODE_ENV,
  devtool: 'source-map',
  target: 'node',
  node: {
    __dirname: true,
  },
  entry: {
    background: './src/extension/safari-extension/background.ts',
    main: './src/extension/safari-extension/main.js',
  },
  output: {
    publicPath: '.',
    path: path.join(
      rootDir,
      './src/extension/safari-extension/Are.na for Safari/Are.na for Safari Extension/app/scripts'
    ),
    filename: '[name].js',
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
          'Safari Extension successfully compiled to ./src/extension/safari-extension/Are.na for Safari/Are.na for Safari Extension/app/scripts',
        ],
        notes: ['Great job.'],
      },
    }),
    new Dotenv({
      path: `./src/extension/.env`,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
    symlinks: false,
    modules: ['node_modules'],
  },
}

module.exports = safariExtensionConfig

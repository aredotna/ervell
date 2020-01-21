const { resolve } = require('path')
const { NODE_ENV } = process.env
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const baseConfig = {
  mode: NODE_ENV,
  watch: true,
  context: process.cwd(),
  devtool: 'cheap-module-source-map',
  entry: {
    background: './src/extension/src/background.js',
    injectiframe: './src/extension/src/injectiframe.js',
    main: './src/extension/src/main.js',
  },
  plugins: [
    new Dotenv({
      path: `./src/extension/.env`,
    }),
    new ForkTsCheckerWebpackPlugin({
      formatter: 'codeframe',
      formatterOptions: 'highlightCode',
      checkSyntacticErrors: true,
      watch: ['./src/extension/src'],
    }),
    new CopyWebpackPlugin([
      { from: './src/extension/src/index.html' },
      { from: './src/extension/manifest.json' },
      { from: './src/extension/img/' },
      { from: './src/extension/src/iframe.css' },
    ]),
  ],
  output: {
    publicPath: '.',
    path: resolve(__dirname, 'dist/'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: /src/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: '.cache',
            },
          },
        ],
      },
      {
        // Ensure .mjs files just pass through and are not transpiled
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
    ],
  },
}

module.exports = baseConfig

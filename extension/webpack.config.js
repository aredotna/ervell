const { resolve } = require('path');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  entry: {
    'content-script': './extension/src/content-script.js',
    background: './extension/src/background.js',
    main: './extension/src/main.js',
  },
  plugins: [
    new ChromeExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'content-script',
        background: 'background',
      },
    }),
    new CopyWebpackPlugin([
      { from: './extension/src/popup.html' },
      { from: './extension/manifest.json' },
    ]),
  ],
  output: {
    publicPath: '.',
    path: resolve(__dirname, 'dist/'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
};

module.exports = config;

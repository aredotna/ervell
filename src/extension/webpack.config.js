const { resolve } = require('path')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  mode: 'development',
  watch: true,

  devtool: 'inline-source-map',
  entry: {
    background: './extension/src/background.js',
    injectiframe: './extension/src/injectiframe.js',
    main: './extension/src/main.js',
  },
  plugins: [
    new ChromeExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'injectiframe',
        background: 'background',
        main: 'main',
      },
    }),
    new CopyWebpackPlugin([
      { from: './extension/src/index.html' },
      { from: './extension/manifest.json' },
      { from: './extension/img/' },
      { from: './extension/src/iframe.css' },
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
}

module.exports = config

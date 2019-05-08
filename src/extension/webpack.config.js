const { resolve } = require('path')
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const config = {
  mode: 'development',
  watch: true,
  context: resolve(__dirname, '../../'),
  devtool: 'cheap-module-source-map',
  entry: {
    background: './src/extension/src/background.js',
    injectiframe: './src/extension/src/injectiframe.js',
    main: './src/extension/src/main.js',
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      formatter: 'codeframe',
      formatterOptions: 'highlightCode',
      checkSyntacticErrors: true,
      watch: ['./src'],
    }),
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
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
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
    ],
  },
}

module.exports = config

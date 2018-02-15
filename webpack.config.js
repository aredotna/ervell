const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const helpers = require('./webpack.helpers.js');

const { NODE_ENV, PORT } = process.env;
const isDevelopment = NODE_ENV === 'development';
const isStaging = NODE_ENV === 'staging';
const isProduction = NODE_ENV === 'production';
const isDeploy = isStaging || isProduction;

const config = {
  devtool: 'cheap-module-source-map',
  entry: {
    // webpack: [
    //   'webpack-hot-middleware/client?reload=true',
    // ],
    ...helpers.getEntrypoints(),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/assets'),
    publicPath: '/assets',
    sourceMapFilename: '[file].map?[contenthash]',
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        exclude: /node_modules/,
        loader: 'coffee-loader',
      },
      {
        test: /\.(jade|pug)$/,
        exclude: /node_modules/,
        loader: 'pug-loader',
        options: {
          doctype: 'html',
          root: __dirname,
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              // env: {
              //   development: {
              //     presets: ['react-hmre'],
              //     plugins: [
              //       ['react-transform', {
              //         transforms: [{
              //           transform: 'react-transform-hmr',
              //           imports: ['react'],
              //           locals: ['module'],
              //         }],
              //       }],
              //     ],
              //   },
              // },
            },
          },
        ],
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`[Ervell] Listening on http://localhost:${PORT} \n`],
      },
    }),
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      jade: 'jade/runtime.js',
      waypoints: 'jquery-waypoints/waypoints.js',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 10, // lower number for larger "common.js" bundle size
    }),
  ],
  resolve: {
    alias: {
      'jquery.ui.widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
    },
    extensions: ['.js', '.jsx', '.json', '.jade', '.coffee'],
    modules: [
      'node_modules',
    ],
    symlinks: false,
  },
  externals: {
    request: 'request',
  },
};

if (isDevelopment) {
  // config.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Staging
} else if (isDeploy) {
  config.devtool = '#source-map';

  // Prod
  if (isProduction) {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({ sourceMap: true }));
  }
}

module.exports = config;

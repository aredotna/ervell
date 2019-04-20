const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const helpers = require('./webpack.helpers.js');

const { NODE_ENV, PORT, ANALYZE_BUNDLE } = process.env;
const isDevelopment = NODE_ENV === 'development';
const isStaging = NODE_ENV === 'staging';
const isProduction = NODE_ENV === 'production';
const isDeploy = isStaging || isProduction;

const config = {
  mode: NODE_ENV,
  entry: {
    webpack: [
      'webpack-hot-middleware/client?reload=true',
    ],
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
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: 'file-loader',
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
        test: /\.(js|jsx)$/,
        include: /src/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        runtimeChunk: 'single',
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
        },
        default: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
        },
      },
    },
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
    // Ignore moment locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      jade: 'jade/runtime.js',
      waypoints: 'jquery-waypoints/waypoints.js',
    }),
  ],
  resolve: {
    alias: {
      'jquery.ui.widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js',
      Images: path.join(__dirname, 'public', 'images'),
    },
    extensions: ['.js', '.jsx', '.json', '.jade', '.coffee', '.mjs'],
    modules: [
      'node_modules',
    ],
    symlinks: false,
  },
  externals: {
    request: 'request',
  },
};

if (ANALYZE_BUNDLE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

if (isDevelopment) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  // Staging/Production
} else if (isDeploy) {
  // config.devtool = '#source-map';
}

module.exports = config;

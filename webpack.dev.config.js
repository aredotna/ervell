const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    all: './assets/all.styl',
    auth: './assets/auth.coffee',
    block: './assets/block.coffee',
    channel: './assets/channel.coffee',
    embed: [
      './assets/embed.coffee',
      './assets/embed.styl',
    ],
    explore: './assets/explore.coffee',
    feed: './assets/feed.coffee',
    home: './assets/home.coffee',
    import: './assets/import.coffee',
    layout: './assets/layout.coffee',
    manage: './assets/manage.coffee',
    marklet: './assets/marklet.coffee',
    pricing: './assets/pricing.coffee',
    registration: './assets/registration.coffee',
    search: './assets/search.coffee',
    settings: './assets/settings.coffee',
    share: './assets/share.coffee',
    tools: './assets/tools.coffee',
    user: './assets/user.coffee',
    vendor: './assets/vendor.coffee',
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  module: {
    rules: [
      { test: /\.coffee$/, use: 'coffee-loader' },
      { test: /\.jade$/, use: 'jade-loader' },
      { test: /\.styl$/, use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'stylus-loader' },
          ]
        }),
      },
      {
        test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff|woff2)$/,
        loader: 'url-loader', options: { limit: 10000 }
      },
      { test: /blueimp-file-upload/, use: 'imports-loader?define=>false' },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};

module.exports = config;

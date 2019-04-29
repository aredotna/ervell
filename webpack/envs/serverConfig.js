// @ts-check

const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const baseConfig = require('./baseConfig')

const { NODE_ENV } = process.env
const rootDir = process.cwd()

const serverConfig = {
  mode: NODE_ENV,
  devtool: 'source-map',
  target: 'node',
  externals: [nodeExternals()],
  node: {
    __dirname: true,
  },
  entry: path.join(rootDir, 'src/index.js'),
  output: {
    filename: 'server.dist.js',
    path: path.resolve(rootDir),
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
      ...baseConfig.module.rules,
    ],
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.coffee'],
    modules: [path.resolve(rootDir, 'src'), 'node_modules'],
  },
}

module.exports = serverConfig

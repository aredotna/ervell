// @ts-check

const path = require('path')
const WebpackManifestPlugin = require('webpack-manifest-plugin')
const { HashedModuleIdsPlugin } = require('webpack')
const { getCSSManifest } = require('../utils/getCSSManifest')

const { BUILD_SERVER, NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const buildCSS = isProduction && !BUILD_SERVER

const productionConfig = {
  mode: NODE_ENV,
  devtool: 'source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new HashedModuleIdsPlugin(),
    new WebpackManifestPlugin({
      fileName: path.resolve(process.cwd(), 'manifest.json'),
      basePath: '/assets/',
      seed: buildCSS ? getCSSManifest() : {},
    }),
  ],
}

module.exports = productionConfig

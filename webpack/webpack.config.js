// @ts-check

const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const baseConfig = require('./envs/baseConfig')
const developmentConfig = require('./envs/developmentConfig')
const productionConfig = require('./envs/productionConfig')

const { NODE_ENV = 'development' } = process.env
const isDevelopment = NODE_ENV === 'development'
const isProduction = NODE_ENV === 'production'
const BUILD_SERVER = process.env.BUILD_SERVER === 'true'
const ANALYZE_BUNDLE = process.env.ANALYZE_BUNDLE === 'true'

const getConfig = () => {
  console.log(`\n[Ervell] NODE_ENV=${NODE_ENV} \n`) // eslint-disable-line

  switch (true) {
    case isDevelopment:
      return merge.smart(baseConfig, developmentConfig)
    case isProduction:
      return merge.smart(baseConfig, productionConfig)
    case BUILD_SERVER:
      return true
  }
}

const config = getConfig()

if (ANALYZE_BUNDLE) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config

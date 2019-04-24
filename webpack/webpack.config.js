// @ts-check
/* eslint-disable no-console */

const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const {
  baseConfig,
  developmentConfig,
  productionConfig,
  serverConfig,
} = require('./envs')

const { NODE_ENV = 'development' } = process.env
const isDevelopment = NODE_ENV === 'development'
const isProduction = NODE_ENV === 'production'
const BUILD_SERVER = process.env.BUILD_SERVER === 'true'
const ANALYZE_BUNDLE = process.env.ANALYZE_BUNDLE === 'true'

const getConfig = () => {
  console.log(`\n[Ervell] NODE_ENV=${NODE_ENV} \n`)

  switch (true) {
    case BUILD_SERVER:
      console.log('[Ervell] Building server-side code...')
      return serverConfig
    case isDevelopment:
      return merge.smart(baseConfig, developmentConfig)
    case isProduction:
      return merge.smart(baseConfig, productionConfig)
  }
}

const config = getConfig()

if (ANALYZE_BUNDLE) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config

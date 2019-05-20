// @ts-nocheck
/* eslint-disable no-console */

const merge = require('webpack-merge')

const baseConfig = require('./webpack.base')
const developmentConfig = require('./webpack.dev')
const productionConfig = require('./webpack.prod')

const { NODE_ENV = 'development' } = process.env
const isDevelopment = NODE_ENV === 'development'
const isProduction = NODE_ENV === 'production'

const getConfig = () => {
  console.log(`\n[Are.na Extension] NODE_ENV=${NODE_ENV} \n`)

  switch (true) {
    case isDevelopment:
      return merge.smart(baseConfig, developmentConfig)
    case isProduction:
      return merge.smart(baseConfig, productionConfig)
  }
}

const config = getConfig()

module.exports = config

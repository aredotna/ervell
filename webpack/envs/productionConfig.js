// @ts-check

const { NODE_ENV } = process.env

const productionConfig = {
  mode: NODE_ENV,
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
}

module.exports = productionConfig

const ChromeExtensionReloader = require('webpack-chrome-extension-reloader')

const developmentConfig = {
  plugins: [
    new ChromeExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'injectiframe',
        background: 'background',
        main: 'main',
      },
    }),
  ],
}

module.exports = developmentConfig

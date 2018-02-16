const fs = require('fs');
const path = require('path');

// const { NODE_ENV } = process.env;
// const isDevelopment = NODE_ENV === 'development';

function findAssets(basePath) {
  const files = fs.readdirSync(path.join(process.cwd(), basePath));

  // Filter out .styl files
  const validAssets = (file) => {
    const whitelist = [
      '.js',
      '.coffee',
    ];

    const isValid = whitelist.some(extension =>
      extension === path.extname(file));

    return isValid;
  };

  /**
   * Construct key/value pairs representing Webpack entrypoints; e.g.,
   * { desktop: [ path/to/desktop.js ] }
   */
  const assets = files
    .filter(validAssets)
    .reduce((assetMap, file) => {
      const fileName = path.basename(file, path.extname(file));
      const asset = {
        [fileName]: [
          path.join(__dirname, basePath, file),
        ],
      };

      // Load oldschool global module dependencies
      asset[fileName].unshift('./lib/global_modules');

      // if (isDevelopment) {
      //   asset[fileName].unshift('webpack-hot-middleware/client?reload=true');
      // }

      return {
        ...assetMap,
        ...asset,
      };
    }, {});

  return assets;
}

function getEntrypoints() {
  return {
    ...findAssets('assets'),
  };
}

module.exports = {
  getEntrypoints,
  findAssets,
};

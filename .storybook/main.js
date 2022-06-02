module.exports = {
  stories: ['../**/*.stories.js'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-options',
    '@storybook/addon-actions',
    '@storybook/addon-console',
    '@storybook/addon-viewport',
    '@storybook/addon-essentials',
    'storybook-addon-apollo-client',
    {
      name: 'storybook-addon-turbo-build',
      options: {
        removeProgressPlugin: true,
        disableSourceMap: true,
        optimizationLevel: 2,
      },
    },
  ],
  typescript: {
    check: false,
    reactDocgen: false,
  },
}

import { addDecorator, configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import apolloStorybookDecorator from 'apollo-storybook-react';

import typeDefs from 'react/apollo/schema.graphql';

import mocks from '.storybook/mocks';

import { wrapWithThemeProvider } from 'react/styles/theme';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks
  })
);

addDecorator(wrapWithThemeProvider);

setOptions({
  name: 'Are.na',
  url: 'https://www.are.na',
  sortStoriesByKind: true,
  sidebarAnimations: false,
});

const req = require.context('../react/stories', true, /\.stories\.js$/)
const loadStories = () => req.keys().forEach((filename) => req(filename))

configure(loadStories, module);

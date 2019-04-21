import { addDecorator, configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import apolloStorybookDecorator from 'apollo-storybook-react';
import StoryRouter from 'storybook-react-router';

import typeDefs from 'v2/apollo/schema.graphql';

import mocks from './mocks';

import { wrapWithThemeProvider } from 'v2/styles/theme';

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks,
  })
);

addDecorator(wrapWithThemeProvider);

addDecorator(StoryRouter());

setOptions({
  name: 'Are.na',
  url: 'https://www.are.na',
  sortStoriesByKind: true,
  sidebarAnimations: false,
});

const req = require.context('../src/v2/stories', true, /\.stories\.(ts|tsx|js|jsx)$/); // prettier-ignore
const loadStories = () => req.keys().forEach(filename => req(filename));

configure(loadStories, module);

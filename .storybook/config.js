import { addDecorator, configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
import apolloStorybookDecorator from 'apollo-storybook-react';
import { Router } from 'react-router';
import createMemoryHistory from 'history/createMemoryHistory';

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

const history = createMemoryHistory();

history.push = action('history.push');
history.replace = action('history.replace');
history.go = action('history.go');
history.goBack = action('history.goBack');
history.goForward = action('history.goForward');

addDecorator(story => <Router history={history}>{story()}</Router>)

setOptions({
  name: 'Are.na',
  url: 'https://www.are.na',
  sortStoriesByKind: true,
  sidebarAnimations: false,
});

const req = require.context('../react/stories', true, /\.stories\.js$/)
const loadStories = () => req.keys().forEach((filename) => req(filename))

configure(loadStories, module);

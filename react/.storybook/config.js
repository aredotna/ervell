import { configure, addDecorator } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-react';

import typeDefs from '../apollo/schema.graphql';

const mocks = {
  Query: () => {
    return {
      status: () => {
        return 'Up'
      },
    }
  },
  Channel: () => {
    return {
      id: 555,
      title: 'Charles is cool',
      visibility: 'closed'
    }
  }
};

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks
  })
);

function loadStories() {
  require('../stories/UI');
  require('../stories/Channel');
  require('../stories/Components');
}

configure(loadStories, module);

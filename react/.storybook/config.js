import { configure, addDecorator } from '@storybook/react';
import apolloStorybookDecorator from 'apollo-storybook-react';
import typeDefs from '../apollo/schema.graphql';

const mocks = {
  Query: () => {
    return {
      status: () => {
        return "Up"
      },
    }
  },
  Channel: () => {
    return {
      id: "random-slug",
      title: "Charles is cool",
      visibility: "closed"
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
  require('../stories/index.js');
  require('../stories/channel.js');
}

configure(loadStories, module);

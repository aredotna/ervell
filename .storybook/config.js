import { addDecorator, configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
import apolloStorybookDecorator from 'apollo-storybook-react'
import StoryRouter from 'storybook-react-router'
import gql from 'graphql-tag'

import apiTypeDefs from 'v2/apollo/schema.graphql'
import clientTypeDefs from 'v2/apollo/localState/clientSchema.graphql'

import mocks from './mocks'

import { wrapWithThemeProvider } from 'v2/styles/theme'

const typeDefs = gql`
  ${apiTypeDefs}

  ${clientTypeDefs}
`

addDecorator(
  apolloStorybookDecorator({
    typeDefs,
    mocks,
  })
)

addDecorator(wrapWithThemeProvider)

addDecorator(StoryRouter())

setOptions({
  name: 'Are.na',
  url: 'https://www.are.na',
  showAddonPanel: false,
  sidebarAnimations: false,
  sortStoriesByKind: true,
})

const req = require.context('../src/v2/stories', true, /\.stories\.(ts|tsx|js|jsx)$/); // prettier-ignore
const loadStories = () => req.keys().forEach(filename => req(filename))

configure(loadStories, module)

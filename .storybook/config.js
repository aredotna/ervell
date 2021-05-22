import { addDecorator, configure } from '@storybook/react'
import { setOptions } from '@storybook/addon-options'
// import apolloStorybookDecorator from 'apollo-storybook-react'
import StoryRouter from 'storybook-react-router'
// import { gql } from '@apollo/client'

// import apiTypeDefs from 'v2/apollo/schema.graphql'
// import clientTypeDefs from 'v2/apollo/localState/clientSchema.graphql'
// import possibleTypes from 'v2/apollo/possibleTypes.json'

import mocks from './mocks'

import { wrapWithThemeProvider } from 'v2/styles/theme'

// @tvler: fix this
// const typeDefs = gql`
//   ${apiTypeDefs}
//   ${clientTypeDefs}
// `
// const fragmentMatcher = new IntrospectionFragmentMatcher({
//   introspectionQueryResultData,
// })
// const resolvers = {
//   Query: {
//     cookies: () => ({
//       __typename: 'Cookies',
//     }),
//     sharify: () => ({
//       __typename: 'Sharify',
//     }),
//     serializedMe: () => ({
//       __typename: 'SerializedMe',
//     }),
//   },
//   cookies: {
//     get: (_obj, args) => null,
//   },
//   sharify: {
//     get: (_obj, args) =>
//       ({
//         id: null,
//         name: null,
//         initials: null,
//         avatar: null,
//         authentication_token: null,
//         is_premium: null,
//         is_lifetime_premium: null,
//         is_supporter: null,
//         slug: null,
//         hide_notification_count: false,
//       }[args.name]),
//   },
// }
// const data = {
//   currentRoute: {
//     __typename: 'CurrentRoute',
//   },
//   loginStatus: {
//     __typename: 'LoginStatus',
//   },
//   cookies: {
//     __typename: 'Cookies',
//   },
//   serializedMe: {
//     __typename: 'ClientSerializedMe',
//     ...{
//       id: null,
//       name: null,
//       initials: null,
//       avatar: null,
//       authentication_token: null,
//       is_premium: null,
//       is_lifetime_premium: null,
//       is_supporter: null,
//       slug: null,
//       hide_notification_count: false,
//     },
//   },
//   sharify: {
//     __typename: 'Sharify',
//     ...{ CURRENT_USER: null },
//   },
// }
// addDecorator(
//   apolloStorybookDecorator({
//     typeDefs,
//     mocks,
//     Provider: ApolloProvider,
//     cacheOptions: {
//       fragmentMatcher,
//     },
//     apolloClientOptions: {
//       resolvers,
//     },
//     data,
//   })
// )

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

{ mountWithApolloProvider } = require '../../../../react/apollo/index.js'
{ default: GroupBilling } = require '../../../../react/components/Billing/components/GroupBilling/index.js'

module.exports = ($el) ->
  return unless $el.length
  setTimeout () =>
    mountWithApolloProvider(GroupBilling, {}, $el)
  , 1000

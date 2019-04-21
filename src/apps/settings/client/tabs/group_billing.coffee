{ mountWithApolloProvider } = require '../../../../v2/apollo/index.js'
{ default: GroupBilling } = require '../../../../v2/components/Billing/components/GroupBilling/index.js'

module.exports = ($el) ->
  return unless $el.length
  setTimeout () =>
    mountWithApolloProvider(GroupBilling, {}, $el)
  , 1000

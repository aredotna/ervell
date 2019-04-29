{ mountWithApolloProvider } = require '../../../../v2/apollo/index'
{ default: Billing } = require '../../../../v2/components/Billing/index.js'

module.exports = ($el) ->
  return unless $el.length
  mountWithApolloProvider(Billing, {}, $el)

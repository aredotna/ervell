{ mountWithApolloProvider } = require '../../../../react/apollo/index.js'
{ default: Billing } = require '../../../../react/components/Billing/index.js'

module.exports = ($el) ->
  return unless $el.length
  mountWithApolloProvider(Billing, {}, $el)

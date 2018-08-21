{ mountWithApolloProvider } = require '../../../react/apollo/index.js'
{ default: OnboardingComponent } = require '../../../react/components/Onboarding/index.js'

module.exports = ->
  # Sets up React component
  if ($onboardingComponent = $('.js-onboarding-component')).length
    mountWithApolloProvider(OnboardingComponent, {}, $onboardingComponent)

import { mountWithApolloProvider } from 'v2/apollo'
import OnboardingComponent from 'v2/components/Onboarding'
import BillingPage from 'v2/pages/welcome/BillingPage'

export default () => {
  const onboardingMountPoint = document.getElementById('onboardingMount')
  const billingMountPoint = document.getElementById('billingMount')

  if (onboardingMountPoint) {
    mountWithApolloProvider(OnboardingComponent, {}, onboardingMountPoint)
  }

  if (billingMountPoint) {
    mountWithApolloProvider(BillingPage, {}, billingMountPoint)
  }
}

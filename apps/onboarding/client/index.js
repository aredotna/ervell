import { mountWithApolloProvider } from 'react/apollo';
import OnboardingComponent from 'react/components/Onboarding';
import BillingPage from 'react/pages/welcome/BillingPage';

export default () => {
  const onboardingMountPoint = document.getElementById('onboardingMount');
  const billingMountPoint = document.getElementById('billingMount');

  if (onboardingMountPoint) {
    mountWithApolloProvider(OnboardingComponent, {}, onboardingMountPoint);
  }

  if (billingMountPoint) {
    mountWithApolloProvider(BillingPage, {}, billingMountPoint);
  }
};

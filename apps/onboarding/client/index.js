import { mountWithApolloProvider } from 'react/apollo';
import OnboardingComponent from 'react/components/Onboarding';

export default () => {
  const mountPoint = document.getElementById('apolloMount');
  mountWithApolloProvider(OnboardingComponent, {}, mountPoint);
};

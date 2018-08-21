import OnboardingComponent from 'react/components/Onboarding';

export default (req, res, next) => req.apollo.render(OnboardingComponent, {})
  .then((onboardingComponent) => {
    res.locals.onboardingComponent = onboardingComponent;
    next();
  })
  .catch(next);

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import userInfoQuery from 'react/components/Onboarding/queries/userInfo';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import AnimatedPage from 'react/components/Onboarding/components/AnimatedPage';
import Welcome from 'react/components/Onboarding/components/Welcome';
import AboutChannels from 'react/components/Onboarding/components/Channels/components/AboutChannels';
import CreateChannel from 'react/components/Onboarding/components/Channels/components/CreateChannel';

const OnboardingWrapper = styled.div`
  position: relative;
`;

const SkipOnboardingLink = styled.a`
  position: absolute;
  right: 2em;
  top: 2em;
  z-index: 3;
`;

class Onboarding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1
    }
  }

  goForward = () => {
    this.setState(prevState => {
      return {
        step: prevState.step + 1
      }
    })
  };

  componentForStep = () => {
    switch (this.state.step) {
      case 1:
        return <Welcome goForward={this.goForward}/>
      case 2:
        return <AboutChannels goForward={this.goForward}/>
      case 3:
        return <CreateChannel/>
    }
  };

  render() {
    const { data: { loading, me } } = this.props;

    if (loading) {
      return null;
    }

    const { slug } = me;

    return (
      <OnboardingWrapper>
        <SkipOnboardingLink href={`/${slug}`}>Skip</SkipOnboardingLink>
        <TransitionGroup>
          <AnimatedPage key={`onboarding-page-${this.state.step}`}>
            { this.componentForStep() }
          </AnimatedPage>
        </TransitionGroup>
      </OnboardingWrapper>
    );
  }
}

Onboarding.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

export default graphql(userInfoQuery)(Onboarding);

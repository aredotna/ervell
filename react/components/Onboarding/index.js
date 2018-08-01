import React from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import AnimatedPage from "react/components/Onboarding/components/AnimatedPage";
import Welcome from "react/components/Onboarding/components/Welcome";
import AboutChannels from "react/components/Onboarding/components/Channels/components/AboutChannels";
import CreateChannel from "react/components/Onboarding/components/Channels/components/CreateChannel";

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
    return (
      <TransitionGroup>
        <AnimatedPage key={`onboarding-page-${this.state.step}`}>
          { this.componentForStep() }
        </AnimatedPage>
      </TransitionGroup>
    );
  }
}

export default Onboarding;

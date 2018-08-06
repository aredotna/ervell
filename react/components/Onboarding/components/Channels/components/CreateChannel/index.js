import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import { space } from 'styled-system';
import { preset } from 'react/styles/functions';
import currentUserService from 'react/util/currentUserService';
import AnimatedCTAText from 'react/components/Onboarding/components/Channels/components/CreateChannel/components/AnimatedCTAText';
import ChannelNameInput from 'react/components/Onboarding/components/UI/ChannelNameInput';
import CTAButton from 'react/components/Onboarding/components/UI/CTAButton';
import Types from 'react/components/Block/utils/Types';
import Block from 'react/components/Block';

const ANIMATION_PERIOD = 500;
const ANIMATION_DELAY = 1000;

const CreateChannelWrapper = styled.div`
  width: 100%;
`;

const FadingCTAText = styled(CTAText)`
  transition: opacity ${ ANIMATION_PERIOD }ms ease-in-out;

  ${({ hasText }) =>
    hasText &&
    `
    opacity: 0.33;
  `};
`;

const FadingCTAButton = styled(CTAButton)`
  opacity: 0;
  pointer-events: none;
  transition: opacity ${ ANIMATION_PERIOD }ms ease-in-out;

  ${({ hasText }) =>
    hasText &&
    `
    opacity: 1;
    pointer-events: all;
    transition-delay: ${ ANIMATION_DELAY }ms;
  `};
`;

const FadingBlockWrapper = styled.div`
  opacity: 0;
  pointer-events: none;
  transition: opacity ${ ANIMATION_PERIOD }ms ease-in-out;
  ${space}
  ${preset(space, { mt: 6 })}

  ${({ hasText }) =>
    hasText &&
    `
    opacity: 1;
    pointer-events: all;
    transition-delay: ${ ANIMATION_DELAY }ms;
  `};
`;

class CreateChannel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channelName: "",
      channelNameStep: 0
    };
  }

  handleChannelNameChange = e => {
    const name = e.target.value;

    this.setState({
      channelName: name
    });

    if (name.length > 0 && this.state.channelNameStep == 0) {
      // Mimic delay of other elements using CSS transition delay.
      this.channelNameStepChangeTimeout = setTimeout(() => {
        this.setState({
          channelNameStep: 1
        });
      }, ANIMATION_DELAY);
    } else {
      clearTimeout(this.channelNameStepChangeTimeout);

      if (name.length === 0 && this.state.channelNameStep == 1) {
        this.setState({
          channelNameStep: 0
        })
      }
    }
  };

  ctaTextForChannelNameStep = () => {
    const hasText = this.state.channelName;

    switch (this.state.channelNameStep) {
      case 0:
        return (
          <FadingCTAText hasText={hasText}>
            First, type a channel name...
          </FadingCTAText>
        );
      case 1:
        return (
          <FadingCTAText hasText={true}>
            Click “Create Channel”
          </FadingCTAText>
        );
    }
  };

  render() {
    const hasText = this.state.channelName;
    const username = currentUserService().username;

    return (
      <CreateChannelWrapper>
        <TransitionGroup style={{display: "block", position: "relative"}}>
          <AnimatedCTAText
            key={
              `onboarding-create-channel-cta-step-${this.state.channelNameStep}`
            }
            positionAbsoluteDuringTransition={this.state.channelNameStep == 1}
          >
            { this.ctaTextForChannelNameStep() }
          </AnimatedCTAText>
        </TransitionGroup>
        <div>
          <ChannelNameInput
            autoFocus={true}
            value={this.state.channelName}
            onChange={this.handleChannelNameChange}/>
        </div>
        <FadingBlockWrapper hasText={ hasText }>
          <Block
            type={Types.CHANNEL}
            blockData={{
              length: 0,
              title: this.state.channelName,
              updatedAtAgo: "0 minutes ago",
              username: username,
              visibility: "private"
            }}
          />
        </FadingBlockWrapper>
        <FadingCTAButton
          hasText={ hasText }
          onClick={()=>{console.log("forward!")}}
        >
          Create Channel
        </FadingCTAButton>
      </CreateChannelWrapper>
    );
  }
};

CreateChannel.propTypes = {};

CreateChannel.defaultProps = {};

export default CreateChannel;

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space } from 'styled-system';
import { preset } from 'react/styles/functions';
import { compose, graphql } from 'react-apollo';
import userInfoQuery from 'react/components/Onboarding/components/Channels/components/CreateChannel/queries/userInfo';
import createChannelMutation from 'react/components/Onboarding/components/Channels/components/CreateChannel/mutations/createChannel';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import AnimatedCTAText from 'react/components/Onboarding/components/Channels/components/CreateChannel/components/AnimatedCTAText';
import ChannelTitleInput from 'react/components/Onboarding/components/UI/ChannelTitleInput';
import CTAText from 'react/components/Onboarding/components/UI/CTAText';
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

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none!important;
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
      channelTitle: "",
      channelTitleStep: 0,
      saving: false
    };
  }

  handleChannelTitleChange = e => {
    const name = e.target.value;

    this.setState({
      channelTitle: name
    });

    if (name.length > 0 && this.state.channelTitleStep == 0) {
      // Mimic delay of other elements using CSS transition delay.
      this.channelTitleStepChangeTimeout = setTimeout(() => {
        this.setState({
          channelTitleStep: 1
        });
      }, ANIMATION_DELAY);
    } else {
      clearTimeout(this.channelTitleStepChangeTimeout);

      if (name.length === 0 && this.state.channelTitleStep == 1) {
        this.setState({
          channelTitleStep: 0
        })
      }
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ saving: true }, () => {
      const { createChannel } = this.props;
      const { channelTitle: title } = this.state;

      return createChannel({ variables: { title } })
        .then(({ data: { create_channel: { channel: { id, href, title } } } }) => {
          window.location = href;
        })
        .catch((err) => {
          console.error(err);
          this.setState({ saving: false });
        });
    });
  };

  ctaTextForChannelTitleStep = () => {
    const hasText = this.state.channelTitle;

    switch (this.state.channelTitleStep) {
      case 0:
        return (
          <FadingCTAText hasText={hasText}>
            First, type a channel name…
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
    const { data: { loading, me } } = this.props;

    if (loading) {
      return null;
    }

    const { name } = me;
    const hasText = this.state.channelTitle;

    return (
      <CreateChannelWrapper>
        <TransitionGroup style={{display: "block", position: "relative"}}>
          <AnimatedCTAText
            key={
              `onboarding-create-channel-cta-step-${this.state.channelTitleStep}`
            }
            positionAbsoluteDuringTransition={this.state.channelTitleStep == 1}
          >
            {this.ctaTextForChannelTitleStep()}
          </AnimatedCTAText>
        </TransitionGroup>
        <div>
          <ChannelTitleInput
            autoFocus={true}
            disabled={this.state.saving}
            onChange={this.handleChannelTitleChange}
            value={this.state.channelTitle}/>
        </div>
        <FadingBlockWrapper hasText={hasText}>
          <Block
            type={Types.CHANNEL}
            blockData={{
              length: 0,
              title: this.state.channelTitle,
              updatedAtAgo: "0 minutes ago",
              username: name,
              visibility: "private"
            }}
          />
        </FadingBlockWrapper>
        <FadingCTAButton
          disabled={this.state.saving}
          hasText={hasText}
          onClick={this.handleSubmit}
        >
          { this.state.saving ? 'Saving…' : 'Create Channel' }
        </FadingCTAButton>
      </CreateChannelWrapper>
    );
  }
};

CreateChannel.propTypes = {
  createChannel: PropTypes.func.isRequired,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

CreateChannel.defaultProps = {};

export default compose(
  graphql(userInfoQuery),
  graphql(createChannelMutation, { name: 'createChannel' }),
)(CreateChannel);

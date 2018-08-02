import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CTAText from 'react/components/Onboarding/components/UI/CTAText';
import ChannelNameInput from 'react/components/Onboarding/components/UI/ChannelNameInput';
import CTAButton from 'react/components/Onboarding/components/UI/CTAButton';

const ANIMATION_PERIOD = 500;

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
    transition-delay: 1s;
  `};
`;

class CreateChannel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channelName: "",
    };
  }

  render() {
    const hasText = this.state.channelName.length > 0;

    return (
      <div>
        <FadingCTAText hasText={ hasText } >
          First, type a channel name...
        </FadingCTAText>
        <div>
          <ChannelNameInput
            autoFocus={true}
            value={this.state.channelName}
            onChange={e => {
              this.setState({
                channelName: e.target.value
              })
            }}/>
        </div>
        <FadingCTAButton
          hasText={ hasText }
          onClick={()=>{console.log("forward!")}}
        >
          Create Channel
        </FadingCTAButton>
      </div>
    );
  }
};

CreateChannel.propTypes = {};

CreateChannel.defaultProps = {};

export default CreateChannel;

import React from 'react';
import PropTypes from 'prop-types';
import CTAText from 'react/components/Onboarding/components/UI/CTAText';
import ChannelNameInput from 'react/components/Onboarding/components/UI/ChannelNameInput';

class CreateChannel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channelName: ""
    };
  }

  render() {
    return (
      <div>
        <CTAText>
          First, type a channel name...
        </CTAText>
        <ChannelNameInput
          autoFocus={true}
          value={this.state.channelName}
          onChange={e => {
            this.setState({
              channelName: e.target.value
            })
          }}/>
      </div>
    );
  }
};

CreateChannel.propTypes = {};

CreateChannel.defaultProps = {};

export default CreateChannel;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import emptyProfileFragment from 'react/components/ProfileEmptyMessage/fragments/indentifiable';

import Text from 'react/components/UI/Text';
import Box from 'react/components/UI/Box';
import Modal from 'react/components/UI/Modal';
import { GenericButton as Button } from 'react/components/UI/GenericButton';
import NewChannelForm from 'react/components/NewChannelForm';

const Copy = styled(Text)`
  text-align: center;
  a {
    font-weight: bold;
  }
  a:hover{
    color: ${x => x.theme.colors.gray.base};
  }
`;

export default class ProfileEmptyMessage extends Component {
  static propTypes = {
    isMine: PropTypes.bool,
    identifiable: propType(emptyProfileFragment).isRequired,
  }

  static defaultProps = {
    isMine: false,
  }

  openNewChannelModal = () => {
    const { identifiable } = this.props;

    const newChannelProps = identifiable.__typename === 'Group' && {
      group_id: identifiable.id,
      authorType: 'GROUP',
      visibility: 'PRIVATE',
    };

    const modal = new Modal(NewChannelForm, newChannelProps);
    modal.open();
  }

  render() {
    const { isMine, identifiable } = this.props;
    const isGroup = identifiable.__typename === 'Group';

    return (
      <Copy f={[6, 6, 8]} mt={7} mb={6} color="gray.medium" lineHeight={[2, 2, 2]}>

        {/* Profile is the current user's */}
        {isMine && !isGroup &&
          <div>
            <Box>You profile doesn&#39;t have any content yet.</Box>
            <Button f={[3, 3, 5]} mt={6} onClick={this.openNewChannelModal} color="gray.bold">
              Create a channel
            </Button>
          </div>
        }

        {/* Profile is the current user's group */}
        {isMine && isGroup &&
          <div>
            <Box>This is your group&#39;s profile.</Box>
            <Box mt={5}>
              Your group will stay secret until you create a publicly visible channel.
            </Box>
            <Button f={[3, 3, 5]} mt={7} onClick={this.openNewChannelModal} color="gray.bold">
              Create a group channel
            </Button>
          </div>
        }

        {/* Profile is not associated with the current user */}
        {!isMine &&
          <div>
            <Box>{identifiable.name} doesn&#39;t have any public content yet.</Box>
            <Box mt={5}>Follow them to get an update in your feed when they add something.</Box>
          </div>
        }
      </Copy>
    );
  }
}

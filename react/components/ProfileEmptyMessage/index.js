import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import emptyProfileFragment from 'react/components/ProfileEmptyMessage/fragments/indentifiable';

import Text from 'react/components/UI/Text';
import Modal from 'react/components/UI/Modal';
import NewChannelForm from 'react/components/NewChannelForm';


const Copy = styled(Text)`
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
      <Copy f={6} my={8} color="gray.medium" lineHeight={2}>

        {/* Profile is the current user's */}
        {isMine && !isGroup &&
          <div>
            This is your profile.<br />
            All of your channels and content will show up here.
          </div>
        }

        {/* Profile is the current user's group */}
        {isMine && isGroup &&
          <div>
            This is your group&#39;s profile.<br />
            All of your group&#39;s channels will show up here.
          </div>
        }

        {/* Profile is either the current user's or the current user's group */}
        {isMine &&
          <div>
            Try{' '}
            <a href="#" onClick={this.openNewChannelModal}>creating a channel</a>.
          </div>
        }

        {/* Profile is not associated with the current user */}
        {!isMine &&
          <div>
            There&#39;s no public content here yet.<br />
            Try{' '}
            <a href="/explore">explore</a>
            {' '}to see what other people are up to.
          </div>
        }
      </Copy>
    );
  }
}

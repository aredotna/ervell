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
    const newChannelProps = identifiable.__typename === 'Group' && { group_id: identifiable.id, authorType: 'GROUP' };
    const modal = new Modal(NewChannelForm, newChannelProps);
    modal.open();
  }

  render() {
    const { isMine } = this.props;

    return (
      <Copy f={6} my={8} color="gray.medium" lineHeight={2}>
        There&#39;s no {!isMine && 'public'} content here yet.<br />

        {!isMine &&
          <div>
            Try{' '}
            <a href="/explore">explore</a>
            {' '}to see what other people are up to.
          </div>
        }

        {isMine &&
          <div>
            Try{' '}
            <a href="#" onClick={this.openNewChannelModal}>creating a channel</a>.
          </div>
        }
      </Copy>
    );
  }
}

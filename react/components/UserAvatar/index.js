import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Styles from 'react/styles';

import Avatar from 'react/Components/UI/Avatar';

import userAvatarFragment from 'react/components/UserAvatar/fragments/userAvatar';

const Initials = styled.div`
  font-size: ${x => x.size / 3}px;
  color: ${Styles.Colors.gray.medium};
  text-transform: uppercase;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default class UserAvatar extends Component {
  static defaultProps = {
    size: 40,
  }

  static propTypes = {
    user: propType(userAvatarFragment).isRequired,
    size: PropTypes.number,
  }

  state = {
    hideImage: false,
  }

  hideImage = () => {
    this.setState({ hideImage: true });
  }

  render() {
    const { hideImage } = this.state;
    const { user, size } = this.props;

    return (
      <Avatar href={user.href} size={size}>
        <Initials size={size}>
          {user.initials}
        </Initials>

        {!hideImage &&
          <Image
            src={user.avatar}
            alt={user.initials}
            onError={this.hideImage}
          />
        }
      </Avatar>
    );
  }
}

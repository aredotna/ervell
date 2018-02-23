import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Styles from 'react/styles';

import Avatar from 'react/Components/UI/Avatar';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

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

export default class MemberAvatar extends Component {
  static defaultProps = {
    size: 40,
  }

  static propTypes = {
    member: propType(memberAvatarFragment).isRequired,
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
    const { member, size } = this.props;

    return (
      <Avatar href={member.href} size={size}>
        <Initials size={size}>
          {member.initials}
        </Initials>

        {member.avatar && !hideImage &&
          <Image
            src={member.avatar}
            alt={member.initials}
            onError={this.hideImage}
          />
        }
      </Avatar>
    );
  }
}

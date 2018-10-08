import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Avatar from 'react/components/UI/Avatar';

import groupAvatarFragment from 'react/components/UserAvatar/fragments/userAvatar';

const CircleAvatar = styled(Avatar)`
  border-radius: 100%;
`;

const Initials = styled.div`
  font-size: ${x => x.size / 3}px;
  color: ${x => x.theme.colors.gray.medium};
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

export default class GroupAvatar extends Component {
  static defaultProps = {
    size: 40,
  }

  static propTypes = {
    group: propType(groupAvatarFragment).isRequired,
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
    const { group, size, ...rest } = this.props;

    return (
      <CircleAvatar href={group.href} f={size} size={size} {...rest}>
        <Initials f={size}>
          {group.initials}
        </Initials>

        {!hideImage &&
          <Image
            src={group.avatar}
            alt={group.initials}
            onError={this.hideImage}
          />
        }
      </CircleAvatar>
    );
  }
}

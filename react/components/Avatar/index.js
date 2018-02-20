import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Styles from 'react/styles';

import avatarFragment from 'react/components/Avatar/fragments/avatar';

const Container = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${x => x.size}px;
  height: ${x => x.size}px;
  background-color: ${Styles.Colors.gray.semiLight};
`;

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

export default class Avatar extends Component {
  static defaultProps = {
    size: 40,
  }

  static propTypes = {
    user: propType(avatarFragment).isRequired,
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
      <Container href={user.href} size={size}>
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
      </Container>
    );
  }
}

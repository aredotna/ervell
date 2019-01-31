import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import PrimarySearch from 'react/components/TopBar/components/PrimarySearch';
import AuthenticationLinks from 'react/components/TopBar/components/AuthenticationLinks';
import NewChannelButton from 'react/components/TopBar/components/NewChannelButton';
import NotificationCount from 'react/components/TopBar/components/NotificationCount';
import MyRepresentation from 'react/components/TopBar/components/MyRepresentation';

import WithSerializedMe from 'react/hocs/WithSerializedMe';

const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

class TopBar extends PureComponent {
  static propTypes = {
    serializedMe: PropTypes.shape({
      id: PropTypes.number,
    }),
  }

  static defaultProps = {
    serializedMe: null,
  }

  render() {
    const { serializedMe: me, ...rest } = this.props;

    return (
      <Container {...rest}>
        <PrimarySearch flex={1} />

        {me
          ? (
            <React.Fragment>
              <NewChannelButton py={4} pl={6} />
              <NotificationCount py={3} px={6} me={me} />
              <MyRepresentation pr={2} me={me} />
            </React.Fragment>
          )
          : <AuthenticationLinks px={6} />
        }
      </Container>
    );
  }
}

export default WithSerializedMe(TopBar);

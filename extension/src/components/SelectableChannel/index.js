import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';
import BorderedLock from 'react/components/UI/BorderedLock';

import selectableChannelFragment from 'extension/src/components/SelectableChannel/fragments/selectableChannel';
import withExtensionContext from 'extension/src/components/Extension/withExtension';

const Container = styled.a`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: ${props => props.theme.colors.gray.hint}
  }
`;

class SelectableChannel extends PureComponent {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    context: PropTypes.object.isRequired,
    channel: propType(selectableChannelFragment).isRequired,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => null,
  }

  onClick = () => {
    const { context, onClick, channel } = this.props;

    context.selectChannel(channel);
    onClick();
  }

  render() {
    const { channel: { title, visibility } } = this.props;

    return (
      <Container onClick={this.onClick}>
        <Text
          f={4}
          p={3}
          fontWeight="bold"
          color={`channel.${visibility}`}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        {visibility === 'private' &&
          <BorderedLock />
        }
      </Container>
    );
  }
}

export default withExtensionContext(SelectableChannel);

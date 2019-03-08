import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';

import channelPreviewQuery from 'react/components/Cell/components/Konnectable/components/ChannelPreview/queries/channelPreview';

import Box from 'react/components/UI/Box';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import DividerButton from 'react/components/UI/Buttons/components/DividerButton';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import ChannelPreviewBlocks from 'react/components/Cell/components/Konnectable/components/ChannelPreview/components/ChannelPreviewBlocks';

const Container = styled(Box)`
  width: 100%;
  height: 100%;;
  display: flex;
  flex-direction: column;
`;

const Preview = styled(Box)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;

  &:hover {
    opacity: 0.5;
  }
`;

export default class ChannelPreview extends PureComponent {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onClose: PropTypes.func.isRequired,
    amount: PropTypes.number,
    color: PropTypes.string,
  }

  static defaultProps = {
    amount: 10,
    color: null,
  }

  render() {
    const {
      id,
      onClose,
      amount,
      color,
      ...rest
    } = this.props;

    return (
      <Container {...rest}>
        <Preview>
          <Query query={channelPreviewQuery} variables={{ id, amount }}>
            {({ data, error, loading }) => {
              if (error) {
                return <ErrorAlert>error.message</ErrorAlert>;
              }

              const Indicator = () =>
                <LoadingIndicator mt={6} f={8} color={color} />;

              if (loading) return <Indicator />;

              const { channel: { blocks } } = data;

              return (
                <ChannelPreviewBlocks
                  blocks={blocks}
                  LoadingIndicator={Indicator}
                />
              );
            }}
          </Query>
        </Preview>

        <DividerButton f={4} color={color} onClick={onClose}>
          Stop Preview
        </DividerButton>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from 'react/components/UI/Modal';
import Text from 'react/components/UI/Text';
import PageContainer from 'react/components/UI/PageContainer';
import ConnectTwitter from 'react/components/ConnectTwitter/index';
import { GenericButton } from '../../../components/UI/GenericButton';

const ActionContainer = styled.div`
  text-align: center;
  padding: ${x => x.theme.space[7]} 0;
`;

const Headline = styled(Text).attrs({
  fontSize: 7,
  lineHeight: 1,
  align: 'center',
})`
`;

const SmallText = styled(Text).attrs({
  fontSize: 3,
  lineHeight: 1,
  mt: 4,
})``;

const CancelLink = styled(SmallText)`
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;
`;

const openModal = () => {
  const modal = new Modal(ConnectTwitter);
  modal.open();
};

export default class EmptyConnectTwitterPage extends Component {
  cancelConnect = () => false

  render() {
    return (
      <PageContainer>
        <Headline>
          You aren&apos;t following anyone yet.<br />
          Do you want to search your Twitter contacts to find friends on Are.na?
        </Headline>
        <ActionContainer>
          <GenericButton onClick={openModal}>
            Connect to Twitter
          </GenericButton>
          <SmallText>
            No, just take me to <CancelLink onClick={this.cancelConnect}>my feed</CancelLink>.
          </SmallText>
        </ActionContainer>
      </PageContainer>
    );
  }
}

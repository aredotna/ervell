import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import Text from 'react/components/UI/Text';
import PageContainer from 'react/components/UI/PageContainer';
import { GenericButtonLink } from 'react/components/UI/GenericButton';
import FollowerCountCheckQuery from 'react/pages/feed/NoFollowingMessage/queries/followerCount';
import FollowerCountCheckFragment from 'react/pages/feed/NoFollowingMessage/fragments/followerCount';

const ActionContainer = styled.div`
  text-align: center;
  padding: ${x => x.theme.space[7]} 0;
`;

const Container = styled(PageContainer)`
  margin: 0 auto ${x => x.theme.space[8]};
`;

const Headline = styled(Text).attrs({
  fontSize: 7,
  lineHeight: 1,
  align: 'center',
})`
`;

class NoFollowingMessage extends Component {
  static propTypes = {
    data: PropTypes.shape({
      me: propType(FollowerCountCheckFragment),
    }).isRequired,
  }

  render() {
    const { data, data: { error, loading } } = this.props;

    if (error || loading || (data.me.counts.following > 1)) {
      return (<div />);
    }

    return (
      <Container>
        <Headline>
          Discover how other people are using Are.na
        </Headline>
        <ActionContainer>
          <GenericButtonLink href="/examples">
            See examples
          </GenericButtonLink>
        </ActionContainer>
      </Container>
    );
  }
}

export default graphql(FollowerCountCheckQuery)(NoFollowingMessage);

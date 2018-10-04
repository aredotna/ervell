import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import feedGroupFragment from 'react/components/Feed/components/FeedGroups/fragments/group';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import FeedGroupSentence from 'react/components/Feed/components/FeedGroupSentence';
import FeedGroupObjects from 'react/components/Feed/components/FeedGroupObjects';

const Container = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Body = styled(Box)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  text-align: center;
`;

const FeedGroup = styled.div`
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
  margin-bottom: ${x => x.theme.space[7]};
  &:last-child {
    border-bottom: none;
  }
`;

const FeedGroups = ({ groups }) => (
  <Container>
    {groups.length === 0 &&
      <Text textAlign="center" f={3}>
        No notifications yet.
      </Text>
    }

    {groups.length > 0 &&
      <Body p={6}>
        {groups.map(group => (
          <FeedGroup>
            <FeedGroupSentence
              key={group.id}
              group={group}
            />
            <FeedGroupObjects objects={group.objects} />
          </FeedGroup>
        ))}
      </Body>
    }
  </Container>
);

FeedGroups.propTypes = {
  groups: PropTypes.arrayOf(propType(feedGroupFragment)).isRequired,
};

export default FeedGroups;

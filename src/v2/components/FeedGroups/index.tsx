import React from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import feedGroupFragment from 'v2/components/FeedGroups/fragments/group'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import FeedGroupSentence from 'v2/components/FeedGroups/components/FeedGroupSentence'
import FeedGroupObjects from 'v2/components/FeedGroups/components/FeedGroupObjects'

const Container = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Body = styled(Box)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  text-align: center;
`

const FeedGroup = styled.div`
  border-top: 1px solid ${x => x.theme.colors.gray.light};
  padding: ${x => x.theme.space[8]} 0 ${x => x.theme.space[7]};
`

const EmptyContainer = styled(Body)`
  border-top: 1px solid ${x => x.theme.colors.gray.light};
  padding: ${x => x.theme.space[8]} 0;
`

const FeedGroups = ({ groups, context }) => (
  <Container>
    {groups.length === 0 && (
      <EmptyContainer p={6}>
        <Text textAlign="center" f={6}>
          Nothing in your feed yet...
        </Text>
      </EmptyContainer>
    )}

    {groups.length > 0 && (
      <Body my={6}>
        {groups.map(group => (
          <FeedGroup key={`FeedGroup__${group.id}`}>
            {[
              <FeedGroupSentence
                key={`FeedGroupSentence__${group.id}`}
                group={group}
              />,

              <FeedGroupObjects
                key={`FeedGroupObjects__${group.id}`}
                objects={group.objects}
                context={context}
              />,
            ]}
          </FeedGroup>
        ))}
      </Body>
    )}
  </Container>
)

FeedGroups.propTypes = {
  groups: PropTypes.arrayOf(propType(feedGroupFragment)).isRequired,
  context: PropTypes.arrayOf(
    PropTypes.shape({
      __typename: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
}

FeedGroups.defaultProps = {
  context: [],
}

export default FeedGroups

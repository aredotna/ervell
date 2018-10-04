import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import FeedObjectLink from 'react/components/Feed/components/FeedGroupSentence/components/FeedObjectLink/index';

import feedGroupSentenceFragment from 'react/components/Feed/components/FeedGroupSentence/fragments/sentence';

const RelativeTime = styled(Text).attrs({
  f: 1,
  color: 'gray.medium',
  my: 6,
})`
  text-transform: uppercase;
`;

const Label = styled(Text).attrs({
  f: 5,
  display: 'inline',
})`
`;

const Container = styled(Box).attrs({
  my: 3,
})`
  ${x => x.isUnread && `
    border-left: 2px solid ${x.theme.colors.state.alert};
    padding-left: ${x.theme.space[4]};
  `}
`;

export default class FeedGroupSentence extends Component {
  static propTypes = {
    group: propType(feedGroupSentenceFragment).isRequired,
  }

  render() {
    const {
      group: {
        user,
        action,
        item,
        connector,
        target,
        created_at,
      },
    } = this.props;

    return (
      <Container my={3} pr={6}>
        <div>
          <FeedObjectLink {...user} />

          {action === 'commented on' &&
            <span>
              <Label>
                {' says '}
                “<a
                  href={target.href}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />”
                {' on '}
              </Label>

              <FeedObjectLink {...target} />
            </span>
          }

          {action !== 'commented on' &&
            <span>
              <Label>
                {` ${action} `}
              </Label>

              <FeedObjectLink {...item} />

              {connector &&
                <Label>
                  {` ${connector} `}
                </Label>
              }

              {target &&
                <FeedObjectLink {...target} />
              }
            </span>
          }
        </div>

        <RelativeTime>
          {created_at}
        </RelativeTime>
      </Container>
    );
  }
}

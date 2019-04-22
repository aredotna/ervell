import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import FeedObjectLink from 'react/components/Feed/components/FeedGroupSentence/components/FeedObjectLink/index';
import BorderedLock from 'react/components/UI/BorderedLock';

import feedGroupSentenceFragment from 'react/components/Feed/components/FeedGroupSentence/fragments/sentence';

const RelativeTime = styled(Text).attrs({
  f: 1,
  color: 'gray.medium',
})`
  text-transform: uppercase;
`;

const Label = styled(Text).attrs({
  f: 6,
  display: 'inline',
})`
`;

const Sentence = styled.div`
  word-wrap: break-word;
  margin-bottom: ${x => x.theme.space[2]};
  max-width: ${x => x.theme.space[14]};
  margin: 0 auto;
`;

const Submetadata = styled(Box).attrs({
  mt: 5,
})`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`;

const Container = styled(Box)``;

export default class FeedGroupSentence extends PureComponent {
  static propTypes = {
    group: propType(feedGroupSentenceFragment).isRequired,
  }

  render() {
    const {
      group: {
        owner,
        action,
        item,
        connector,
        target,
        created_at,
        item_phrase,
        objects,
        is_private,
      },
    } = this.props;

    return (
      <Container my={3} pr={6}>
        <Sentence>
          <FeedObjectLink {...owner} />

          {action === 'commented' &&
            <span>
              <Label>
                {' said '}
                “<a
                  href={objects[0].href}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />”
              </Label>
            </span>
          }

          {action !== 'commented' &&
            <span>
              <Label>
                {` ${action} `}
              </Label>


              {item_phrase &&
                <FeedObjectLink {...item} label={item_phrase} />
              }

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
        </Sentence>

        <Submetadata>
          <RelativeTime>
            {created_at}
          </RelativeTime>

          {is_private &&
            <BorderedLock ml={3} />
          }
        </Submetadata>
      </Container>
    );
  }
}

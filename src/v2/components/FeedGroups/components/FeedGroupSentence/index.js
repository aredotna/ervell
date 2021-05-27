import React, { PureComponent } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import FeedObjectLink from 'v2/components/FeedGroups/components/FeedGroupSentence/components/FeedObjectLink/index'
import BorderedLock from 'v2/components/UI/BorderedLock'

import feedGroupSentenceFragment from 'v2/components/FeedGroups/components/FeedGroupSentence/fragments/sentence'

const RelativeTime = styled(Text).attrs({
  f: [1],
  color: 'gray.medium',
})`
  text-transform: uppercase;
`

const Label = styled(Text).attrs({
  f: [5, 5, 6],
  display: 'inline',
})``

const Sentence = styled.div`
  word-wrap: break-word;
  margin-bottom: ${x => x.theme.space[2]};
  max-width: ${x => x.theme.space[14]};
  margin: 0 auto;
`

const Submetadata = styled(Box).attrs({
  mt: 5,
})`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`

const Container = styled(Box)``

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
    } = this.props

    return (
      <Container my={3} pr={6}>
        <Sentence>
          <FeedObjectLink obj={owner} {...owner} />

          {action === 'commented' && (
            <span>
              <Label>
                {' said '}
                “
                <a
                  href={objects[0].href}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
                ”
              </Label>
            </span>
          )}

          {action !== 'commented' && (
            <span>
              <Label>{` ${action} `}</Label>

              {item_phrase && <FeedObjectLink obj={item} label={item_phrase} />}

              {connector && <Label>{` ${connector} `}</Label>}

              {target && <FeedObjectLink obj={target} />}
            </span>
          )}
        </Sentence>

        <Submetadata>
          <RelativeTime>{created_at}</RelativeTime>

          {is_private && <BorderedLock ml={3} />}
        </Submetadata>
      </Container>
    )
  }
}

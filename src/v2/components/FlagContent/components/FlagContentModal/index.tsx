import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'

import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import {
  BaseConnectableTypeEnum,
  FlagCategoryEnum,
} from '__generated__/globalTypes'
import {
  flagContentMutation as flagContentMutationType,
  flagContentMutationVariables,
} from '__generated__/flagContentMutation'
import flagContentMutation from '../../mutations/flagContentMutation'

type CategoryMode = 'resting' | 'confirming' | 'confirmed'

const Container = styled(Box).attrs({
  py: 5,
  px: 7,
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Copy = styled(Text).attrs({
  f: 3,
  py: 5,
  boldLinks: true,
  lineHeight: '1.5',
})``

const Categories = styled(Box).attrs({
  px: 3,
})``

const Category = styled<{ mode: CategoryMode }>(Text).attrs({
  f: 3,
  fontWeight: 'bold',
  pb: 3,
})`
  cursor: pointer;

  color: ${({ theme, mode }) =>
    mode === 'confirming' ? theme.colors.state.alert : theme.colors.gray.bold};

  ul {
    margin-left: ${props => props.theme.space[1]};
  }
  li {
    margin-top: ${props => props.theme.space[3]};
    margin-bottom: ${props => props.theme.space[3]};
  }
`

interface FlagContentModalProps {
  id: string
  type: BaseConnectableTypeEnum
  onDone: () => void
}

interface FlagContentCategoryProps {
  category: FlagCategoryEnum
}

const FlagContentCategory: React.FC<FlagContentCategoryProps &
  FlagContentModalProps> = ({ category, id, type, onDone }) => {
  const [mode, setMode] = useState<CategoryMode>('resting')
  const [flagContent] = useMutation<
    flagContentMutationType,
    flagContentMutationVariables
  >(flagContentMutation)
  const handleFlagContent = useCallback(() => {
    if (mode == 'resting') {
      return setMode('confirming')
    }

    if (mode == 'confirming') {
      flagContent({
        variables: {
          id,
          type,
          category,
        },
      })
        .then(() => {
          onDone()
        })
        .catch(err => {
          console.log(err)
        })

      return setMode('confirmed')
    }
  }, [id, type, category, mode, setMode, flagContent, onDone])

  const categoryText = {
    [FlagCategoryEnum.SPAM]: 'Spam',
    [FlagCategoryEnum.NSFW]: 'NSFW but not marked as such',
    [FlagCategoryEnum.OFFENSIVE]: 'Offensive / objectionable content',
  }[category]

  return (
    <Category mode={mode} onClick={handleFlagContent}>
      {
        {
          resting: `${categoryText}`,
          confirming: `Are you sure you want to flag this as ${category
            .toString()
            .toLowerCase()}?`,
          confirmed: `Flagging as ${categoryText}`,
        }[mode]
      }
    </Category>
  )
}

export const FlagContentModal: React.FC<FlagContentModalProps> = ({
  id,
  type,
  onDone,
}) => {
  return (
    <Container>
      <Copy>
        Be mindful when reporting content, read our{' '}
        <a href="https://www.are.na/community-guidelines" target="_blank">
          Community Guidelines
        </a>{' '}
        and{' '}
        <a href="https://www.are.na/terms" target="_blank">
          Terms
        </a>{' '}
        to know what is allowed.
      </Copy>
      <Copy>
        If you'd like to flag this item for review, please select a category
        below:
      </Copy>
      <Categories>
        <FlagContentCategory
          category={FlagCategoryEnum.SPAM}
          id={id}
          type={type}
          onDone={onDone}
        />
        <FlagContentCategory
          category={FlagCategoryEnum.NSFW}
          id={id}
          type={type}
          onDone={onDone}
        />
        <FlagContentCategory
          category={FlagCategoryEnum.OFFENSIVE}
          id={id}
          type={type}
          onDone={onDone}
        />
      </Categories>
      <Copy>
        We will review this content as soon as possible, and get back to you if
        we have any questions.
      </Copy>
    </Container>
  )
}

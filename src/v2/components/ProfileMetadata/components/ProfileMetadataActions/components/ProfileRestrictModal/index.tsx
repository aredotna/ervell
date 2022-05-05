import React, { useCallback, useState } from 'react'
import { useMutation } from '@apollo/client'

import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { Input } from 'v2/components/UI/Inputs'
import TitledDialog from 'v2/components/UI/TitledDialog'
import restrictMutation from './mutations/restrictMutation'
import {
  restrictMutation as RestrictMutation,
  restrictMutationVariables,
} from '__generated__/restrictMutation'

const Container = styled(Box).attrs({
  py: 5,
  px: 7,
})`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Copy = styled(Text).attrs({
  f: 4,
  color: 'gray.bold',
  pb: 3,
})`
  ul {
    margin-left: ${props => props.theme.space[1]};
  }
  li {
    margin-top: ${props => props.theme.space[3]};
    margin-bottom: ${props => props.theme.space[3]};
  }
`

const TextInput = styled(Input).attrs({
  flex: 1,
  f: 2,
})``

interface RestrictPersonModalProps {
  id: string
  name: string
}

export const RestrictPersonModal: React.FC<RestrictPersonModalProps> = ({
  id,
  name,
}) => {
  const [disabled, setDisabled] = useState(true)
  const [mode, setMode] = useState<
    'resting' | 'restricting' | 'error' | 'confirmed'
  >('resting')
  const [restrictContent] = useMutation<
    RestrictMutation,
    restrictMutationVariables
  >(restrictMutation, { variables: { id } })

  const onPress = useCallback(
    e => {
      e.preventDefault()
      setMode('restricting')
      restrictContent()
        .then(() => {
          setMode('confirmed')
          setTimeout(() => {
            setMode('resting')
            window.location.href = '/'
          }, 3000)
        })
        .catch(() => {
          setMode('error')
        })
    },
    [setMode, restrictContent]
  )

  const onChange = useCallback(
    ({ target: { value } }) => {
      console.log({ value })
      setDisabled(value != id)
    },
    [setDisabled]
  )

  return (
    <TitledDialog
      title={`Restrict ${name}`}
      disabled={disabled}
      onDone={onPress}
      label={
        {
          resting: 'Confirm restriction',
          restricting: 'Restricting...',
          confirmed: 'Complete',
          error: 'Error',
        }[mode]
      }
    >
      <Container>
        <Copy>If you restrict this account:</Copy>
        <Copy>
          <ul>
            <li>
              Your channels, blocks and profile will become unreadable by the
              restricted account.
            </li>
            <li>
              Your channels, blocks and profile will not show up in search
              results for the restricted account.
            </li>
            <li>
              The restricted account will not be able to connect your blocks or
              channels.
            </li>
            <li>
              The restricted account will not be able to add you as a
              collaborator on a channel or as a member of a group.
            </li>
            <li>
              The restricted account will be removed as a member from any groups
              or channels that you own that they are a part of.
            </li>
            <li>
              If the restricted account is following your account, that follow
              will be removed.
            </li>
          </ul>
        </Copy>
        <Copy>This action cannot be undone.</Copy>
        <Copy>
          To proceed with the restriction, please type <strong>{id}</strong> in
          the box below.
        </Copy>
        <TextInput onChange={onChange} mb={5} />
      </Container>
    </TitledDialog>
  )
}

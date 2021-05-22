import React from 'react'
import {
  MutationFunction as MutationFn,
  useMutation,
  useQuery,
} from '@apollo/client'
import { Form, Field } from 'react-final-form'
import { ApolloError, PureQueryOptions } from '@apollo/client'
import { unescape } from 'underscore'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Alert from 'v2/components/UI/Alert'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import Accordion from 'v2/components/UI/Accordion'
import Text from 'v2/components/UI/Text'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import TitledDialog from 'v2/components/UI/TitledDialog'
import RadioOptions from 'v2/components/UI/RadioOptions'
import { LabelledInput, Label, Input, Textarea } from 'v2/components/UI/Inputs'

import ExportChannel from 'v2/components/ManageChannel/components/ExportChannel'
import DeleteChannel from 'v2/components/ManageChannel/components/DeleteChannel'
import TransferChannel from 'v2/components/ManageChannel/components/TransferChannel'
import AssignAuthor from 'v2/components/ManageChannel/components/AssignAuthor'
import ChannelVisibilityPulldown from 'v2/components/ChannelVisibilityPulldown'
import {
  ManageChannelQuery,
  ManageChannelQueryVariables,
  ManageChannelQuery_channel as Channel,
  ManageChannelQuery_me,
} from '__generated__/ManageChannelQuery'
import {
  updateChannelMutation,
  updateChannelMutationVariables,
} from '__generated__/updateChannelMutation'
import UPDATE_CHANNEL_QUERY from 'v2/components/ManageChannel/mutations/updateChannel'
import MANAGE_CHANNEL_QUERY from 'v2/components/ManageChannel/queries/manageChannel'

import mapErrors from 'v2/util/mapErrors'
import { FORM_ERROR } from 'final-form'

const Container = styled.div`
  width: 100%;
  margin: 0 auto 2em auto;
`

const TextInput = styled(Input).attrs({
  flex: 1,
  f: 7,
})``

interface ManageChannelProps {
  channel: Channel
  me: ManageChannelQuery_me
  updateChannel: MutationFn<
    updateChannelMutation,
    updateChannelMutationVariables
  >
  loading: boolean
  error: ApolloError
  refetchQueries?: PureQueryOptions[]
  onUpdate?: (href?: string) => void
  onDelete?: () => void
}

const ManageChannel: React.FC<ManageChannelProps> = ({
  channel,
  me,
  loading,
  error,
  updateChannel,
  refetchQueries,
  onUpdate = () => {
    window.location.reload()
  },
  onDelete = () => {
    window.location.href = '/'
  },
}) => {
  if (loading) return <LoadingIndicator />
  if (error) return <ErrorAlert>{error.message}</ErrorAlert>

  const showAuthor = me.counts.groups > 0 && me.id === channel.user.id
  const owner = `${channel.owner.__typename.toUpperCase()}:${channel.owner.id}`

  const handleSubmit = values => {
    let owner

    if (values.owner) {
      const [type, id] = values.owner.split(':')
      owner = { type, id }
    }

    const variables = {
      ...values,
      id: channel.id,
      owner,
    }

    return updateChannel({
      variables,
      refetchQueries,
    })
      .then(
        ({
          data: {
            update_channel: {
              channel: { href },
            },
          },
        }) => {
          onUpdate(href)
          return true
        }
      )
      .catch(err => {
        const mappedErrors = mapErrors(err)
        const errors = {
          [FORM_ERROR]: mappedErrors.errorMessage,
          ...mappedErrors.attributeErrors,
        }
        return errors
      })
  }

  return (
    <Form
      onSubmit={handleSubmit}
      render={({
        handleSubmit,
        submitFailed,
        submitSucceeded,
        submitting,
        submitError,
        values,
      }) => {
        const color =
          (values && values.visibility && values.visibility.toLowerCase()) ||
          channel.visibility.toUpperCase()
        return (
          <TitledDialog
            title="Edit channel"
            label={submitting ? 'Saving' : 'Save changes'}
            onDone={handleSubmit}
          >
            {submitFailed && submitError && (
              <ErrorAlert isReloadable={false}>{submitError}</ErrorAlert>
            )}
            {submitSucceeded && (
              <Alert bg="state.premium" color="background" mb={6}>
                Channel Saved.
              </Alert>
            )}
            <Container>
              <Field name="title" initialValue={unescape(channel.title)}>
                {props => {
                  return (
                    <LabelledInput mt={6} mb={5}>
                      <Label>Title</Label>

                      <TextInput
                        {...props.input}
                        placeholder="Type channel name"
                        borderless
                        autoFocus
                        required
                        color={`channel.${color}`}
                        errorMessage={
                          props.meta.error || props.meta.submitError
                        }
                      />
                    </LabelledInput>
                  )
                }}
              </Field>

              {showAuthor && (
                <Field name="owner" initialValue={owner}>
                  {({ input, ...rest }) => {
                    const handleAuthor = newOwner => {
                      const [type, id] = newOwner.split(':')
                      const { owner } = channel

                      const newOwerIsCurrentOwner =
                        type.toLowerCase() === owner.__typename.toLowerCase() &&
                        id === owner.id

                      if (newOwerIsCurrentOwner) return

                      input.onChange(newOwner)
                    }
                    return (
                      <LabelledInput my={6} alignItems="start">
                        <Label>Author</Label>
                        <AssignAuthor
                          {...rest}
                          onChange={handleAuthor}
                          selected={input.value}
                        />
                      </LabelledInput>
                    )
                  }}
                </Field>
              )}

              <Field name="description" initialValue={channel.description}>
                {props => {
                  return (
                    <LabelledInput my={6}>
                      <Label>Description</Label>

                      <Textarea
                        {...props.input}
                        placeholder="Describe your channel here"
                        rows={4}
                        errorMessage={
                          props.meta.error || props.meta.submitError
                        }
                      />
                    </LabelledInput>
                  )
                }}
              </Field>

              <Field
                name="visibility"
                initialValue={channel.visibility.toUpperCase()}
              >
                {props => {
                  return (
                    <LabelledInput my={6}>
                      <Label>Privacy</Label>

                      <div>
                        <ChannelVisibilityPulldown
                          {...props.input}
                          type={channel.owner.__typename.toUpperCase()}
                        />
                      </div>
                    </LabelledInput>
                  )
                }}
              </Field>

              <Accordion label="NSFW?" mode="closed">
                <Field
                  name="content_flag"
                  initialValue={channel.content_flag.toUpperCase()}
                >
                  {props => {
                    return (
                      <Box m={7}>
                        <Text f={2} mb={7}>
                          Not Safe For Work (NSFW) channels are hidden from
                          Explore and are only visible on your profile to people
                          who have the &quot;Show NSFW Content&quot; setting
                          turned on.
                        </Text>
                        <RadioOptions
                          value={props.input.value}
                          onSelect={props.input.onChange}
                          size="1em"
                        >
                          <RadioOptions.Option value="SAFE">
                            {({ selected }) => (
                              <Text f={3} mb={3} selected={selected}>
                                <strong>Safe for work</strong>
                              </Text>
                            )}
                          </RadioOptions.Option>

                          <RadioOptions.Option value="NSFW">
                            {({ selected }) => (
                              <Text f={3} mb={3} selected={selected}>
                                <strong>Not safe for work</strong>
                              </Text>
                            )}
                          </RadioOptions.Option>
                        </RadioOptions>
                      </Box>
                    )
                  }}
                </Field>
              </Accordion>

              {channel.can.export && (
                <Accordion label="Export" mode="closed">
                  <Box m={7}>
                    <ExportChannel id={channel.id} />
                  </Box>
                </Accordion>
              )}

              {channel.can.transfer && (
                <Accordion label="Transfer ownership" mode="closed">
                  <Box m={7}>
                    <TransferChannel channel={channel} />
                  </Box>
                </Accordion>
              )}

              {channel.can.destroy && (
                <Accordion label="Delete channel" mode="closed">
                  <Box m={7}>
                    <DeleteChannel
                      id={channel.id}
                      onDelete={onDelete}
                      refetchQueries={refetchQueries}
                    />
                  </Box>
                </Accordion>
              )}
            </Container>
          </TitledDialog>
        )
      }}
    />
  )
}

interface ManageChannelContainerProps {
  id: string | number
  refetchQueries?: PureQueryOptions[]
  onUpdate?: () => void
  onDelete?: () => void
}

const ManageChannelContainer: React.FC<ManageChannelContainerProps> = ({
  id,
  refetchQueries,
  onDelete,
  onUpdate,
}) => {
  const { data, loading, error } = useQuery<
    ManageChannelQuery,
    ManageChannelQueryVariables
  >(MANAGE_CHANNEL_QUERY, { variables: { id: id.toString() } })

  const [updateChannel] = useMutation<
    updateChannelMutation,
    updateChannelMutationVariables
  >(UPDATE_CHANNEL_QUERY)

  return (
    <ManageChannel
      error={error}
      loading={loading}
      channel={data && data.channel}
      me={data && data.me}
      updateChannel={updateChannel}
      refetchQueries={refetchQueries}
      onDelete={onDelete}
      onUpdate={onUpdate}
    />
  )
}

export default ManageChannelContainer

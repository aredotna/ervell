import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import { propType } from 'graphql-anywhere'
import { some, unescape } from 'underscore'
import styled from 'styled-components'

import mapErrors from 'v2/util/mapErrors'
import compactObject from 'v2/util/compactObject'

import manageChannelFragment from 'v2/components/ManageChannel/fragments/manageChannel'
import groupsCountFragment from 'v2/components/ManageChannel/fragments/groupsCount'
import manageChannelQuery from 'v2/components/ManageChannel/queries/manageChannel'
import updateChannelMutation from 'v2/components/ManageChannel/mutations/updateChannel'

import Box from 'v2/components/UI/Box'
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

const Container = styled.div`
  width: 100%;
  margin: 0 auto 2em auto;
`

class ManageChannel extends Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      channel: propType(manageChannelFragment),
      me: propType(groupsCountFragment),
    }).isRequired,
    updateChannel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    title: null,
    description: null,
    visibility: null,
    owner: null,
    authorType: 'USER',
    attributeErrors: {},
    content_flag: null,
    errorMessage: '',
  }

  handleInput = fieldName => ({ target: { value: fieldValue } }) => {
    const {
      data: { channel: originalChannel },
    } = this.props

    const isEdited = some(
      originalChannel,
      (originalValue, key) => fieldName === key && originalValue !== fieldValue
    )

    this.setState({
      mode: isEdited ? 'submit' : 'resting',
      [fieldName]: fieldValue,
    })
  }

  handleTitle = this.handleInput('title')
  handleDescription = this.handleInput('description')
  handleVisibility = visibility =>
    this.handleInput('visibility')({ target: { value: visibility } })

  handleNSFW = flag =>
    this.handleInput('content_flag')({ target: { value: flag } })

  handleAuthor = newOwner => {
    const [type, id] = newOwner.split(':')
    const {
      data: {
        channel: { owner },
      },
    } = this.props
    const newOwerIsCurrentOwner =
      type.toLowerCase() === owner.__typename.toLowerCase() && id === owner.id

    if (newOwerIsCurrentOwner) return

    this.setState({
      authorType: type,
      mode: 'submit',
      owner: {
        type,
        id: parseInt(id, 10),
      },
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    const {
      onClose,
      updateChannel,
      data: {
        channel: { id },
      },
    } = this.props

    const {
      mode,
      title,
      description,
      visibility,
      content_flag,
      owner,
    } = this.state

    if (mode === 'resting') return onClose()

    this.setState({ mode: 'submitting' })

    const variables = compactObject({
      id,
      title,
      description,
      visibility,
      content_flag,
      owner,
    })

    return updateChannel({ variables })
      .then(({ data: { update_channel: { channel: { href } } } }) => {
        onClose()
        // Slug may have changed so redirect
        window.location = href
      })
      .catch(err => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        })
      })
  }

  render() {
    const {
      data: { loading },
    } = this.props
    const { mode, attributeErrors, errorMessage, authorType } = this.state

    if (loading) return <LoadingIndicator />

    const {
      data: {
        channel,
        me,
        me: { counts },
      },
    } = this.props
    const owner = `${channel.owner.__typename.toUpperCase()}:${
      channel.owner.id
    }`

    // Only the original author can change the owner;
    const showAuthor = counts.groups > 0 && me.id === channel.user.id

    return (
      <TitledDialog
        title="Edit channel"
        label={
          {
            resting: 'Done',
            submit: 'Save',
            submitting: 'Saving...',
            deleting: 'Deleting...',
            error: 'Error',
          }[mode]
        }
        onDone={this.handleSubmit}
      >
        <Container>
          {mode === 'error' && (
            <ErrorAlert isReloadable={false}>{errorMessage}</ErrorAlert>
          )}

          <LabelledInput mt={6} mb={7}>
            <Label>Name</Label>
            <Input
              f={7}
              color={`channel.${channel.visibility.toLowerCase()}`}
              placeholder="Type channel name"
              borderless
              autoFocus
              required
              defaultValue={unescape(channel.title)}
              onChange={this.handleTitle}
            />
          </LabelledInput>

          {showAuthor && (
            <LabelledInput my={6} alignItems="start">
              <Label>Author</Label>

              <AssignAuthor onChange={this.handleAuthor} selected={owner} />
            </LabelledInput>
          )}

          <LabelledInput my={6}>
            <Label>Description</Label>

            <Textarea
              name="description"
              defaultValue={channel.description}
              onChange={this.handleDescription}
              placeholder="describe your channel here"
              rows={4}
              errorMessage={attributeErrors.description}
            />
          </LabelledInput>

          <LabelledInput mt={6} mb={8}>
            <Label>Privacy</Label>

            <div>
              <ChannelVisibilityPulldown
                value={channel.visibility.toUpperCase()}
                onChange={this.handleVisibility}
                type={authorType}
              />
            </div>
          </LabelledInput>

          <Accordion label="NSFW?" mode="closed">
            <Box m={7}>
              <Text f={2} mb={7}>
                Not Safe For Work (NSFW) channels are hidden from Explore and
                are only visible on your profile to people who have the
                &quot;Show NSFW Content&quot; setting turned on.
              </Text>
              <RadioOptions
                value={channel.content_flag.toUpperCase()}
                onSelect={this.handleNSFW}
                size="1em"
              >
                <RadioOptions.Option value="SAFE">
                  {() => (
                    <Text f={3} mb={3}>
                      <strong>No</strong>
                    </Text>
                  )}
                </RadioOptions.Option>

                <RadioOptions.Option value="NSFW">
                  {() => (
                    <Text f={3} mb={3}>
                      <strong>Yes</strong>
                    </Text>
                  )}
                </RadioOptions.Option>
              </RadioOptions>
            </Box>
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
                <DeleteChannel id={channel.id} />
              </Box>
            </Accordion>
          )}
        </Container>
      </TitledDialog>
    )
  }
}

export default compose(
  graphql(manageChannelQuery),
  graphql(updateChannelMutation, { name: 'updateChannel' })
)(ManageChannel)

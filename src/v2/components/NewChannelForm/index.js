import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'
import { Query } from '@apollo/client/react/components'

import styled from 'styled-components'

import mapErrors from 'v2/util/mapErrors'

import createChannelMutation from 'v2/components/NewChannelForm/mutations/createChannel'
import newChannelQuery from 'v2/components/NewChannelForm/queries/newChannelQuery'

import Text from 'v2/components/UI/Text'
import TitledDialog from 'v2/components/UI/TitledDialog'
import {
  Input,
  Textarea,
  Label,
  LabelledCheckbox,
  LabelledInput,
} from 'v2/components/UI/Inputs'
import ChannelVisibilityPulldown from 'v2/components/ChannelVisibilityPulldown'
import NewChannelGroups from 'v2/components/NewChannelForm/components/NewChannelGroups'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'

import RandomChannelIcon from 'v2/components/NewChannelForm/components/RandomChannelIcon'

const NewChannelField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

class NewChannelForm extends Component {
  static propTypes = {
    createChannel: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    authorType: PropTypes.oneOf(['USER', 'GROUP']),
    visibility: PropTypes.oneOf(['CLOSED', 'OPEN', 'PRIVATE']),
    group_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    authorType: 'USER',
    group_id: null,
    visibility: 'CLOSED',
  }

  state = {
    mode: 'resting',
    title: '',
    description: '',
    visibility: this.props.visibility,
    group_id: this.props.group_id,
    authorType: this.props.authorType,
    visit_channel: true,
    errorMessage: null,
    attributeErrors: {},
  }

  setTitle = title => this.setState({ title })

  handleInput = fieldName => ({ target: { value: fieldValue } }) =>
    this.setState(prevState => ({
      [fieldName]: fieldValue,
      attributeErrors: {
        ...prevState.attributeErrors,
        [fieldName]: null, // Clear specific error once typing begins
      },
    }))

  handleCheckbox = fieldName => ({ target: { checked } }) =>
    this.setState({ [fieldName]: checked })
  type = 'checkbox'

  handleVisitChannel = this.handleCheckbox('visit_channel')
  handleTitle = this.handleInput('title')
  handleDescription = this.handleInput('description')

  handleVisibility = visibility => this.setState({ visibility })

  handleAuthor = group_id => {
    if (group_id === '0') {
      this.setState({ authorType: 'USER', group_id: null })
      return
    }
    this.setState({ group_id, authorType: 'GROUP' })
  }

  handleSubmit = e => {
    e.preventDefault()

    const { createChannel, onClose } = this.props
    const {
      title,
      description,
      visibility,
      group_id,
      visit_channel,
    } = this.state

    const variables = {
      title,
      description,
      visibility,
      group_id,
    }

    this.setState({ mode: 'creating' })

    return createChannel({ variables })
      .then(
        ({
          data: {
            create_channel: { channel },
          },
        }) => {
          if (visit_channel) {
            window.location.href = channel.href
            this.setState({ mode: 'redirecting' })
            return
          }

          this.setState({ mode: 'success' })
          setTimeout(() => onClose(), 500)
        }
      )
      .catch(err => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        })
      })
  }

  render() {
    const {
      mode,
      title,
      description,
      visibility,
      visit_channel,
      errorMessage,
      attributeErrors,
      authorType,
      group_id,
    } = this.state

    // If the state of the form is not resting or error,
    // disable the button.
    const isDisabled = !(mode === 'resting' || mode === 'error')

    return (
      <Query query={newChannelQuery}>
        {({ data, error, loading }) => {
          if (loading) {
            return (
              <TitledDialog
                title="New channel"
                label={
                  {
                    resting: 'Create channel',
                  }[mode]
                }
                onDone={this.handleSubmit}
              >
                <LoadingIndicator p={6} />
              </TitledDialog>
            )
          }

          if (error) {
            return (
              <TitledDialog
                title="New channel"
                label={
                  {
                    resting: 'Create channel',
                  }[mode]
                }
                onDone={this.handleSubmit}
              >
                <Text color="state.alert" f={2} p={6}>
                  {error.message}
                </Text>
              </TitledDialog>
            )
          }

          const {
            me: { groups },
          } = data

          return (
            <TitledDialog
              title="New channel"
              label={
                {
                  resting: 'Create channel',
                  creating: 'Creating...',
                  redirecting: 'Redirecting...',
                  success: 'Created',
                  error: 'Error',
                }[mode]
              }
              onDone={this.handleSubmit}
              disabled={isDisabled}
            >
              <div>
                <LabelledInput mt={6} mb={7}>
                  <Label>Name</Label>

                  <NewChannelField>
                    <Input
                      f={7}
                      color={`channel.${visibility.toLowerCase()}`}
                      placeholder="Type channel name"
                      borderless
                      autoFocus
                      outlineless
                      required
                      value={title}
                      onChange={this.handleTitle}
                      errorMessage={attributeErrors.title}
                      flex={1}
                    />
                    <RandomChannelIcon onQuery={this.setTitle} />
                  </NewChannelField>
                </LabelledInput>

                {groups.length > 0 && (
                  <LabelledInput my={6} alignItems="start">
                    <Label>Author</Label>

                    <NewChannelGroups
                      onChange={this.handleAuthor}
                      value={group_id || 0}
                    />
                  </LabelledInput>
                )}

                <LabelledInput my={6} alignItems="start">
                  <Label>Description</Label>

                  <Textarea
                    placeholder="Describe your channel here"
                    rows={4}
                    value={description}
                    onChange={this.handleDescription}
                    errorMessage={attributeErrors.description}
                  />
                </LabelledInput>

                <LabelledInput my={6} alignItems="start">
                  <Label>Privacy</Label>

                  <div>
                    <ChannelVisibilityPulldown
                      value={visibility.toUpperCase()}
                      onChange={this.handleVisibility}
                      type={authorType}
                    />
                  </div>
                </LabelledInput>

                <LabelledInput mt={6} mb={8}>
                  <Label />
                  <LabelledCheckbox
                    onChange={this.handleVisitChannel}
                    checked={visit_channel}
                  >
                    Visit channel
                  </LabelledCheckbox>
                </LabelledInput>

                {mode === 'error' && (
                  <Text mb={6} f={2} color="state.alert" textAlign="center">
                    {errorMessage}
                  </Text>
                )}
              </div>
            </TitledDialog>
          )
        }}
      </Query>
    )
  }
}

export default graphql(createChannelMutation, {
  name: 'createChannel',
})(NewChannelForm)

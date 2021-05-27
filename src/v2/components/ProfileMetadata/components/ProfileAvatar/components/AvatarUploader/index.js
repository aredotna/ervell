import React, { PureComponent } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { graphql, withApollo } from '@apollo/client/react/hoc'
import axios from 'axios'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { uploadPolicyQuery, uploadPolicyFragment } from 'v2/util/uploader'

import updateGroupAvatarMutation from 'v2/components/ProfileMetadata/components/ProfileAvatar/mutations/updateGroupAvatar'

import Box from 'v2/components/UI/Box'
import GenericButton from 'v2/components/UI/GenericButton'
import Avatar from 'v2/components/ProfileMetadata/components/ProfileAvatar/components/Avatar'
import { FilledButton } from 'v2/components/UI/Buttons'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'

const Replace = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  ${props =>
    props.mode === 'resting' &&
    `
    > * {
      display: none;
    }

    &:hover > * {
      display: block;
    }
  `}
`

class AvatarUploader extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
    identifiable: propType(uploadPolicyFragment).isRequired,
    updateGroupAvatar: PropTypes.func.isRequired,
    startPolling: PropTypes.func.isRequired,
    stopPolling: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    progress: 0,
  }

  componentWillReceiveProps({ identifiable: { avatar: nextAvatar } }) {
    const {
      identifiable: { avatar: currentAvatar },
      stopPolling,
    } = this.props

    if (nextAvatar !== currentAvatar) {
      stopPolling()
      this.setState({ mode: 'resting' })
    }
  }

  onAddFile = async e => {
    e.persist()

    const {
      client,
      identifiable: { id },
      updateGroupAvatar,
      startPolling,
    } = this.props

    if (e.target.files.length === 0) {
      this.setState({ mode: 'resting' })
      return
    }

    this.setState({ mode: 'checking' })

    const {
      data: {
        me: { policy },
      },
    } = await client.query({ query: uploadPolicyQuery })

    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('Content-Type', file.type)
    formData.append('key', policy.key)
    formData.append('AWSAccessKeyId', policy.AWSAccessKeyId)
    formData.append('acl', policy.acl)
    formData.append('success_action_status', policy.success_action_status)
    formData.append('policy', policy.policy)
    formData.append('signature', policy.signature)
    formData.append('file', file)

    this.setState({ mode: 'uploading' })

    axios
      .post(policy.bucket, formData, {
        responseType: 'text',
        onUploadProgress: progressEvent => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          this.setState({ progress })
        },
      })
      .then(({ data }) => {
        const parser = new DOMParser()
        const parsed = parser.parseFromString(data, 'text/xml')
        return parsed.getElementsByTagName('Location')[0].childNodes[0]
          .nodeValue
      })
      .then(temporaryUrl =>
        updateGroupAvatar({
          variables: { id, avatar_url: temporaryUrl },
        })
      )
      .then(() => {
        this.setState({ mode: 'done' })
        startPolling(500)
      })
      .catch(error => {
        console.error(error)
        this.setState({ mode: 'error' })
      })
  }

  triggerAddFile = e => {
    e.preventDefault()
    this.file.click()
  }

  render() {
    const { mode, progress } = this.state
    const {
      identifiable,
      identifiable: { avatar },
    } = this.props

    return (
      <ErrorBoundary>
        <input
          type="file"
          accept=".jpg,.jpeg,.gif,.png"
          ref={ref => {
            this.file = ref
          }}
          style={{ display: 'none' }}
          onChange={this.onAddFile}
        />

        {!avatar && (
          <GenericButton f={1} onClick={this.triggerAddFile}>
            {
              {
                resting: 'Upload group logo',
                checking: '...',
                uploading: `Uploading ${progress}%`,
                done: 'Processing...',
                error: 'Error',
              }[mode]
            }
          </GenericButton>
        )}

        {avatar && (
          <Avatar avatar={identifiable.avatar}>
            <Replace mode={mode}>
              <FilledButton f={0} bg="white" onClick={this.triggerAddFile}>
                {
                  {
                    resting: 'Replace group logo',
                    checking: '...',
                    uploading: `Uploading ${progress}%`,
                    done: 'Processing...',
                    error: 'Error',
                  }[mode]
                }
              </FilledButton>
            </Replace>
          </Avatar>
        )}
      </ErrorBoundary>
    )
  }
}

export default graphql(updateGroupAvatarMutation, {
  name: 'updateGroupAvatar',
})(withApollo(AvatarUploader))

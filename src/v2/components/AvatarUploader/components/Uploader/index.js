import React, { PureComponent } from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import { graphql, withApollo } from '@apollo/client/react/hoc'
import compose from 'lodash.flowright'
import axios from 'axios'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { uploadPolicyQuery } from 'v2/util/uploader'
import avatarQuery from 'v2/components/AvatarUploader/queries/avatar'

import updateAvatar from 'v2/components/AvatarUploader/mutations/updateAvatar'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'

const Container = styled(Box)`
  position: relative;
`

const Link = styled(Text).attrs({
  f: 4,
  align: 'center',
})`
  cursor: pointer;
`

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid ${x => x.theme.colors.gray.regular};
  margin-bottom: 19px; // matching existing avatar uploader
  width: 140px; // matching existing avatar uploader
  height: 140px; // matching existing avatar uploader

  img {
    max-width: 100%;
  }
`

class AvatarUploader extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
    updateAvatar: PropTypes.func.isRequired,
    startPolling: PropTypes.func.isRequired,
    stopPolling: PropTypes.func.isRequired,
    me: propType(avatarQuery).isRequired,
  }

  state = {
    mode: 'resting',
    progress: 0,
  }

  componentWillReceiveProps({ me: { avatar: nextAvatar } }) {
    const {
      me: { avatar: currentAvatar },
      stopPolling,
    } = this.props

    if (nextAvatar !== currentAvatar) {
      stopPolling()
      axios.get('/me/refresh')
      this.setState({ mode: 'resting' })
    }
  }

  onAddFile = async e => {
    e.persist()

    const { client, updateAvatar, startPolling } = this.props

    if (e.target.files.length === 0) {
      this.setState({ mode: 'resting' })
      return
    }

    this.setState({ mode: 'checking' })

    const {
      data: {
        me: { id, policy },
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
        updateAvatar({
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

    const { avatar } = this.props.me

    return (
      <ErrorBoundary>
        <Container>
          <input
            type="file"
            accept=".jpg,.jpeg,.gif,.png"
            ref={ref => {
              this.file = ref
            }}
            style={{ display: 'none' }}
            onChange={this.onAddFile}
          />
          <BadgeContainer>
            {avatar && <img src={avatar} alt="custom badge" />}
          </BadgeContainer>
          <Link onClick={this.triggerAddFile}>
            <strong>
              {
                {
                  resting: 'Upload new avatar',
                  checking: '...',
                  uploading: `Uploading ${progress}%`,
                  done: 'Processing...',
                  error: 'Error',
                }[mode]
              }
            </strong>
          </Link>
        </Container>
      </ErrorBoundary>
    )
  }
}

export default compose(graphql(updateAvatar, { name: 'updateAvatar' }))(
  withApollo(AvatarUploader)
)

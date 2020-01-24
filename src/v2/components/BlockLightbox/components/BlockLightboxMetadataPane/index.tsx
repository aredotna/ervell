import React, { PureComponent } from 'react'

import { BlockLightbox as Block } from '__generated__/BlockLightbox'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Modal from 'v2/components/UI/Modal/Portal'
import Icons from 'v2/components/UI/Icons'
import GenericButton from 'v2/components/UI/GenericButton'
import ManageBlock from 'v2/components/ManageBlock'
import Header from 'v2/components/BlockLightbox/components/BlockLightboxMetadataPane/components/Header'
import BlockLightboxActions from 'v2/components/BlockLightbox/components/BlockLightboxActions'
import BlockLightboxMetadataFold from 'v2/components/BlockLightbox/components/BlockLightboxMetadataFold'
import BlockLightboxModalDialog from 'v2/components/BlockLightbox/components/BlockLightboxModalDialog'

import { SpaceProps } from 'styled-system'

interface BlockLightboxMetadataPaneProps extends SpaceProps {
  block: Block
}

export default class BlockLightboxMetadataPane extends PureComponent<
  BlockLightboxMetadataPaneProps
> {
  state = {
    mode: 'resting',
    autoFocus: null,
  }

  openManage = e => {
    e.preventDefault()
    this.setState({ mode: 'manage' })
  }

  openManageFor = autoFocus => e => {
    e.preventDefault()
    if (
      window.getSelection().toString() ||
      window.getSelection().toString() !== ''
    ) {
      return false
    }
    this.setState({ mode: 'manage', autoFocus })
  }

  closeModal = e => {
    if (e) e.preventDefault()
    this.setState({ mode: 'resting', autoFocus: null })
  }

  get canManage() {
    // FIXME: Property 'can' does not exist on type 'BlockLightbox_Channel'.
    // @ts-ignore
    return this.props.block.can.manage
  }

  render() {
    const { mode, autoFocus } = this.state
    const { block, ...rest } = this.props

    return (
      <Box
        flex={1}
        px={7}
        pt={4}
        pb={8}
        height="100%"
        bg="white"
        overflowScrolling
        {...rest}
      >
        <Text
          mb={5}
          f={5}
          fontWeight="bold"
          hyphenate
          verticalAlign="middle"
          onClick={this.canManage ? this.openManageFor('title') : undefined}
        >
          {this.canManage && !block.title && (
            <Text color="gray.medium">Add a title</Text>
          )}

          {!this.canManage && !block.title ? (
            <Text color="gray.medium">—</Text>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: block.title }} />
          )}
        </Text>

        <Text f={1} lineHeight={2} color="gray.medium">
          <time
            dateTime={block.created_at_timestamp}
            title={block.created_at_timestamp}
          >
            Added {block.created_at} by{' '}
          </time>

          <a href={block.user.href}>
            <strong>{block.user.name}</strong>
          </a>

          {block.created_at !== block.updated_at && (
            <React.Fragment>
              <br />

              <time
                dateTime={block.updated_at_timestamp}
                title={block.updated_at_timestamp}
              >
                Last updated {block.updated_at}
              </time>
            </React.Fragment>
          )}
        </Text>

        <Header mt={8}>Info</Header>

        {block.description && (
          <Text
            f={3}
            lineHeight={2}
            dangerouslySetInnerHTML={{ __html: block.description }}
            breakWord
            boldLinks
            hoverLinks={{ color: 'black' }}
            onClick={event => {
              // If clicking an A tag in the description don't open edit box and
              // instead defer to outbound link.
              if (event.target.nodeName === 'A') {
                return
              }
              if (this.canManage) {
                return this.openManageFor('description')(event)
              }
            }}
          />
        )}

        {this.canManage && !block.description && (
          <Text
            f={3}
            lineHeight={2}
            color="gray.medium"
            onClick={
              this.canManage ? this.openManageFor('description') : undefined
            }
          >
            Add a description
          </Text>
        )}

        <Text my={6} f={1} fontWeight="bold" lineHeight={2}>
          <BlockLightboxActions block={block} />
        </Text>

        {this.canManage && (
          <GenericButton
            mt={7}
            onClick={this.openManage}
            title="Edit"
            display="flex"
            f={2}
          >
            <Icons name="Pencil" size="1rem" color="gray.base" mr={4} />
            Edit block
          </GenericButton>
        )}

        {mode === 'manage' && (
          <Modal onClose={this.closeModal} Dialog={BlockLightboxModalDialog}>
            <ManageBlock
              block={block}
              onDone={this.closeModal}
              autoFocus={autoFocus || undefined}
            />
          </Modal>
        )}

        <BlockLightboxMetadataFold
          key={`BlockLightboxMetadataFold_${block.id}`}
          block={block}
        />
      </Box>
    )
  }
}

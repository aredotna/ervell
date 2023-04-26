/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { PureComponent } from 'react'
import { SpaceProps } from 'styled-system'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Modal from 'v2/components/UI/Modal/Portal'
import Icons from 'v2/components/UI/Icons'
import GenericButton from 'v2/components/UI/GenericButton'
import { ManageBlock } from 'v2/components/ManageBlock'

import Header from 'v2/components/FullBlock/components/FullBlockMetadataPane/components/Header'
import FullBlockActions from 'v2/components/FullBlock/components/FullBlockActions'
import FullBlockMetadataFold from 'v2/components/FullBlock/components/FullBlockMetadataFold'
import FullBlockModalDialog from 'v2/components/FullBlock/components/FullBlockModalDialog'
import { MetadataContainer } from 'v2/components/FullBlockLayout'

import { truncate } from 'v2/components/UI/Truncate'

import { FullBlock as Block } from '__generated__/FullBlock'
import { LinkViewMode, OnLinkViewModeChange } from 'v2/components/FullBlock'
import { SansSerifText } from 'v2/components/UI/SansSerifText'
import { FlagContent } from 'v2/components/FlagContent'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'
import { unescape } from 'lodash'

const Flag = styled(FlagContent)`
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.gray.bold};
  }
`

interface FullBlockMetadataPaneProps extends SpaceProps {
  block: Block
  linkViewMode: LinkViewMode
  onLinkViewModeChange: OnLinkViewModeChange
}

export default class FullBlockMetadataPane extends PureComponent<
  FullBlockMetadataPaneProps
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
    // FIXME: Property 'can' does not exist on type 'FullBlock_Channel'.
    // @ts-ignore
    return this.props.block.can?.manage
  }

  render() {
    const { mode, autoFocus } = this.state
    const { block, linkViewMode, onLinkViewModeChange, ...rest } = this.props

    return (
      <MetadataContainer {...rest} pt={10}>
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
            <span>{unescape(block.title)}</span>
          )}
        </Text>

        {block.description && (
          <SansSerifText
            isSmall
            color={'gray.bold'}
            dangerouslySetInnerHTML={{ __html: block.description }}
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

        <Header mt={4} mb={5}></Header>

        <Box mb={8}>
          <Text
            f={1}
            lineHeight={2}
            color="gray.medium"
            hoverLinks={{ color: 'gray.bold' }}
          >
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

            {block.source && block.source.url && (
              <>
                <br />
                <a
                  href={block.source.url}
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                >
                  {block.source.title
                    ? `Source: ${unescape(truncate(block.source.title, 40))}`
                    : 'Source'}
                </a>
              </>
            )}
          </Text>
        </Box>

        <Header
          mt={4}
          mb={4}
          action={
            !this.canManage && (
              <Flag id={block.id} type={BaseConnectableTypeEnum.BLOCK} />
            )
          }
        >
          Actions
        </Header>

        <Text my={6} f={1} fontWeight="bold" lineHeight={2}>
          <FullBlockActions
            block={block}
            linkViewMode={linkViewMode}
            onLinkViewModeChange={onLinkViewModeChange}
          />
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
          <Modal onClose={this.closeModal} Dialog={FullBlockModalDialog}>
            <ManageBlock
              block={block}
              onDone={this.closeModal}
              autoFocus={autoFocus || undefined}
            />
          </Modal>
        )}

        <FullBlockMetadataFold
          key={`FullBlockMetadataFold_${block.id}`}
          block={block}
        />
      </MetadataContainer>
    )
  }
}

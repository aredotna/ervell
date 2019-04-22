import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import blockLightboxMetadataPaneFragment from 'react/components/BlockLightbox/components/BlockLightboxMetadataPane/fragments/blockLightboxMetadataPane';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Modal from 'react/components/UI/Modal/Portal';
import Icons from 'react/components/UI/Icons';
import GenericButton from 'react/components/UI/GenericButton';
import ManageBlock from 'react/components/ManageBlock';
import Header from 'react/components/BlockLightbox/components/BlockLightboxMetadataPane/components/Header';
import BlockLightboxActions from 'react/components/BlockLightbox/components/BlockLightboxActions';
import BlockLightboxMetadataFold from 'react/components/BlockLightbox/components/BlockLightboxMetadataFold';
import BlockLightboxModalDialog from 'react/components/BlockLightbox/components/BlockLightboxModalDialog';

export default class BlockLightboxMetadataPane extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxMetadataPaneFragment).isRequired,
  }

  state = {
    mode: 'resting',
    autoFocus: null,
  }

  openManage = (e) => {
    e.preventDefault();
    this.setState({ mode: 'manage' });
  }

  openManageFor = autoFocus => (e) => {
    e.preventDefault();
    this.setState({ mode: 'manage', autoFocus });
  }

  closeModal = (e) => {
    if (e) e.preventDefault();
    this.setState({ mode: 'resting', autoFocus: null });
  }

  render() {
    const { mode, autoFocus } = this.state;
    const { block, ...rest } = this.props;

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
          onClick={block.can.manage ? this.openManageFor('title') : undefined}
        >
          {block.can.manage && !block.title &&
            <Text color="gray.medium">Add a title</Text>
          }

          {!block.can.manage && !block.title
            ? <Text color="gray.medium">—</Text>
            : <span dangerouslySetInnerHTML={{ __html: block.title }} />
          }
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

          {block.created_at !== block.updated_at &&
            <React.Fragment>
              <br />

              <time
                dateTime={block.updated_at_timestamp}
                title={block.updated_at_timestamp}
              >
                Last updated {block.updated_at}
              </time>
            </React.Fragment>
          }
        </Text>

        <Header mt={8}>
          Info
        </Header>

        {block.description &&
          <Text
            f={3}
            lineHeight={2}
            dangerouslySetInnerHTML={{ __html: block.description }}
            breakWord
            boldLinks
            hoverLinks={{ color: 'black' }}
            onClick={block.can.manage ? this.openManageFor('description') : undefined}
          />
        }

        {block.can.manage && !block.description &&
          <Text
            f={3}
            lineHeight={2}
            color="gray.medium"
            onClick={block.can.manage ? this.openManageFor('description') : undefined}
          >
            Add a description
          </Text>
        }

        <Text my={6} f={1} fontWeight="bold" lineHeight={2}>
          <BlockLightboxActions block={block} />
        </Text>

        {block.can.manage &&
          <GenericButton mt={7} onClick={this.openManage} title="Edit" display="flex" f={2}>
            <Icons name="Pencil" size="1rem" color="gray.base" mr={4} />
            Edit block
          </GenericButton>
        }

        {mode === 'manage' &&
          <Modal onClose={this.closeModal} Dialog={BlockLightboxModalDialog}>
            <ManageBlock
              block={block}
              onDone={this.closeModal}
              autoFocus={autoFocus || undefined}
            />
          </Modal>
        }

        <BlockLightboxMetadataFold
          key={`BlockLightboxMetadataFold_${block.id}`}
          block={block}
        />
      </Box>
    );
  }
}

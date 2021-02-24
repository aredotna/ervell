import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

enum ConnectableTypenameEnum {
  Attachment = 'Attachment',
  Block = 'Block',
  Channel = 'Channel',
  Embed = 'Embed',
  Image = 'Image',
  Link = 'Link',
  Text = 'Text',
  PendingBlock = 'Block',
}

enum BaseConnectableTypenameEnum {
  Channel = 'Channel',
  Block = 'Block',
}

/**
 * Converts to the title-case version.
 * Either `'Block'` or `'Channel'` (or `null`)
 * @param typename
 */
export const toBaseConnectableTypename = (
  typename: ConnectableTypenameEnum
): BaseConnectableTypenameEnum => {
  if (typename === 'Channel') {
    return BaseConnectableTypenameEnum.Channel
  }

  if (ConnectableTypenameEnum[typename]) {
    return BaseConnectableTypenameEnum.Block
  }
}
/**
 * Converts to the constant-case version for GraphQL queries/mutations.
 * Either `'BLOCK'` or `'CHANNEL'`
 * @param typename
 */
export const toBaseConnectableType = (
  typename: ConnectableTypenameEnum
): BaseConnectableTypeEnum =>
  BaseConnectableTypeEnum[toBaseConnectableTypename(typename).toUpperCase()]

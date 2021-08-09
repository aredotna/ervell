import { ChannelContentsConnectable } from '__generated__/ChannelContentsConnectable'
import { BaseConnectableTypeEnum } from '__generated__/globalTypes'

/**
 * Resolves a block's type to a connectable type.
 * If a block is a channel the connectable type is
 * BaseConnectableTypeEnum.CHANNEL. Otherwise,
 * BaseConnectableTypeEnum.BLOCK
 */
export function getConnectableType(
  blockType: ChannelContentsConnectable['__typename']
): BaseConnectableTypeEnum {
  if (blockType === 'Channel') {
    return BaseConnectableTypeEnum.CHANNEL
  }

  return BaseConnectableTypeEnum.BLOCK
}

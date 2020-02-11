import React from 'react'
import { ExtensionContext } from 'v2/components/Bookmarklet/components/Extension'
import { SelectableChannel } from '__generated__/SelectableChannel'

export interface ExtensionContextProps {
  block: any
  selectedChannels: SelectableChannel[] | null
  currentPage: { url: string; title: string }
  addBlock: () => {}
  removeBlock: () => {}
  editBlock: () => {}
  getBlock: () => {}
  selectChannel: (channel: SelectableChannel) => {}
  getChannel: (channel: SelectableChannel) => {}
  unselectChannel: (channel: SelectableChannel) => {}
}

export default function withExtensionContext(Component) {
  return function WrapperComponent(props) {
    return (
      <ExtensionContext.Consumer>
        {state => <Component {...props} context={state} />}
      </ExtensionContext.Consumer>
    )
  }
}

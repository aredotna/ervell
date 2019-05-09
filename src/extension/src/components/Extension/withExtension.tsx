import React from 'react'
import { ExtensionContext } from 'extension/src/components/Extension'

export default function withExtensionContext(Component) {
  return function WrapperComponent(props) {
    return (
      <ExtensionContext.Consumer>
        {state => <Component {...props} context={state} />}
      </ExtensionContext.Consumer>
    )
  }
}

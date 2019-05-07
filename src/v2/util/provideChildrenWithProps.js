import React from 'react'

export default (children, props) => {
  if (!children) throw new Error('children is undefined')

  // If we have a bare string just return it.
  // Nothing can be provided to it.
  if (typeof children === 'string') {
    return children
  }

  // If we have a function, render it
  if (typeof children === 'function') {
    return children(props)
  }

  const xs = React.isValidElement(children)
    ? children
    : // Some children might be `false` due to conditional rendering.
      // Filter these out.
      children.filter(Boolean)

  return React.Children.map(xs, child => React.cloneElement(child, props))
}

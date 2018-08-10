import React from 'react';

export default (children, props) => {
  const xs = React.isValidElement(children)
    ? children
    : children.filter(Boolean);

  return React.Children.map(xs, child => React.cloneElement(child, props));
};

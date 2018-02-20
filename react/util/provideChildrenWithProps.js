import React from 'react';

export default (children, props) =>
  React.Children.map(children, child =>
    React.cloneElement(child, props));

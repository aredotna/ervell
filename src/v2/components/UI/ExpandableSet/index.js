import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { calculateLineHeight } from 'v2/styles/functions';

import UnwrappedExpandable from 'v2/components/UI/Expandable';

const Context = React.createContext({
  expanded: false,
  expand: () => {},
});

export class ExpandableContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    expanded: false,
    expand: () => {
      this.setState({ expanded: true });
    },
  };

  render() {
    const { expanded, expand } = this.state;
    const { children } = this.props;

    return (
      <Context.Provider value={{ expanded, expand }}>
        {children}
      </Context.Provider>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export class Expandable extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    nLines: PropTypes.number,
    forFontSize: PropTypes.string,
    forLineHeight: PropTypes.string,
  };

  static defaultProps = {
    nLines: 5,
    forFontSize: 'xs',
    forLineHeight: 'tall',
  };

  render() {
    const {
      children,
      nLines,
      forFontSize,
      forLineHeight,
      ...rest
    } = this.props;

    const height = `${calculateLineHeight(forFontSize, forLineHeight) *
      nLines}rem`;

    return (
      <Context.Consumer>
        {({ expanded, expand }) => (
          <UnwrappedExpandable
            height={height}
            onExpand={expand}
            mode={expanded ? 'expanded' : 'resting'}
            {...rest}
          >
            {children}
          </UnwrappedExpandable>
        )}
      </Context.Consumer>
    );
  }
}

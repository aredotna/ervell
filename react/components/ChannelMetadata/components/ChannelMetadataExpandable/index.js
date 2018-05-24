import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from 'react/styles';
import Expandable from 'react/components/UI/Expandable';

const N_LINES = 5;
const FIVE_LINES = `${Styles.Type.functions.calculateLineHeight('xs', 'tall') * N_LINES}rem`;

const Context = React.createContext({
  expanded: false,
  expand: () => {},
});

export class ChannelMetadataExpandableContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    expanded: false,
    expand: () => {
      this.setState({ expanded: true });
    },
  }

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

const ChannelMetadataExpandable = ({ children, ...rest }) => (
  <Context.Consumer>
    {({ expanded, expand }) => (
      <Expandable
        height={FIVE_LINES}
        onExpand={expand}
        mode={expanded ? 'expanded' : 'resting'}
        {...rest}
      >
        {children}
      </Expandable>
    )}
  </Context.Consumer>
);

ChannelMetadataExpandable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChannelMetadataExpandable;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import provideChildrenWithProps from 'v2/util/provideChildrenWithProps';

import Option from 'v2/components/UI/Pulldown/components/Option';

const Value = styled(Option)`
  border-radius: 0.25em;

  &:hover {
    background-color: inherit;
  }

  // Downward-facing Caret
  &:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    right: 1em;
    width: 0;
    height: 0;
    transform: translateY(-50%);
    border-top: 0.66em solid ${x => x.theme.colors.gray.semiBold};
    border-right: 0.33em solid transparent;
    border-left: 0.33em solid transparent;
    pointer-events: none;
  }

  ${x =>
    x.mode === 'expanded' &&
    `
    color: ${x.theme.colors.gray.medium};

    // Upward-facing Caret
    &:after {
      border-top: 0;
      border-bottom: 0.66em solid ${x.theme.colors.gray.semiBold};
    }
  `}
`;

class PulldownValue extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    forwardRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ current: PropTypes.any }),
    ]).isRequired,
  };

  render() {
    const { children, forwardRef, ...rest } = this.props;

    return (
      <Value ref={forwardRef} role="button" tabIndex={0} {...rest}>
        {provideChildrenWithProps(children, { purpose: 'value', ...rest })}
      </Value>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <PulldownValue forwardRef={ref} {...props} />
));

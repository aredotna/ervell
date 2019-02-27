import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import BlankLayout from 'react/components/UI/Layouts/BlankLayout';
import GlobalNavElements from 'react/components/GlobalNavElements';

export default class TopBarLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    scheme: PropTypes.oneOf(['DEFAULT', 'GROUP']),
  }

  static defaultProps = {
    scheme: 'DEFAULT',
  }

  render() {
    const { children, scheme, ...rest } = this.props;

    return (
      <BlankLayout {...rest}>
        <GlobalNavElements scheme={scheme} />

        {children}
      </BlankLayout>
    );
  }
}

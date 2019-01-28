// NOTE: Extend this layout when creating new layouts
// Do not put anything here that cannot be put on any page.

import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { withRouter } from 'react-router-dom';

import Description from 'react/components/UI/Head/components/Description';

import analytics from 'react/util/analytics';

const BodyStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

class Blank extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
      listen: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    analytics.initializePage();
    this.unlisten = this.props.history.listen(() =>
      analytics.trackPageView());
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <Description>
          Are.na is a social platform for creative and collaborative research.
        </Description>

        <BodyStyle />

        {children}
      </Fragment>
    );
  }
}

export default withRouter(Blank);

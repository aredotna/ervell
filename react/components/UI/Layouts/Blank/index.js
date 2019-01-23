import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import Description from 'react/components/UI/Head/components/Description';

const BodyStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

export default class Blank extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
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

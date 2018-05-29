import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from 'react/styles';

const MARGIN_BOTTOM = '2em';

const Container = styled.div`
  position: relative;
  margin: ${styles.Constants.containerOffset} auto 0 auto;
  ${x => x.hasChildren && `
    margin-bottom: ${MARGIN_BOTTOM};
  `}
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  padding-right: ${styles.Functions.multiply(styles.Constants.blockGutter, 2)}; // TODO: Remove

  ${styles.Constants.media.mobile`
    display: block;
  `}
`;

const Breadcrumb = styled.div`
  flex: 1;
`;

const Actions = styled.div`
  ${styles.Constants.media.mobile`
    margin-bottom: ${MARGIN_BOTTOM};
    margin-right: ${styles.Constants.blockGutter}; // TODO: Remove
    margin-left: ${styles.Constants.blockGutter}; // TODO: Remove
  `}
`;

const Metadata = styled.div`
`;

export default class HeaderMetadataContainer extends Component {
  static propTypes = {
    breadcrumb: PropTypes.node.isRequired,
    actions: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    actions: null,
    children: null,
  }

  render() {
    const {
      breadcrumb,
      actions,
      children,
      ...rest
    } = this.props;

    return (
      <Container hasChildren={!!children} {...rest}>
        <Header>
          <Breadcrumb>
            {breadcrumb}
          </Breadcrumb>

          {actions &&
            <Actions>
              {actions}
            </Actions>
          }
        </Header>

        {children &&
          <Metadata>
            {children}
          </Metadata>
        }
      </Container>
    );
  }
}

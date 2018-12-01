import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import textFragment from 'react/components/Cell/components/Konnectable/components/Text/fragments/text';

import Box from 'react/components/UI/Box';
import Typography from 'react/components/UI/Text';

const hoverMixin = css`
  border: 1px solid ${x => x.theme.colors.gray.semiLight};
`;

const Container = styled(Box).attrs({
  pt: 4,
  px: 5,
})`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // border: 1px solid transparent;
  border: 1px solid ${x => x.theme.colors.gray.light};
  text-align: left;

  ${x => x.mode === 'hover' && hoverMixin}
  &:hover { ${hoverMixin} }

  // If text is long: overflow with a small gradient fade out
  ${x => x.length > 500 && `
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 3em;
      background: linear-gradient(${x.theme.colors.utility.transparent} 0%, white 100%);
    }
  `}
`;

export default class Text extends Component {
  static propTypes = {
    text: propType(textFragment).isRequired,
    mode: PropTypes.oneOf(['resting', 'hover', 'overlay']),
  }

  static defaultProps = {
    mode: 'resting',
  }

  render() {
    const { text: { content }, mode, ...rest } = this.props;

    return (
      <Container length={content.length} mode={mode} {...rest}>
        {/* We should truncate content to prevent an excess of data being needlessly returned */}
        {/* Try truncating markdown source then rendering it as a possible solution */}
        <Typography
          font="serif"
          lineHeight={2}
          color={{ hover: 'black', resting: 'gray.base' }[mode]}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Container>
    );
  }
}

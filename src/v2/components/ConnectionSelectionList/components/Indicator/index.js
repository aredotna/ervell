import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { inputPadding } from 'v2/components/UI/Inputs';
import { baseMixin as baseTextMixin } from 'v2/components/UI/Text';

const Container = styled.div.attrs({
  f: 1,
})`
  ${baseTextMixin}
  position: relative;
  margin-top: -1px;
  padding: ${inputPadding}; // TODO
  line-height: 1;
  user-select: none;
  color: ${x => x.theme.colors.gray.semiBold};
  border: 1px solid ${x => x.theme.colors.gray.regular};
  background-color: ${x => x.theme.colors.gray.hint};
  text-align: left;
`;

const Indicator = ({ label, ...rest }) => (
  <div {...rest}>
    <Container>
      {label}
    </Container>
  </div>
);

Indicator.propTypes = {
  label: PropTypes.string,
};

Indicator.defaultProps = {
  label: 'Loading...',
};

export default Indicator;

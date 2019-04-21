import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Label from 'v2/components/UI/Inputs/components/Label';
import Checkbox from 'v2/components/UI/Inputs/components/Checkbox';

const CheckboxLabel = styled(Label)`
  font-weight: normal;
  user-select: none;
`;

const LabelledCheckbox = ({ children, ...rest }) => (
  <CheckboxLabel>
    <Checkbox {...rest} />
    {children}
  </CheckboxLabel>
);

LabelledCheckbox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LabelledCheckbox;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Text from 'react/components/UI/Text';
import Icons from 'react/components/UI/Icons';
import CloseButton from 'react/components/AuthForm/components/CloseButton';

const Form = styled.form`
  width: ${x => x.theme.space[12]};
  margin: 0 auto;
  text-align: center;
`;

const Submit = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${x => x.theme.space[7]};
`;

const Subtext = styled(Text).attrs({
  mt: 6,
  f: 2,
  underlineLinks: true,
})`
`;

export default class AuthForm extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  static Submit = Submit
  static Subtext = Subtext

  render() {
    const { onSubmit } = this.props;

    return (
      <Form onSubmit={onSubmit}>
        <CloseButton />

        <Icons name="ArenaMark" size={7} mb={9} />

        {this.props.children}
      </Form>
    );
  }
}

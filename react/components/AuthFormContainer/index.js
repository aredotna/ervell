import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { fontSize } from 'styled-system';

import ArenaMark from 'react/components/UI/ArenaMark/index.svg';
import { Input } from 'react/components/UI/GenericInput';
import GenericButton from 'react/components/UI/GenericButton';
import { preset } from 'react/styles/functions';
import Text from 'react/components/UI/Text';

const Container = styled.form`
  max-width: 25em;
  margin: 0 auto;
`;

const AuthInput = styled(Input).attrs({
  px: 5,
  my: 25,
})``;

const Button = styled(GenericButton).attrs({
  f: 3, type: 'submit', px: 7, mt: 20,
})``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonArea = ({ ...rest }) => (
  <ButtonContainer>
    <Button {...rest} />
  </ButtonContainer>
);

const ButtonCTA = styled.div`
  margin-top: 1em;
  text-align: center;
  font-family: ${x => x.theme.fonts.sans};
  color: ${x => x.theme.colors.gray.base};
  font-size: ${x => x.theme.fontSizes[1]};

  a {
    text-decoration: underline;
    color: inherit;
  }
`;

const Mark = styled.div`
  position: relative;
  width: 3em;
  height: 3em;
  margin: 0 auto 4em;

  > svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 75%;
    height: 100%;
    fill: ${x => x.theme.colors.gray.bold};
  }
`;

const Headline = styled(Text).attrs({ f: 7 })`
  margin: 2em 0;
  text-align: center;
`;

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em 0 1em;
  font-weight: bold;
  font-family: ${x => x.theme.fonts.sans};
  ${preset(fontSize, { f: 1 })}
  color: ${x => (x.isError ? x.theme.colors.state.alert : 'inherit')};
`;


class AuthFormContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onDone: PropTypes.func.isRequired,
  }

  static Input = AuthInput;
  static Button = ButtonArea;
  static ButtonCTA = ButtonCTA;
  static Headline = Headline;
  static Message = Message;

  render() {
    const { onDone } = this.props;
    return (
      <Container onSubmit={onDone}>
        <Mark>
          <ArenaMark />
        </Mark>
        {this.props.children}
      </Container>
    );
  }
}

export default AuthFormContainer;

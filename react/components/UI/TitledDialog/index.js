import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { DividerButton } from 'react/components/UI/Buttons';

const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2em 1em 0 1em;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
`;

const Section = styled.div`
  width: 100%;
  margin: 2em auto;

  & + &, // Margins don't collapse in flex context
  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h3`
  margin: 0 auto 1em auto;
  font-family: ${x => x.theme.fonts.sans};
  font-size: ${x => x.theme.fontSizesIndexed.lg};
  font-weight: bold;
  text-align: center;
  color: ${x => x.theme.colors.gray.medium};
`;

const Label = styled.h4`
  margin: 0.75em 0;
  font-weight: normal;
  font-size: ${x => x.theme.fontSizesIndexed.sm};
`;


export default class TitledDialog extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onDone: PropTypes.func.isRequired,
    label: PropTypes.string,
  }

  static defaultProps = {
    label: 'Done',
  }

  static Section = Section
  static Label = Label

  render() {
    const {
      title, children, onDone, label, ...rest
    } = this.props;

    return (
      <Container onSubmit={onDone} {...rest}>
        <Title>
          {title}
        </Title>

        <Body>
          {children}
        </Body>

        <DividerButton type="submit">
          {label}
        </DividerButton>
      </Container>
    );
  }
}

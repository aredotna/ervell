import React, { Component } from 'react'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'
import CloseButton from 'v2/components/AuthForm/components/CloseButton'

const Form = styled.form`
  width: ${x => x.theme.space[12]};
  margin: 0 auto;
  text-align: center;
`

const Submit = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: ${x => x.theme.space[7]};
`

const Subtext = styled(Text).attrs({
  mt: 6,
  f: 2,
  underlineLinks: true,
})``

interface AuthFormProps {
  children: React.ReactNode
  onSubmit: () => any
  onClose?: () => any
}

export default class AuthForm extends Component<AuthFormProps> {
  static Submit = Submit
  static Subtext = Subtext

  render() {
    const { onSubmit, onClose, ...rest } = this.props

    return (
      <Form onSubmit={onSubmit} {...rest}>
        <CloseButton onClose={onClose} />

        <Icons name="ArenaMark" size={7} mb={8} />

        {this.props.children}
      </Form>
    )
  }
}

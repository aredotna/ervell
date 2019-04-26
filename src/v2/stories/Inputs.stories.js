import React, { Component } from 'react'
import { storiesOf } from '@storybook/react'

import theme from 'v2/styles/theme'

import Specimen from 'v2/stories/__components__/Specimen'
import States from 'v2/stories/__components__/States'

import { Input, Textarea } from 'v2/components/UI/Inputs'

class FocusableInput extends Component {
  inputRef = React.createRef()

  handleClick = () => this.inputRef.current.focus()

  render() {
    return (
      <div>
        <a role="button" tabIndex={0} onClick={this.handleClick}>
          Click me to focus input
        </a>

        <Input ref={this.inputRef} />
      </div>
    )
  }
}

// eslint-disable-next-line react/no-multi-comp
class FocusableTextarea extends Component {
  textareaRef = React.createRef()

  handleClick = () => this.textareaRef.current.focus()

  render() {
    return (
      <div>
        <a role="button" tabIndex={0} onClick={this.handleClick}>
          Click me to focus textarea
        </a>

        <Textarea ref={this.textareaRef} />
      </div>
    )
  }
}

storiesOf('Input', module)
  .add('Input', () => (
    <States
      states={[
        {},
        { disabled: true },
        { focus: true },
        { defaultValue: 'With value', focus: true },
      ]}
    >
      <Input placeholder="An input" />
    </States>
  ))
  .add('Input - sizes', () => (
    <div>
      {theme.fontSizes.map((size, i) => (
        <Specimen key={size}>
          <Input f={i} placeholder={`An input @ ${size}: f={${i}}`} />
        </Specimen>
      ))}
    </div>
  ))
  .add('Input - with errors', () => (
    <div>
      <Input
        placeholder="An input"
        defaultValue="Erroneous input"
        errorMessage="This can't be blank"
      />
      <Input
        placeholder="Another"
        defaultValue="Wrong. But, has a margin `mb={8}`"
        errorMessage="Just wrong"
        mb={8}
      />
      <Input
        placeholder="Another"
        defaultValue="Wrong"
        errorMessage="Just wrong"
      />
      <Textarea
        my={4}
        defaultValue="Some text in a textarea. hasError but no error message..."
        hasError
      />
      <Textarea
        my={4}
        defaultValue="Some text in a textarea with an errorMessage (TODO)"
        errorMessage="I dont really support this yet."
      />
    </div>
  ))
  .add('Input - with ref', () => (
    <Specimen>
      <FocusableInput />
    </Specimen>
  ))
  .add('Textarea - with ref', () => (
    <Specimen>
      <FocusableTextarea />
    </Specimen>
  ))
  .add('Input - colors', () => (
    <Specimen>
      {theme.meta.colorNames.map(color => (
        <States
          key={color}
          states={[
            {},
            { disabled: true },
            { hover: true },
            { active: true },
            { value: 'value' },
          ]}
        >
          <Input color={color} placeholder={color} />
        </States>
      ))}
    </Specimen>
  ))
  .add('Input - borderless', () => (
    <Specimen>
      <States
        states={[
          {},
          { disabled: true },
          { hover: true },
          { active: true },
          { value: 'value' },
        ]}
      >
        <Input placeholder="Borderless input" borderless />
      </States>
    </Specimen>
  ))
  .add('Input - borderless, colors', () => (
    <Specimen>
      {theme.meta.colorNames.map(color => (
        <States
          key={color}
          states={[
            {},
            { disabled: true },
            { hover: true },
            { active: true },
            { value: 'value' },
          ]}
        >
          <Input color={color} placeholder={color} borderless />
        </States>
      ))}
    </Specimen>
  ))

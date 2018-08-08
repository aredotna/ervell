import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';

import theme from 'react/styles/theme';

import Specimen from 'react/stories/__components__/Specimen';
import States from 'react/stories/__components__/States';

import { Input } from 'react/components/UI/Inputs';

class FocusableInput extends Component {
  handleClick = () => {
    this.input.focus();
  }

  render() {
    return (
      <div>
        <a
          role="button"
          tabIndex={0}
          onClick={this.handleClick}
        >
          Click me to focus input
        </a>

        <Input innerRef={(input) => { this.input = input; }} />
      </div>
    );
  }
}

storiesOf('Input', module)
  .add('Input', () => (
    <States states={[{}, { disabled: true }, { focus: true }, { defaultValue: 'With value', focus: true }]}>
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
  .add('Input - with Errors', () => (
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
    </div>
  ))
  .add('Input - with ref', () => (
    <Specimen>
      <FocusableInput />
    </Specimen>
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';
import Modal from '../components/UI/Modal/Modal';

storiesOf('UI', module)
  .add('Modal', () => (
    <Modal>
      <h1>Hello</h1>
    </Modal>
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'v2/stories/__components__/Specimen';

import FileUploaderProgressList from 'v2/components/UI/FileUploaderProgressList';

const files = [
  {
    file: { path: 'foobar.jpg', size: 2299594 },
    progress: 24,
  },

  {
    file: { path: 'barbaz.png', size: 22959 },
    progress: 87,
  },
];

storiesOf('FileUploaderProgressList', module).add('default', () => (
  <Specimen>
    <FileUploaderProgressList files={files} />
  </Specimen>
));

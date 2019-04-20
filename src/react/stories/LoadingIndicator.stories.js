import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import BlocksLoadingIndicator from 'react/components/UI/BlocksLoadingIndicator';

const HEXAGRAMS = [
  '䷀', '䷁', '䷂', '䷃', '䷄', '䷅', '䷆', '䷇', '䷈', '䷉', '䷊', '䷋', '䷌', '䷍', '䷎', '䷏',
  '䷐', '䷑', '䷒', '䷓', '䷔', '䷕', '䷖', '䷗', '䷘', '䷙', '䷚', '䷛', '䷜', '䷝', '䷞', '䷟',
  '䷠', '䷡', '䷢', '䷣', '䷤', '䷥', '䷦', '䷧', '䷨', '䷩', '䷪', '䷫', '䷬', '䷭', '䷮', '䷯',
  '䷰', '䷱', '䷲', '䷳', '䷴', '䷵', '䷶', '䷷', '䷸', '䷹', '䷺', '䷻', '䷼', '䷽', '䷾', '䷿',
];

storiesOf('LoadingIndicator', module)
  .add('default', () => (
    <Specimen>
      <LoadingIndicator />
    </Specimen>
  ))
  .add('alternate spinners', () => (
    <Specimen>
      <LoadingIndicator frames={['+', '++', '+++']} />
      <LoadingIndicator frames={['🌍', '🌎', '🌏']} interval={150} />
      <LoadingIndicator frames={['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚']} interval={50} />
      <LoadingIndicator frames={['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']} interval={100} />
      <LoadingIndicator frames={['|', '/', '-', '\\']} interval={100} />
      <LoadingIndicator frames={['▖', '▘', '▝', '▗']} interval={100} />
      <LoadingIndicator frames={HEXAGRAMS} interval={100} />
    </Specimen>
  ))
  .add('BlocksLoadingIndicator', () => (
    <Specimen>
      <BlocksLoadingIndicator />
    </Specimen>
  ))
  .add('alignment', () => (
    <Specimen>
      <LoadingIndicator
        frames={['$', '$$', '$$$']}
        justifyContent="start"
        border="1px solid"
      />
    </Specimen>
  ));

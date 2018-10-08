import React from 'react';
import { storiesOf } from '@storybook/react';

import Specimen from 'react/stories/__components__/Specimen';
import Feed from 'react/components/Feed';
import FeedGroups from 'react/components/Feed/components/FeedGroups/index';
import NoFollowingMessage from 'react/pages/feed/components/NoFollowingMessage';

storiesOf('Feed', module)
  .add('default', () => (
    <Specimen>
      <Feed />
    </Specimen>
  )).add('empty', () => (
    <Specimen>
      <NoFollowingMessage />
      <FeedGroups groups={[]} />
    </Specimen>
  ));

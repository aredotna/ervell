import React from 'react';
import { storiesOf } from '@storybook/react';

import NoFollowingMessage from 'v2/components/Feed/components/NoFollowingMessage';
import EducationPage from 'v2/pages/about/EducationPage';
import GroupsPage from 'v2/pages/about/GroupsPage';

storiesOf('Pages', module)
  .add('Empty feed / No follower message', () => <NoFollowingMessage />)
  .add('About / Education', () => <EducationPage />)
  .add('About / Getting Started with Groups', () => <GroupsPage />);

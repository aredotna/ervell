import React from 'react';
import { storiesOf } from '@storybook/react';

import NoFollowingMessage from 'react/components/Feed/components/NoFollowingMessage';
import EducationPage from 'react/pages/about/EducationPage';
import GroupsPage from 'react/pages/about/GroupsPage';

storiesOf('Pages', module)
  .add('Empty feed / No follower message', () => (
    <NoFollowingMessage />
  )).add('About / Education', () => (
    <EducationPage />
  ))
  .add('About / Getting Started with Groups', () => (
    <GroupsPage />
  ));

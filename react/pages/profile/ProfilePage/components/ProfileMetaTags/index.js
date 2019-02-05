import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import profileMetaTagsFragment from 'react/pages/profile/ProfilePage/components/ProfileMetaTags/fragments/profileMetaTags';

import Head from 'react/components/UI/Head';
import Title from 'react/components/UI/Head/components/Title';
import Description from 'react/components/UI/Head/components/Description';
import Canonical from 'react/components/UI/Head/components/Canonical';

const ProfileMetaTags = ({ identifiable, view }) => (
  <React.Fragment>
    <Title>
      {identifiable.title}
    </Title>

    <Description>
      {identifiable.description}
    </Description>

    <Canonical>
      {identifiable.canonical}
    </Canonical>

    <Head>
      {(!identifiable.is_indexable || view === 'followers' || view === 'following') &&
        <meta name="robots" content="none" />
      }

      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${identifiable.canonical}/feed/rss`}
      />
    </Head>
  </React.Fragment>
);

ProfileMetaTags.propTypes = {
  identifiable: propType(profileMetaTagsFragment).isRequired,
  view: PropTypes.oneOf(['all', 'channels', 'blocks', 'index', 'following', 'followers']).isRequired,
};

export default ProfileMetaTags;

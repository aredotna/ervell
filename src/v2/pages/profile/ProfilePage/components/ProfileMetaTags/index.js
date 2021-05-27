import React from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import profileMetaTagsFragment from 'v2/pages/profile/ProfilePage/components/ProfileMetaTags/fragments/profileMetaTags'

import Head from 'v2/components/UI/Head'
import Title from 'v2/components/UI/Head/components/Title'
import Description from 'v2/components/UI/Head/components/Description'
import Canonical from 'v2/components/UI/Head/components/Canonical'

const ProfileMetaTags = ({ identifiable, view }) => (
  <React.Fragment>
    <Title>{identifiable.title}</Title>

    <Description>{identifiable.description}</Description>

    <Canonical>{identifiable.canonical}</Canonical>

    <Head>
      {(!identifiable.is_indexable ||
        view === 'followers' ||
        view === 'following') && <meta name="robots" content="none" />}

      <link
        rel="alternate"
        type="application/rss+xml"
        href={`${identifiable.canonical}/feed/rss`}
      />
    </Head>
  </React.Fragment>
)

ProfileMetaTags.propTypes = {
  identifiable: propType(profileMetaTagsFragment).isRequired,
  view: PropTypes.oneOf([
    'all',
    'channels',
    'blocks',
    'index',
    'following',
    'followers',
    'feed',
  ]).isRequired,
}

export default ProfileMetaTags

import React from 'react';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';

import emptyOrTipsFragment from 'react/pages/profile/ProfilePage/components/EmptyMessageOrComponent/fragments/emptyOrTips';

import ProfileEmptyMessage from 'react/components/ProfileEmptyMessage';
import ProfileTips from 'react/components/ProfileTips';

const EmptyMessageOrComponent = ({
  count: sectionCount,
  children,
  identifiable,
  ...rest
}) => {
  const contentCount = identifiable.counts.blocks + identifiable.counts.channels;
  const timestampDifference = new Date() - new Date(identifiable.created_at);
  const createdAtDaysAgo = Math.floor(timestampDifference / 1000 / 60 / 60 / 24);

  const isMyProfile = identifiable.is_me;
  const isRecentAccount = createdAtDaysAgo <= 7;
  const isSectionEmpty = sectionCount === 0;
  const isProfileTotallyEmpty = contentCount === 0;

  const components = [];

  if (
    (isMyProfile && isRecentAccount && !isProfileTotallyEmpty) ||
    (isMyProfile && isProfileTotallyEmpty)
  ) {
    components.push(<ProfileTips key="profileTips" />);
  }

  if (
    (isSectionEmpty && (isMyProfile && !isProfileTotallyEmpty)) ||
    (!isMyProfile && isSectionEmpty)
  ) {
    const profileEmptyMessage = (
      <ProfileEmptyMessage
        key="profileEmptyMessage"
        isMine={isMyProfile}
        identifiable={identifiable}
        {...rest}
      />
    );
    components.push(profileEmptyMessage);
  }

  if (!isSectionEmpty) {
    components.push(children);
  }

  return components;
};

EmptyMessageOrComponent.propTypes = {
  count: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  identifiable: propType(emptyOrTipsFragment).isRequired,
};

export default EmptyMessageOrComponent;

import React from 'react';
import PropTypes from 'prop-types';
import Box from 'react/components/UI/Box';

import MemberAvatar from 'react/components/MemberAvatar';

const AuthorOption = ({ member }) => (
  <Box display="flex" alignItems="center">
    <MemberAvatar
      member={member}
      isLinked={false}
      size={20}
      mr={3}
      circle
    />
    <span>
      {member.name} ({member.__typename.toLowerCase()})
    </span>
  </Box>
);

AuthorOption.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default AuthorOption;

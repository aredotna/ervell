import React from 'react';
import PropTypes from 'prop-types';
import Box from 'react/components/UI/Box';

import MemberAvatar from 'react/components/MemberAvatar';
import Badge from 'react/components/UI/Badge';

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
      {member.name}
      {member.__typename === 'Group' && (
        <Badge f={0} ml={4} color="gray.medium" borderColor="gray.medium" icon={{ private: 'Lock' }[member.visibility]}>
          Group
        </Badge>
      )}
    </span>
  </Box>
);

AuthorOption.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default AuthorOption;

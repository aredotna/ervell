import React from 'react';
import Box from 'v2/components/UI/Box';

import MemberAvatar from 'v2/components/MemberAvatar';
import Badge from 'v2/components/UI/Badge';

interface Props {
  member: {
    name: string;
    __typename: string;
    visibility: string;
  };
}

const AuthorOption: React.FC<Props> = ({ member }) => (
  <Box display="flex" alignItems="center">
    <MemberAvatar member={member} isLinked={false} size={20} mr={3} circle />
    <span>
      {member.name}
      {member.__typename === 'Group' && (
        <Badge
          f={0}
          ml={4}
          color="gray.medium"
          borderColor="gray.medium"
          icon={{ private: 'Lock' }[member.visibility]}
        >
          Group
        </Badge>
      )}
    </span>
  </Box>
);

export default AuthorOption;

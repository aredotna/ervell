import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import ManagedMember from 'react/components/ManagedMembers/components/ManagedMember';
import managedMemberFragment from 'react/components/ManagedMembers/components/ManagedMember/fragments/managedMember';

export default class ManagedMembers extends Component {
  static propTypes = {
    owner: propType(managedMemberFragment),
    members: PropTypes.arrayOf(propType(managedMemberFragment)).isRequired,
    onRemove: PropTypes.func.isRequired,
    confirmationWarning: PropTypes.string,
    confirmationSelfWarning: PropTypes.string,
  }

  static defaultProps = {
    owner: null,
    confirmationWarning: undefined,
    confirmationSelfWarning: undefined,
  }

  render() {
    const {
      owner,
      members,
      onRemove,
      confirmationWarning,
      confirmationSelfWarning,
      ...rest
    } = this.props;

    return (
      <div {...rest}>
        {members.map(member => (
          <ManagedMember
            key={member.id}
            member={member}
            isOwner={owner && owner.id === member.id}
            onRemove={onRemove}
            confirmationWarning={confirmationWarning}
            confirmationSelfWarning={confirmationSelfWarning}
          />
        ))}
      </div>
    );
  }
}

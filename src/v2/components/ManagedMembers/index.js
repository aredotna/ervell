import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import ManagedMember from 'v2/components/ManagedMembers/components/ManagedMember'
import managedMemberFragment from 'v2/components/ManagedMembers/components/ManagedMember/fragments/managedMember'

export default class ManagedMembers extends Component {
  static propTypes = {
    owner: propType(managedMemberFragment),
    memberships: PropTypes.arrayOf(
      PropTypes.shape({
        can: PropTypes.shape({
          manage: PropTypes.bool.isRequired,
        }).isRequired,
        member: propType(managedMemberFragment).isRequired,
      })
    ).isRequired,
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
      memberships,
      onRemove,
      confirmationWarning,
      confirmationSelfWarning,
      ...rest
    } = this.props

    return (
      <div {...rest}>
        {owner && (
          <ManagedMember
            key={owner.id}
            member={owner}
            isOwner
            isRemovable={false}
            onRemove={onRemove}
            confirmationWarning={confirmationWarning}
            confirmationSelfWarning={confirmationSelfWarning}
          />
        )}

        {memberships.map(({ can, member }) => (
          <ManagedMember
            key={member.id}
            member={member}
            isRemovable={can.manage}
            onRemove={onRemove}
            confirmationWarning={confirmationWarning}
            confirmationSelfWarning={confirmationSelfWarning}
          />
        ))}
      </div>
    )
  }
}

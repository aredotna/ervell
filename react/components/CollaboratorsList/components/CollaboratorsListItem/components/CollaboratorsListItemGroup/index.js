import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import Modal from 'react/components/UI/Modal';
import ManageGroup from 'react/components/ManageGroup';
import Link from 'react/components/CollaboratorsList/components/CollaboratorsListItem/components/Link';

import collaboratorLinkFragment from 'react/components/CollaboratorsList/fragments/collaboratorLink';

export default class CollaboratorsListItemGroup extends Component {
  static propTypes = {
    group: propType(collaboratorLinkFragment).isRequired,
    channel_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = () => {
    const { channel_id, group: { id, can } } = this.props;

    if (can.manage || can.manage_users) {
      const modal = new Modal(ManageGroup, { id, channel_id });
      modal.open();
      return;
    }

    this.setState(({ mode: prevMode }) => ({
      mode: prevMode === 'active' ? 'resting' : 'active',
    }));
  }


  render() {
    const { mode } = this.state;
    const {
      group: {
        name, can, user, users,
      },
    } = this.props;

    const allUsers = [user, ...users];

    return (
      <strong>
        <Link onClick={this.handleClick}>
          {name}

          {mode === 'resting' &&
            <span>
              {' '}(
                {can.manage || can.manage_users ? 'edit' : '...'}
              )
            </span>
          }
        </Link>

        {mode === 'active' &&
          <span>
            {' '}
            (
              {allUsers.length > 0 &&
                allUsers.map((memberUser, i) => (
                  <span key={memberUser.id}>
                    <Link href={memberUser.href}>
                      {memberUser.name}
                    </Link>

                    {i !== allUsers.length - 1 && ', '}
                  </span>
                ))
              }
              {allUsers.length === 0 && '...'}
            )
          </span>
        }
      </strong>
    );
  }
}

import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Modal from 'react/components/UI/Modal';
import ManageGroup from 'react/components/ManageGroup';

import collaboratorLinkFragment from 'react/components/CollaboratorsList/fragments/collaboratorLink';

const Link = styled.a.attrs({
  role: 'button',
})`
`;

export default class CollaboratorsListItem extends Component {
  static propTypes = {
    collaborator: propType(collaboratorLinkFragment).isRequired,
  }

  state = {
    mode: 'resting',
  }

  handleClick = () => {
    const { collaborator: { __typename } } = this.props;

    if (__typename !== 'Group') return;

    const { collaborator: { id, can } } = this.props;

    if (can.manage) {
      const modal = new Modal(ManageGroup, { id });
      modal.open();
      return;
    }

    this.setState(({ mode: prevMode }) => ({
      mode: prevMode === 'active' ? 'resting' : 'active',
    }));
  }

  render() {
    const { mode } = this.state;
    const { collaborator, collaborator: { users, can } } = this.props;

    return (
      <strong>
        <Link
          href={collaborator.href}
          onClick={this.handleClick}
        >
          {collaborator.name}

          {mode === 'resting' && collaborator.__typename === 'Group' &&
            <span>
              {' '}(
                {can.manage ? 'edit' : '...'}
              )
            </span>
          }
        </Link>

        {mode === 'active' &&
          <span>
            {' '}
            (
              {users.length > 0 &&
                users.map((user, i) => (
                  <span key={user.id}>
                    <Link href={user.href}>
                      {user.name}
                    </Link>

                    {i !== users.length - 1 && ', '}
                  </span>
                ))
              }
              {users.length === 0 && '...'}
            )
          </span>
        }
      </strong>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import currentUserService from 'react/util/currentUserService';

import Styles from 'react/styles';

import Count from 'react/components/UI/Count';
import MemberAvatar from 'react/components/MemberAvatar';

import managedMemberFragment from 'react/components/ManagedMembers/components/ManagedMember/fragments/managedMember';

const Container = styled.div`
  display: flex;
  padding: 0.5em;
  border-top: 1px solid ${Styles.Colors.gray.light};
`;

const Representation = styled.div`
  display: flex;
  flex: 1;
`;

const Information = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 1em;
  font-size: ${Styles.Type.size.xs};
  line-height: ${Styles.Type.lineHeight.base};
`;

const Name = styled.a`
  display: block;
  font-weight: bold;
`;

const Warning = styled.div`
  color: ${Styles.Colors.state.alert};
`;

const Amount = styled.div`
  color: ${Styles.Colors.gray.medium};
`;

const Button = styled.button`
  align-self: flex-start;
`;

export default class ManagedMembers extends Component {
  static propTypes = {
    isOwner: PropTypes.bool,
    isRemovable: PropTypes.bool,
    confirmationWarning: PropTypes.string,
    confirmationSelfWarning: PropTypes.string,
    onRemove: PropTypes.func.isRequired,
    member: propType(managedMemberFragment).isRequired,
  }

  static defaultProps = {
    isOwner: false,
    isRemovable: true,
    confirmationWarning: 'Are you sure?',
    confirmationSelfWarning: null,
  }

  state = {
    mode: 'resting',
  }

  remove = () => {
    const { mode } = this.state;

    if (mode === 'clicked') {
      return this.setState({ mode: 'resting' });
    }

    return this.setState({ mode: 'clicked' });
  }

  confirm = () => {
    const { onRemove, member } = this.props;

    this.setState({ mode: 'removing' });

    return onRemove({
      member_id: member.id,
      member_type: member.__typename.toUpperCase(),
    })
      .catch(() => this.setState({ mode: 'error' }));
  }

  render() {
    const { mode } = this.state;

    const {
      member,
      isOwner,
      isRemovable,
      confirmationWarning,
      confirmationSelfWarning,
    } = this.props;

    return (
      <Container>
        <Representation>
          {member.__typename === 'User' &&
            <MemberAvatar member={member} />
          }

          <Information>
            <Name href={member.href}>
              {member.name}
            </Name>

            {member.__typename === 'Group' && mode !== 'clicked' &&
              <Amount>
                Group (<Count amount={member.counts.users + 1} label="user" />)
              </Amount>
            }

            {mode === 'clicked' &&
              <Warning>
                {currentUserService().id === member.id &&
                  `${confirmationSelfWarning} `
                }

                {`${confirmationWarning} `}

                <a onClick={this.confirm} role="button" tabIndex={0}>
                  <strong>Confirm</strong>
                </a>
              </Warning>
            }
          </Information>
        </Representation>

        {isOwner &&
          <Button
            className="Button Button--size-xs"
            disabled
          >
            Owner
          </Button>
        }

        {!isOwner && isRemovable &&
          <Button
            className={`Button Button--size-xs ${mode === 'clicked' && 'Color--state-alert'}`}
            onClick={this.remove}
            type="button"
          >
            {{
              resting: 'Remove',
              clicked: 'Cancel',
              removing: 'Removing...',
              error: 'Error',
            }[mode]}
          </Button>
        }
      </Container>
    );
  }
}

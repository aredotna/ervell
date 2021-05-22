import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from '@apollo/client/react/components'

import assignAuthorQuery from 'v2/components/ManageChannel/components/AssignAuthor/queries/assignAuthorQuery'

import Pulldown from 'v2/components/UI/Pulldown'
import AuthorOption from 'v2/components/AuthorOption'

export default class AssignAuthor extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    selected: PropTypes.string.isRequired,
  }

  render() {
    const { onChange, selected } = this.props

    return (
      <Query query={assignAuthorQuery}>
        {({ data, errors, loading }) => {
          if (loading || errors) {
            return (
              <div>
                <Pulldown
                  value={selected}
                  options={{
                    [selected]: (
                      <AuthorOption
                        member={{ name: 'Me', __typename: 'USER' }}
                      />
                    ),
                  }}
                />
              </div>
            )
          }

          const {
            me,
            me: { groups },
          } = data

          return (
            <div>
              <Pulldown
                value={selected}
                onChange={onChange}
                options={{
                  [`USER:${me.id}`]: <AuthorOption member={me} />,
                  ...groups.reduce(
                    (memo, group) => ({
                      ...memo,
                      [`GROUP:${group.id}`]: <AuthorOption member={group} />,
                    }),
                    {}
                  ),
                }}
              />
            </div>
          )
        }}
      </Query>
    )
  }
}

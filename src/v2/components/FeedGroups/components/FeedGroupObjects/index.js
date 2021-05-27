import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import feedGroupObjectFragment from 'v2/components/FeedGroups/components/FeedGroupObjects/fragments/object'

import Grid from 'v2/components/UI/Grid'

import { Konnectable } from 'v2/components/Cell/components/Konnectable'
import Identifiable from 'v2/components/Cell/components/Identifiable'

const ObjectGrid = styled(Grid)`
  justify-content: center;
  margin-top: ${x => x.theme.space[7]};
`

export default class FeedGroupObjects extends PureComponent {
  static propTypes = {
    objects: PropTypes.arrayOf(propType(feedGroupObjectFragment)).isRequired,
    context: PropTypes.arrayOf(
      PropTypes.shape({
        __typename: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })
    ),
  }

  static defaultProps = {
    context: [],
  }

  render() {
    const { objects, context } = this.props

    return (
      <ObjectGrid>
        {objects.map(object => {
          const isIdentifiable =
            object.__typename === 'User' || object.__typename === 'Group'

          if (isIdentifiable) {
            return (
              <Identifiable
                key={`${object.__typename}__${object.id}`}
                identifiable={object}
              />
            )
          }

          return (
            <Konnectable
              key={`${object.__typename}__${object.id}`}
              konnectable={object}
              context={context}
            />
          )
        })}
      </ObjectGrid>
    )
  }
}

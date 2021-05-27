import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withApollo } from '@apollo/client/react/hoc'
import Mousetrap from 'mousetrap'

import Link from 'v2/components/UI/Link'
import Icons from 'v2/components/UI/Icons'

import modalBlockLightboxQuery from 'v2/components/ModalBlockLightbox/queries/modalBlockLightbox'

const navigate = xs => ({
  next: cursor => xs[cursor >= xs.length - 1 ? 0 : cursor + 1],
  prev: cursor => xs[cursor <= 0 ? xs.length - 1 : cursor - 1],
})

const Prev = styled(Link).attrs({
  px: 7,
  py: 6,
})`
  position: absolute;
  display: block;
  top: 0;
  bottom: 0;
  left: 0;
  user-select: none;
  z-index: 1;
  opacity: 0.1;

  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: scale(-1) translate(-50%, -50%);
    transform-origin: 0 0;
  }

  &:hover {
    opacity: 1;

    svg {
      fill: ${props => props.theme.colors.gray.bold};
      cursor: pointer;
    }
  }
`

const Next = styled(Prev)`
  left: unset;
  right: 0;

  > div {
    transform: translate(-50%, -50%);
  }
`

class ModalBlockLightboxNavigation extends PureComponent {
  static propTypes = {
    client: PropTypes.shape({
      query: PropTypes.func.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    ids: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    const { ids } = props
    const { next, prev } = navigate(ids)

    super(props)

    this.__next__ = next
    this.__prev__ = prev
  }

  componentDidMount() {
    this.preload('next')

    Mousetrap.bind('right', this.next)
    Mousetrap.bind('left', this.prev)
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.preload('next')
    }
  }

  componentWillUnmount() {
    Mousetrap.unbind('right', 'left')
  }

  cursor = () => {
    const { id, ids } = this.props
    return ids.indexOf(id)
  }

  next = e => {
    e.preventDefault()

    const { onChange, id } = this.props
    const nextId = this.__next__(this.cursor())

    console.log('nextId', nextId)
    console.log('currentId', id)
    return onChange(nextId)
  }

  prev = e => {
    e.preventDefault()

    const { onChange } = this.props
    const prevId = this.__prev__(this.cursor())

    return onChange(prevId)
  }

  preload = direction => {
    const { client } = this.props

    const prospectiveId = this[`__${direction}__`](this.cursor())

    client.query({
      query: modalBlockLightboxQuery,
      variables: { id: prospectiveId },
    })
  }

  render() {
    const { id, ids, ...rest } = this.props

    return (
      <React.Fragment>
        <Prev
          onClick={this.prev}
          onMouseOver={() => this.preload('prev')}
          {...rest}
        >
          <Icons name="RightCaret" size="1.5rem" color="gray.base" />
        </Prev>

        <Next onClick={this.next} {...rest}>
          <Icons name="RightCaret" size="1.5rem" color="gray.base" />
        </Next>
      </React.Fragment>
    )
  }
}

export default withApollo(ModalBlockLightboxNavigation)

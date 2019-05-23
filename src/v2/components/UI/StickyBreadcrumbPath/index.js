import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'

import constants from 'v2/styles/constants'

import is from 'v2/util/is'
import provideChildrenWithProps from 'v2/util/provideChildrenWithProps'

import BreadcrumbPath from 'v2/components/UI/BreadcrumbPath'

const Container = styled.div`
  display: flex;
`

const StuckBreadcrumbPath = styled(BreadcrumbPath)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${constants.headerHeight};
  z-index: ${constants.z.header};
  pointer-events: none;

  > div {
    pointer-events: auto;
    height: 100%;
    font-size: ${x => x.theme.fontSizesIndexed.base};
  }

  ${constants.media.mobile`
    display: none;
  `}
`

export default class StickyBreadcrumbPath extends PureComponent {
  static Container = Container
  static Crumb = BreadcrumbPath.Crumb

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
    stuckChildren: PropTypes.node,
  }

  static defaultProps = {
    stuckChildren: null,
  }

  constructor(props) {
    super(props)

    this.targetEl = React.createRef()
  }

  state = {
    mode: 'resting',
  }

  componentDidMount() {
    if (!is.elVisible(this.targetEl.current)) {
      this.handleLeave()
    }
  }

  handleEnter = () => {
    this.setState({ mode: 'resting' })
  }

  handleLeave = () => {
    this.setState({ mode: 'stuck' })
  }

  render() {
    const { mode } = this.state
    const { children, stuckChildren } = this.props

    return (
      <Container>
        <Waypoint onEnter={this.handleEnter} onLeave={this.handleLeave}>
          <div ref={this.targetEl}>
            <BreadcrumbPath>
              {provideChildrenWithProps(children, { mode })}
            </BreadcrumbPath>
          </div>
        </Waypoint>

        {mode === 'stuck' && (
          <StuckBreadcrumbPath>
            {provideChildrenWithProps(stuckChildren || children, { mode })}
          </StuckBreadcrumbPath>
        )}
      </Container>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class CountdownRedirect extends Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    href: PropTypes.string.isRequired,
    debug: PropTypes.bool,
  }

  static defaultProps = {
    debug: false,
  }

  constructor(props) {
    super(props)

    this.state = {
      mode: 'countdown',
      remaining: props.length,
    }
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.stop()
  }

  start() {
    this.interval = setInterval(this.tick.bind(this), 1000)
  }

  stop() {
    clearInterval(this.interval)
  }

  tick() {
    const { href, debug } = this.props

    if (this.isDone()) {
      this.stop()

      this.setState({ mode: 'redirecting' })

      if (!debug) window.location.href = href

      return
    }

    this.setState(prevState => ({
      remaining: prevState.remaining - 1,
    }))
  }

  isDone() {
    return this.state.remaining <= 1
  }

  render() {
    const { remaining, mode } = this.state

    return (
      <div>
        {
          {
            countdown: `Redirecting in ${remaining}…`,
            redirecting: 'Redirecting…',
          }[mode]
        }
      </div>
    )
  }
}

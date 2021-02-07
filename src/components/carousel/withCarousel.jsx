import React, { Component } from 'react'
import Context from './context'

const withCarousel = (WrappedComponent) =>
  // TODO remove this
  // eslint-disable-next-line react/display-name
  class extends Component {
    static contextType = Context

    render() {
      return <WrappedComponent {...this.context} {...this.props} />
    }
  }

export default withCarousel
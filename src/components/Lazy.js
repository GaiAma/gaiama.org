import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@/theme'

export default class Lazy extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props)
    this.el = null
  }
  componentDidMount() {
    this.lozad = require(`lozad`)(this.el)
    this.lozad.observe()
  }
  render() {
    const { image, ...props } = this.props

    return (
      <Box
        innerRef={el => { this.el = el }}
        data-background-image={image}
        {...props}
      >
        {this.props.children}
      </Box>
    )
  }
}

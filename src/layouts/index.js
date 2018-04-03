import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const TemplateWrapper = ({ children }) => (
  <Fragment>{children()}</Fragment>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper

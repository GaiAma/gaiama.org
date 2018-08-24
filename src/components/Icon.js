import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { colors } from '@/theme'

const Wrapper = ({
  label,
  labelPosition,
  link,
  external,
  inline,
  hover,
  children,
  ...props
}) => {
  if (hover) {
    props.css = {
      '&:hover svg': {
        color: colors.brands.facebook,
      },
    }
  }

  const linkProps = {
    target: external ? `_blank` : null,
    ...props,
  }

  const content = [children]
  label && content.push(<span>{label}</span>)

  const NonLink = inline ? `span` : `div`

  return link ? (
    <a href={link} {...linkProps}>
      {content}
    </a>
  ) : (
    <NonLink {...props}>{content}</NonLink>
  )
}
Wrapper.defaultProps = {
  label: ``,
  labelPosition: `right`,
}

const Icon = ({ name, pack, label, link, ...props }) => {
  // const _icon =
  //   <FontAwesomeIcon icon={[pack, icon]} size={size} />

  // const icon = link
  //   ? <a href={link} target="_blank">{_icon}</a>
  //   : _icon

  return (
    <Wrapper label={label}>
      <FontAwesomeIcon icon={[pack, name]} {...props} />
    </Wrapper>
  )
}

Icon.propTypes = {
  name: PropTypes.string,
  pack: PropTypes.string,
  label: PropTypes.string,
  link: PropTypes.string,
}
Icon.defaultProps = {
  pack: `fas`,
  label: ``,
  link: ``,
}

export default Icon

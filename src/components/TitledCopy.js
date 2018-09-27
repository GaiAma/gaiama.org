import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import slugify from 'slugify'
import { media } from '@/theme'
import StateProvider from '@/components/StateProvider'
import Button from '@/components/layout/Button'

const Container = styled.div(props => ({
  marginRight: `auto`,
  marginLeft: `auto`,
  textAlign: props.centered && `center`,
  [media.greaterThan(`medium`)]: {
    width: !props.full && [
      // `753px`,
      // `80ch`,
      `81%`,
    ],
  },
}))

const Title = styled.h2(props => ({
  fontSize: `2.5rem`,
  textAlign: props.centeredTitle && `center`,
}))

const ContentWrapper = styled.div(props => ({
  fontSize: `1.1rem`,
  textAlign: props.centeredCopy && `center`,
  overflow: `hidden`,
  transition: `max-height .3s`,
  maxHeight: props.spoiler && (props.spoilerOpen ? `100%` : `100px`),
}))

const TitledCopy = ({
  title,
  rank,
  paragraphs,
  centered,
  centeredTitle,
  centeredCopy,
  full,
  spoiler,
  spoilerLabel,
  state,
  setState,
  children,
  ...props
}) => {
  const content = children || paragraphs
  const slugifiedId =
    title &&
    slugify(Array.isArray(title) ? title.join(` `) : title, {
      remove: /[$*_+~.()'"!\-:@?&]/g,
    })
  const handleClick = () =>
    setState({
      spoilerOpen: !state.spoilerOpen,
    })

  const Tag = Title.withComponent(rank ? (rank > 6 ? `h6` : `h${rank}`) : `h2`)

  return (
    <Container centered={centered} full={full} {...props}>
      {title && (
        <Tag id={slugifiedId} centeredTitle={centeredTitle}>
          {Array.isArray(title)
            ? title.map((x, i) => <div key={i}>{x}</div>)
            : title}
        </Tag>
      )}

      {content && (
        <ContentWrapper
          spoiler={spoiler}
          spoilerOpen={state.spoilerOpen}
          centeredCopy={centeredCopy}
        >
          {Array.isArray(content) ? (
            content.map((x, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: x }} />
            ))
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </ContentWrapper>
      )}
      {spoiler &&
        !state.spoilerOpen && (
          <Button onClick={handleClick}>{spoilerLabel}</Button>
        )}
    </Container>
  )
}

TitledCopy.propTypes = {
  title: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  paragraphs: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  rank: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  centered: PropTypes.bool,
  centeredTitle: PropTypes.bool,
  centeredCopy: PropTypes.bool,
  full: PropTypes.bool,
  spoiler: PropTypes.bool,
  spoilerLabel: PropTypes.string,
  state: PropTypes.object,
  setState: PropTypes.func,
}

export default StateProvider(TitledCopy, { spoilerOpen: false }, {})

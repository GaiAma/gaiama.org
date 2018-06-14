import React from 'react'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { media } from '@/theme'
import StateProvider from '@/components/StateProvider'
import Button from '@/components/layout/Button'

const TitledCopy = ({
  title,
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

  return (
    <div
      css={{
        marginRight: `auto`,
        marginLeft: `auto`,
        textAlign: centered && `center`,
        [media.greaterThan(`medium`)]: {
          width: !full && [
            // `753px`,
            // `80ch`,
            `81%`,
          ],
        },
      }}
      {...props}
    >
      {title && (
        <h2
          id={slugifiedId}
          css={{
            fontSize: `2.7rem`,
            textAlign: centeredTitle && `center`,
          }}
        >
          {Array.isArray(title)
            ? title.map((x, i) => <div key={i}>{x}</div>)
            : title}
        </h2>
      )}

      {content && (
        <div
          css={{
            fontSize: `1.1rem`,
            textAlign: centeredCopy && `center`,
            overflow: `hidden`,
            transition: `max-height .3s`,
            maxHeight: spoiler && (state.spoilerOpen ? `100%` : `100px`),
          }}
        >
          {Array.isArray(content) ? (
            content.map((x, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: x }} />
            ))
          ) : (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </div>
      )}
      {spoiler &&
        !state.spoilerOpen && (
          <Button onClick={handleClick}>{spoilerLabel}</Button>
        )}
    </div>
  )
}

TitledCopy.propTypes = {
  title: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  paragraphs: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
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

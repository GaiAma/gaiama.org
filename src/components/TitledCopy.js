import React from 'react'
import PropTypes from 'prop-types'
import slugify from 'slugify'
import { breakPoints } from '@/theme'

const TitledCopy = ({
  title,
  paragraphs,
  centered,
  centeredTitle,
  centeredCopy,
  full,
  children,
  ...props
}) => {
  const content = children || paragraphs
  const slugifiedId = title && slugify(
    Array.isArray(title) ? title.join(` `) : title,
    { remove: /[$*_+~.()'"!\-:@?&]/g }
  )
  return (
    <div
      css={{
        marginRight: `auto`,
        marginLeft: `auto`,
        textAlign: centered && `center`,
        [breakPoints.minMd]: {
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
            : title
          }
        </h2>
      )}

      {content && (
        <div
          css={{
            fontSize: `1.1rem`,
            textAlign: centeredCopy && `center`,
          }}
        >
          {Array.isArray(content)
            ? content.map((x, i) => <div key={i}>{x}</div>)
            : <div dangerouslySetInnerHTML={{ __html: content }} />
          }
        </div>
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
}

export default TitledCopy

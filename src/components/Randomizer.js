/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@components/layout/Button'
import { media } from '@src/theme'

const Randomizer = ({ nextQuoteLabel, quotes, ...props }) => {
  const randomInt = Math.floor(Math.random() * Math.floor(quotes.length - 1))
  const [currentIndex, setCurrentIndex] = useState(randomInt)

  const getCurrent = () => {
    console.log(currentIndex, quotes)
    const current = quotes[currentIndex]
    return current ? current : {}
  }

  const onNextClick = event => {
    event.preventDefault()
    const nextIndex = currentIndex + 1 < quotes.length ? currentIndex + 1 : 0
    setCurrentIndex(nextIndex)
  }

  return (
    <div sx={{ textAlign: `center` }} {...props}>
      <blockquote sx={{ display: `inline-block` }}>
        <p
          sx={{
            '&:before, &:after': {
              fontSize: `1.4rem`,
              letterSpacing: `-0.2rem`,
            },
            '&:before': {
              content: `">>"`,
              marginRight: `0.2rem`,
            },
            '&:after': {
              content: `"<<"`,
              marginLeft: `0.2rem`,
            },
            fontSize: `2rem`,
            lineHeight: 1.3,
            margin: 0,
            maxWidth: `650px`,
            [media.greaterThan(`medium`)]: {
              fontSize: `2.5rem`,
            },
          }}
          dangerouslySetInnerHTML={{
            __html: getCurrent().quote,
          }}
        />

        <footer
          sx={{
            textAlign: `center`,
            fontSize: `0.85rem`,
          }}
        >
          <cite
            sx={{
              color: `gray`,
              fontStyle: `normal`,
              margin: `0 1rem`,
            }}
          >
            {getCurrent().author}
          </cite>

          {nextQuoteLabel && (
            <Button
              onClick={onNextClick}
              sx={{
                background: `transparent`,
                border: `transparent`,
                color: `gray80`,
                padding: 0,
                '&:hover': {
                  transform: `scale(1.05)`,
                },
              }}
            >
              {nextQuoteLabel}
            </Button>
          )}
        </footer>
      </blockquote>
    </div>
  )
}

Randomizer.propTypes = {
  quotes: PropTypes.array,
  nextQuoteLabel: PropTypes.string,
}

export default Randomizer

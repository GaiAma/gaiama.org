import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@/components/layout/Button'

class Randomizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: this.getRandomInt(),
    }
  }

  getCurrent = () => {
    const current = this.props.quotes[this.state.currentIndex]
    return current ? current : {}
  }

  getRandomInt = () =>
    Math.floor(Math.random() * Math.floor(this.props.quotes.length - 1))

  getNextIndex = () =>
    this.state.currentIndex + 1 < this.props.quotes.length
      ? this.state.currentIndex + 1
      : 0

  onNextClick = event => {
    event.preventDefault()
    this.setState({ currentIndex: this.getNextIndex() })
  }

  render() {
    const { nextQuoteLabel, ...props } = this.props
    const htmlProps = props
    delete htmlProps.quotes

    return (
      <div {...props}>
        <blockquote>
          <p
            css={{
              '&:before, &:after': {
                fontSize: `1.4rem`,
                letterSpacing: `-0.2rem`,
              },
              '&:before': {
                content: `">>"`,
                marginRight: `.2rem`,
              },
              '&:after': {
                content: `"<<"`,
                marginLeft: `.2rem`,
              },
            }}
            dangerouslySetInnerHTML={{
              __html: this.getCurrent().quote,
            }}
          />

          <footer>
            <cite>{this.getCurrent().author}</cite>

            {nextQuoteLabel && (
              <Button onClick={this.onNextClick}>{nextQuoteLabel}</Button>
            )}
          </footer>
        </blockquote>
      </div>
    )
  }
}

Randomizer.propTypes = {
  quotes: PropTypes.array,
  nextQuoteLabel: PropTypes.string,
}

export default Randomizer

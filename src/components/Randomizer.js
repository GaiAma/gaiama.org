import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Randomizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: this.getRandomInt(),
    }
  }

  getCurrent = () => {
    const current = this.props.quotes[
      this.state.currentIndex
    ]
    return current ? current : {}
  }

  getRandomInt = () =>
    Math.floor(Math.random() * Math.floor(this.props.quotes.length - 1))

  onNextClick = event => {
    event.preventDefault()
    this.setState({ currentIndex: this.getRandomInt() })
  }

  render() {
    return (
      <div>
        <blockquote>
          <p>{this.getCurrent().quote}</p>
          <cite
            css={{
              '&:before': {
                content: `—`,
                marginRight: `.5rem`,
              },
            }}
          >{this.getCurrent().author}</cite>
        </blockquote>

        {this.props.nextQuoteLabel && (
          <button onClick={this.onNextClick}>
            {this.props.nextQuoteLabel}
          </button>
        )}
      </div>
    )
  }
}

Randomizer.propTypes = {
  quotes: PropTypes.array,
  nextQuoteLabel: PropTypes.string,
}

export default Randomizer

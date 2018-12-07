import React from 'react'
import GatsbyImage from 'gatsby-image'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { media } from '@/theme'
import localStore from '@/utils/local-store'

const CookieWallWrapper = styled.div`
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
`
const AcceptCookiesButton = styled.div`
  && {
    background: red;
    border: none;
    font-weight: 700;
    padding: 0.4rem 1rem;
    color: #fff;
    border-radius: 3px;
  }
`
const ButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PlayIcon = styled(FontAwesomeIcon)`
  margin-right: 0.5rem;
`
const Wrapper = styled.div`
  margin: 1rem auto 0;
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  ${media.greaterThan(`medium`)} {
    width: 760px;
    padding-top: 36.25%;
  }
`
const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`

const Img = styled(GatsbyImage)`
  height: auto;
  max-width: 760px;
  margin: 0 auto;
`

class VideoPlayer extends React.Component {
  state = {
    cookiesAccepted: localStore.getItem(`cookies_accepted`, 0),
  }

  handleAcceptCookiesClick = event =>
    this.setState(
      { cookiesAccepted: true },
      localStore.setItem(`cookies_accepted`, 1)
    )

  render() {
    if (!this.props.video) return null

    if (!this.state.cookiesAccepted) {
      return this.renderCookieWall()
    }

    return this.renderVideo()
  }

  renderCookieWall = () => (
    <CookieWallWrapper
      className={this.props.className || ``}
      onClick={this.handleAcceptCookiesClick}
    >
      {this.props.thumbnail && (
        <div>
          <Img {...this.props.thumbnail} />
        </div>
      )}
      <ButtonWrapper>
        <AcceptCookiesButton>
          <PlayIcon icon={faPlay} size="lg" />
          {this.props.label}
        </AcceptCookiesButton>
      </ButtonWrapper>
    </CookieWallWrapper>
  )

  renderVideo = () => (
    <Wrapper className={this.props.className || ``}>
      <Iframe
        src={this.props.video}
        title="Video"
        frameBorder="0"
        scrolling="no"
      />
    </Wrapper>
  )
}

VideoPlayer.propTypes = {
  video: PropTypes.string,
  thumbnail: PropTypes.string,
  className: PropTypes.string,
}

export default VideoPlayer

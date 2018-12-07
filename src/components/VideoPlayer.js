import React from 'react'
import GatsbyImage from 'gatsby-image'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { media } from '@/theme'
import localStore from '@/utils/local-store'

const CookieWallWrapper = styled.div`
  position: relative;
`
const ThumbnailWrapper = styled.div`
  position: relative;
`
const ClickButton = styled.button`
  border: none;
  background: transparent;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  cursor: pointer;
`
const AcceptCookiesButton = styled.div`
  background: red;
  border: none;
  font-weight: 700;
  padding: 0.4rem 1rem;
  color: #fff;
  border-radius: 3px;
  font-size: 0.8rem;
  ${media.greaterThan(`xsmall`)} {
    font-size: 1rem;
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
const LoadingIcon = styled(FontAwesomeIcon)`
  position: absolute;
`
const Wrapper = styled.div`
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`
const IframeWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  ${media.greaterThan(`medium`)} {
    width: 760px;
    padding-top: 36.25%;
  }
`
const Img = styled(GatsbyImage)`
  height: auto;
  max-width: 760px;
  margin: 0 auto;
`

class VideoPlayer extends React.Component {
  state = {
    cookiesAccepted: 0, // localStore.getItem(`cookies_accepted`, 0),
  }

  handleAcceptCookiesClick = event =>
    this.setState(
      { cookiesAccepted: true }
      // () => localStore.setItem(`cookies_accepted`, 1)
    )

  render() {
    if (!this.props.video) return null

    if (!this.state.cookiesAccepted) {
      return this.renderCookieWall()
    }

    return this.renderVideo()
  }

  renderCookieWall = () => (
    <CookieWallWrapper className={this.props.className || ``}>
      <ThumbnailWrapper>
        <Img {...this.props.thumbnail} />
      </ThumbnailWrapper>
      <ButtonWrapper>
        <AcceptCookiesButton>
          <PlayIcon icon={faPlay} size="lg" />
          {this.props.label}
        </AcceptCookiesButton>
        <ClickButton
          onClick={this.handleAcceptCookiesClick}
          title={this.props.label}
        />
      </ButtonWrapper>
    </CookieWallWrapper>
  )

  renderVideo = () => (
    <Wrapper className={this.props.className || ``}>
      <LoadingIcon icon={faSpinner} spin size="3x" />
      <IframeWrapper>
        <Iframe
          src={this.props.video}
          title="Video"
          frameBorder="0"
          scrolling="no"
        />
      </IframeWrapper>
    </Wrapper>
  )
}

VideoPlayer.propTypes = {
  video: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default VideoPlayer

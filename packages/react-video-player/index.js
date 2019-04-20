import React from 'react'
// import GatsbyImage from 'gatsby-image/withIEPolyfill'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
// import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
// import { media } from '@src/theme'
// import localStore from '@src/utils/local-store'

/**
 * TODO: consider https://www.npmjs.com/package/react-player
 */

const ThumbnailWrapperStyles = css`
  position: absolute;
  margin: 0 auto;
  max-width: 80%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
// const ThumbnailWrapper = styled.div(ThumbnailWrapperStyles)

// const ClickButton = styled.button`
//   border: none;
//   background: transparent;
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   cursor: pointer;
// `
// const AcceptCookiesButton = styled.div`
//   background: red;
//   border: none;
//   font-weight: 700;
//   padding: 0.4rem 1rem;
//   color: #fff;
//   border-radius: 3px;
//   font-size: 0.8rem;
//   ${media.greaterThan(`xsmall`)} {
//     font-size: 1rem;
//   }
// `
// const ButtonWrapper = styled.div`
//   max-width: 80%;
//   margin: 0 auto;
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   :hover {
//     background: rgba(255, 255, 255, 0.5);
//   }
// `

// const PlayIcon = styled(FontAwesomeIcon)`
//   margin-right: 0.5rem;
// `
// const LoadingWrapper = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background: rgba(255, 255, 255, 0.2);
//   border-radius: 50%;
//   padding: 0.5rem;
// `
// const LoadingIcon = styled(FontAwesomeIcon)`
//   color: red;
// `
const Wrapper = styled.div`
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  /* display: flex;
  justify-content: center;
  align-items: center; */

  padding-top: 33.25%;
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
  /* position: relative;
  padding-top: 56.25%;
  ${media.greaterThan(`medium`)} {
    width: 760px;
    padding-top: 36.25%;
    padding-top: 56.25%;
    padding-top: 51.25%;
  } */
  ${ThumbnailWrapperStyles};
  /* https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-responsive-iframe/src/index.js
  check out https://github.com/twbs/bootstrap/blob/master/dist/css/bootstrap.css
  .21by9::before { padding-top: 42.857143%; }
  .16by9::before { padding-top: 56.25%; }
  .4by3::before { padding-top: 75%; }
  .1by1::before { padding-top: 100%; } */
  /* :before { padding-top: 36.25%; } */
  :before { padding-top: 56.25%; }
`
// const Img = styled(GatsbyImage)`
//   height: auto;
//   max-width: 760px;
//   margin: 0 auto;
// `
// const cookieNoteStyles = css`
//   background: #fff;
//   font-size: 0.8rem;
//   margin-top: 0.4rem;
//   padding: 0 0.2rem;
//   border-radius: 1px;
//   opacity: 0.4;
//   ${ButtonWrapper}:hover & {
//     opacity: 1;
//   }
// `

// const REGEX_YT_ID = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/

class VideoPlayerComponent extends React.Component {
  // state = {
  //   cookiesAccepted: localStore.getItem(`cookies:yt`, 0),
  // }

  // handleAcceptCookiesClick = event =>
  //   this.setState({ cookiesAccepted: true }, () =>
  //     localStore.setItem(`cookies:yt`, 1)
  //   )

  render() {
    if (!this.props.video) return null

    // if (!this.state.cookiesAccepted) {
    return this.renderCookieWall()
    // }

    // return this.renderVideo()
  }

  /**
   * TODO: replace by https://github.com/Zod-/jsVideoUrlParser ?
   * maybe build object for gatsby-image using all available YT thumbnail sizes
   */
  // getThumbnail = () => {
  //   if (this.props.thumbnail) {
  //     return this.props.thumbnail
  //   }

  //   if (`${this.props.video}`.includes(`youtu`)) {
  //     const match = `${this.props.video}`.match(REGEX_YT_ID)
  //     const id = match && match[7].length == 11 && match[7]
  //     return id && `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg`
  //   }
  // }

  // renderThumbnail = () => {
  //   const thumbnail = this.getThumbnail()
  //   if (!thumbnail) return null
  //   if (typeof thumbnail === `string`) {
  //     return <img src={thumbnail} />
  //   }
  //   // console.log(thumbnail)
  //   return <Img {...thumbnail} />
  // }

  renderCookieWall = () => (
    <Wrapper className={this.props.className || ``}>
      {/* <ThumbnailWrapper>{this.renderThumbnail()}</ThumbnailWrapper>
      <ButtonWrapper>
        {!this.state.cookiesAccepted ? (
          <>
            <AcceptCookiesButton>
              <PlayIcon icon={faPlay} size="lg" />
              {this.props.label && this.props.label}
            </AcceptCookiesButton>
            <ClickButton
              onClick={this.handleAcceptCookiesClick}
              title={this.props.label}
            />
            <div css={cookieNoteStyles}>
              By clicking you accept the video hosters privacy policy
            </div>
          </>
        ) : (
          <LoadingIcon icon={faSpinner} spin size="3x" />
        )}
      </ButtonWrapper>
      {this.state.cookiesAccepted ? ( */}
      <IframeWrapper>
        <Iframe
          src={this.props.video}
          title="Video"
          frameBorder="0"
          scrolling="no"
        />
      </IframeWrapper>
      {/* ) : null} */}
    </Wrapper>
  )

  // renderVideo = () => (
  //   <Wrapper className={this.props.className || ``}>
  //     {/* <ThumbnailWrapper>{this.renderThumbnail()}</ThumbnailWrapper> */}
  //   </Wrapper>
  // )
}

VideoPlayerComponent.propTypes = {
  video: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default VideoPlayerComponent
export const VideoPlayer = VideoPlayerComponent

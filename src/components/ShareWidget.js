import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { colors, media } from '@/theme'
import { faLink, faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookSquare,
  faTwitterSquare,
  faGooglePlusSquare,
  faTelegramPlane,
} from '@fortawesome/free-brands-svg-icons'
import { PureButton } from '@/components/layout/Button'
import { toast } from '@/utils/toast'

const Container = styled.div({
  [media.greaterThan(`xsmall`)]: {
    display: `flex`,
    alignItems: `center`,
    flexDirection: `column`,
  },
})
const ContainerInner = styled.div({
  display: `flex`,
  alignItems: `center`,
})

const Title = styled.h4({
  fontSize: `1.5rem`,
  margin: 0,
  marginRight: `2rem`,
  [media.lessThan(`xsmall`)]: { marginBottom: `1rem` },
})

const Button = styled(PureButton)`
  background-color: transparent;
  border: 0;
  padding: 0.4rem 0.7rem;
`

const LinkWrapper = styled.div`
  background: #fafafa;
  border: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.8rem;
`

const InvisibleInput = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
`

const LinkModal = styled.div`
  background: #fff;
  padding: 0.5rem 1rem;
  min-width: 300px;
  max-width: 99%;
  max-width: 99vw;
  width: 80%;
`

const LinkModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.55rem;
`
const LinkModalTitle = styled.h3`
  margin: 0;
`

const Label = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Checkbox = styled.input`
  margin-right: 0.5rem;
`

/**
 * TODO: improve onDubleClick
 * https://gist.github.com/MoOx/12726d85a3343d84ee3c
 * https://stackoverflow.com/questions/49187412/handle-react-ondoubleclick-and-single-onclick-for-same-element
 */
class ShareWidget extends Component {
  state = {
    linkModalOpen: false,
    showShortLink: false,
  }

  linkInputRef = React.createRef()

  getLink = () =>
    this.props.siteUrl +
    (this.state.showShortLink
      ? this.props.post.fields.slug_short
      : this.props.post.fields.url)

  onLinkModalButtonClick = ({ metaKey }) =>
    metaKey ? this.copyShortLink() : this.toggleLinkModal()

  toggleLinkModal = () =>
    this.setState({ linkModalOpen: !this.state.linkModalOpen })

  copyShortLink = () =>
    this.setState({ showShortLink: true }, this.copyToClipboard)

  toggleLink = () => this.setState({ showShortLink: !this.state.showShortLink })

  onClickLinkInput = () => this.linkInputRef.current.select()

  copyToClipboard = () => {
    try {
      // eslint-disable-next-line
      navigator.clipboard
        .writeText(this.getLink())
        .then(() => {
          // TODO: translate notifications
          toast.success(
            `Successfully copied to your clipboard, thanks for sharing`
          )
        })
        .catch(() => {
          toast.error(`I'm sorry, could't copy to your clipboard`)
        })
    } catch (error) {
      toast.warning(
        `Clipboard access not supported in your browser please right-click > copy or strg/cmd + C to copy`
      )
    }
  }

  render() {
    const { linkModalOpen } = this.state
    const { label, post, siteUrl, ...props } = this.props
    const link = siteUrl + post.fields.url
    const shortLink = siteUrl + post.fields.slug_short

    return (
      <Container {...props}>
        {label && <Title>{label}</Title>}

        <ContainerInner>
          <div
            css={{
              '& svg': { color: colors.brands.facebook, marginRight: `1rem` },
            }}
          >
            <a
              href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(
                link
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
            </a>
          </div>
          <div
            css={{
              '& svg': { color: colors.brands.twitter, margin: `0 1rem` },
            }}
          >
            <a
              href={
                post.frontmatter.tweet_id
                  ? `https://twitter.com/intent/retweet?tweet_id=${encodeURIComponent(
                      post.frontmatter.tweet_id
                    )}`
                  : `http://twitter.com/share?text=${encodeURIComponent(
                      post.frontmatter.title
                    )}&url=${encodeURIComponent(shortLink)}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitterSquare} size="lg" />
            </a>
          </div>
          <div
            css={{ '& svg': { color: colors.brands.gplus, margin: `0 1rem` } }}
          >
            <a
              href={`https://plus.google.com/share?url=${encodeURIComponent(
                link
              )}&hl=${encodeURIComponent(post.frontmatter.lang)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGooglePlusSquare} size="lg" />
            </a>
          </div>
          <div
            css={{
              '& svg': { color: colors.brands.telegram, margin: `1rem` },
            }}
          >
            <a
              href={`https://telegram.me/share/url?url=${encodeURIComponent(
                link
              )}&text=${encodeURIComponent(post.frontmatter.title)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTelegramPlane} size="lg" />
            </a>
          </div>

          <div
            css={{
              '& svg': { color: colors.link },
            }}
          >
            <Button
              onClick={this.onLinkModalButtonClick}
              onDoubleClick={this.copyShortLink}
            >
              <FontAwesomeIcon icon={faLink} size="lg" />
            </Button>
          </div>
        </ContainerInner>

        {linkModalOpen && (
          <LinkModal>
            <LinkModalHeader>
              <LinkModalTitle>Share this link</LinkModalTitle>
              <FontAwesomeIcon
                icon={faTimes}
                onClick={this.toggleLinkModal}
                size="lg"
                css={`
                  color: #ccc;
                `}
              />
            </LinkModalHeader>
            <LinkWrapper>
              <InvisibleInput
                type="text"
                value={this.state.showShortLink ? shortLink : link}
                readOnly
                onClick={this.onClickLinkInput}
                innerRef={this.linkInputRef}
              />
              <Button onClick={this.copyToClipboard}>Copy</Button>
            </LinkWrapper>
            <Label>
              <Checkbox type="checkbox" onClick={this.toggleLink} />
              <span>Get shorter version</span>
            </Label>
          </LinkModal>
        )}
      </Container>
    )
  }
}

ShareWidget.propTypes = {
  label: PropTypes.string,
  post: PropTypes.object,
  siteUrl: PropTypes.string,
}

export default ShareWidget

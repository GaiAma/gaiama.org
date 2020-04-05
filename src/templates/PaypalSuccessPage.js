/** @jsx jsx */
import { jsx, Box, Flex } from 'theme-ui'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { MDXProvider } from '@mdx-js/react'
import MainLayout from '@components/MainLayout'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  VKShareButton,
  VKIcon,
  RedditShareButton,
  RedditIcon,
  TumblrShareButton,
  TumblrIcon,
  MailruShareButton,
  MailruIcon,
  ViberShareButton,
  ViberIcon,
  PocketShareButton,
  PocketIcon,
  InstapaperIcon,
  InstapaperShareButton,
  EmailShareButton,
  EmailIcon,
} from 'react-share'

const components = {}

const PaypalSuccessPage = props => {
  const { page, Accounts, site, SiteMeta } = props.data
  const url = site.siteMetadata.siteUrl
  const { shareText } = page.frontmatter
  const { accounts } = Accounts.frontmatter
  const cover =
    site.siteMetadata.siteUrl +
    SiteMeta.frontmatter.assets.globalCover.publicURL
  const tags = [`GoodCause`, `DoGood`, `Rainforest`]

  const getAccount = name => {
    const account = accounts.find(x => x.service === name)
    return account?.handle || ``
  }

  return (
    <MainLayout {...props}>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Box
        sx={{
          mx: `auto`,
          maxWidth: `50rem`,
          '.inline-gallery': {
            maxWidth: `20rem`,
            mx: `auto`,
            '*': { borderRadius: `round` },
          },
        }}
      >
        <MDXProvider components={components}>
          <MDXRenderer>{page.body}</MDXRenderer>
        </MDXProvider>

        <Flex
          sx={{
            my: `2rem`,
            mx: `auto`,
            maxWidth: `32.5rem`,
            '> div': { mx: `0.2rem` },
          }}
        >
          <FacebookShareButton url={url} quote={shareText} hashtag="#GoodCause">
            <FacebookIcon round size={32} />
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            title={shareText}
            via={getAccount(`twitter`)}
            hashtags={tags}
          >
            <TwitterIcon round size={32} />
          </TwitterShareButton>
          <WhatsappShareButton url={url} title={shareText}>
            <WhatsappIcon round size={32} />
          </WhatsappShareButton>
          <TelegramShareButton url={url} title={shareText}>
            <TelegramIcon round size={32} />
          </TelegramShareButton>
          <PinterestShareButton url={url} media={cover}>
            <PinterestIcon round size={32} />
          </PinterestShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon round size={32} />
          </LinkedinShareButton>
          <RedditShareButton url={url} title={shareText}>
            <RedditIcon round size={32} />
          </RedditShareButton>
          <TumblrShareButton url={url} title={shareText} tags={tags}>
            <TumblrIcon round size={32} />
          </TumblrShareButton>
          <ViberShareButton url={url} title={shareText}>
            <ViberIcon round size={32} />
          </ViberShareButton>
          <VKShareButton url={url} title={shareText} image={cover}>
            <VKIcon round size={32} />
          </VKShareButton>
          <MailruShareButton url={url} title={shareText} image={cover}>
            <MailruIcon round size={32} />
          </MailruShareButton>
          <PocketShareButton url={url} title={shareText}>
            <PocketIcon round size={32} />
          </PocketShareButton>
          <InstapaperShareButton url={url} title={shareText}>
            <InstapaperIcon round size={32} />
          </InstapaperShareButton>
          <EmailShareButton url={url} body={shareText}>
            <EmailIcon round size={32} />
          </EmailShareButton>
        </Flex>
      </Box>
    </MainLayout>
  )
}
PaypalSuccessPage.propTypes = {
  data: PropTypes.shape({
    page: PropTypes.object,
    news: PropTypes.object,
  }),
}
export default PaypalSuccessPage

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: mdx(frontmatter: { slug: { eq: $slug } }) {
      ...MdxTranslations
      body
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug
        summary
        shareText
      }
    }
  }
`

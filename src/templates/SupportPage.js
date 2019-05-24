import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image/withIEPolyfill'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons/faNewspaper'
// import { faRssSquare } from '@fortawesome/free-solid-svg-icons/faRssSquare'
import { css } from '@emotion/core'
import MainLayout from '@components/MainLayout'
import { SupportWidget } from '@components/Shared'
import CheckMark from '@src/assets/check.png'
import TitledCopy from '@components/TitledCopy'
import { colors, fullPageWidth, media, fontFamilies, visible } from '../theme'

const ContributorListTitle = styled.h2`
  margin: 2rem 0 0;
`
const ContributorList = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const ContributorListLink = styled(Link)`
  margin-top: 1rem;
  display: inline-block;
  font-size: 0.85rem;
  ${media.greaterThan(`small`)} {
    font-size: 1rem;
  }
`
const Contributor = styled.div`
  width: 100%;
  flex-shrink: 0;
  max-width: 100%;
  ${media.lessThan(`small`)} {
    :nth-of-type(1n + 5) {
      display: none;
    }
  }
  ${media.greaterThan(`small`)} {
    width: 48%;
  }
  ${media.greaterThan(`medium`)} {
    width: 30%;
  }
  ${media.greaterThan(`xxlarge`)} {
    width: 24%;
  }
`

const StyledA = styled.a`
  border: none;
  :hover {
    background-color: transparent;
  }
`

const SupportPage = props => {
  const {
    page: { frontmatter },
    contributors,
  } = props.data

  const initialStyle = css`
    ${visible.maxMd};
    font-family: ${fontFamilies.accent};
    font-size: 2.9rem;
    line-height: 1;
    float: left;
    margin-right: 1rem;
  `

  const [neighbor, support] = [
    frontmatter.intro.neighbor,
    frontmatter.intro.support,
  ].map((x, i) => (
    <>
      <span css={initialStyle}>{i + 1}.</span>
      <span dangerouslySetInnerHTML={{ __html: x }} />
    </>
  ))

  return (
    <MainLayout {...props}>
      <TitledCopy
        rank="1"
        centered
        title={frontmatter.intro.title_}
        css={css`
          ${media.lessThan(`medium`)} {
            & > h2 {
              font-size: 2rem;
            }
            & > div,
            & > button {
              font-size: 0.85rem;
            }
          }
        `}
      />

      <div
        css={css`
          display: flex;
          justify-content: space-around;
          ${media.lessThan(`medium`)} {
            display: none;
          }
        `}
      >
        {[`arrow_left`, `arrow_right`].map(x => (
          <Img
            fluid={props.data.page.frontmatter.assets[x].image.fluid}
            key={x}
            css={css`
              flex: none;
              margin-bottom: 1rem;
              width: 112px;
              & img {
                object-fit: contain !important;
              }
            `}
          />
        ))}
      </div>

      <div
        css={css`
          display: flex;
          ${media.lessThan(`medium`)} {
            flex-direction: column;
          }
          ${media.greaterThan(`medium`)} {
            justify-content: space-between;
            & > div {
              width: 50%;
            }
          }
        `}
      >
        <div
          css={css`
            border: none;
            position: relative;
            ${media.lessThan(`medium`)} {
              margin-bottom: 2rem;
            }
            ${media.greaterThan(`medium`)} {
              padding-right: 3rem;
            }
            &:after {
              content: '';
              height: 1px;
              width: 100%;
              position: absolute;
              display: block;
              right: 0;
              bottom: 0;
              background: linear-gradient(
                  to right,
                  ${colors.gray4},
                  ${colors.gray8},
                  ${colors.gray4}
                )
                no-repeat;
              ${media.lessThan(`medium`)} {
                left: 0;
              }
              ${media.greaterThan(`medium`)} {
                height: 100%;
                width: 1px;
                top: 0;
                background: linear-gradient(
                    to bottom,
                    ${colors.gray4},
                    ${colors.gray8},
                    ${colors.gray4}
                  )
                  no-repeat;
              }
            }
          `}
        >
          {neighbor}
        </div>

        <div
          css={css`
            ${media.greaterThan(`medium`)} {
              padding-left: 3rem;
            }
          `}
        >
          <div>{support}</div>
        </div>
      </div>

      <div
        css={css`
          position: relative;
          margin-bottom: 3rem;
          ${fullPageWidth};
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: flex-end;
            margin-bottom: 0.5rem;
          `}
        >
          {
            <Img
              fluid={props.data.page.frontmatter.assets.parrots.image.fluid}
              css={css`
                transform: translateY(3rem);
                margin-top: -3rem;
                width: 300px;
                ${media.greaterThan(`medium`)} {
                  width: 450px;
                }
                & img {
                  margin: 0;
                }
              `}
            />
          }
        </div>

        <div
          css={css`
            background: ${colors.lightBlue};
            display: flex;
            justify-content: space-around;
            margin-bottom: 5rem;
            & > div {
              position: relative;
              z-index: 3;
              margin: 2.5rem 0;
              & > a {
                color: ${colors.black};
                ${media.lessThan(`medium`)} {
                  font-size: 0.7rem;
                }
              }
            }
          `}
        >
          {props.data.Accounts.frontmatter.accounts
            .filter(x => x.meta !== `true`)
            .map(x => (
              <div
                key={x.service}
                css={css`
                  &:hover svg {
                    color: ${x.service !== `instagram` &&
                      colors.brands[x.service]};
                  }
                  &:hover svg * {
                    fill: ${x.service === `instagram` &&
                      `url(#InstagramGradient)`};
                  }
                `}
              >
                <StyledA
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={x.description}
                >
                  <FontAwesomeIcon icon={[`fab`, x.icon]} size="3x" />
                </StyledA>
              </div>
            ))}
          <div
            css={css`
              &:hover svg {
                color: ${colors.grayTurqoise};
              }
            `}
          >
            <StyledA
              href={`${props.data.page.frontmatter.contactLink}#Newsletter`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faNewspaper} size="3x" />
            </StyledA>
          </div>
          {/* <div
            css={css`
              &:hover svg {
                color: ${colors.rss};
              }
            `}
          >
            <StyledA
              href={`/${props.pageContext.lang}/blog/rss.xml`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faRssSquare} size="3x" />
            </StyledA>
          </div> */}
        </div>
      </div>

      <TitledCopy
        centered
        title={frontmatter.getIdea.title}
        css={css`
          & > h2 {
            margin-bottom: 0.7rem;
            ${media.lessThan(`medium`)} {
              font-size: 2rem;
            }
          }
          & > div {
            font-size: 0.9rem;
            ${media.greaterThan(`medium`)} {
              font-size: 1rem;
            }
          }
        `}
      >
        {frontmatter.getIdea.subtitle}
      </TitledCopy>

      <div
        css={css`
          margin: 3rem 0 3rem;
          display: flex;
          ${media.lessThan(`small`)} {
            flex-direction: column;
            align-items: center;
            & div + div {
              margin-top: 1rem;
            }
          }
          ${media.greaterThan(`small`)} {
            justify-content: space-between;
          }
          & > div {
            position: relative;
            text-align: center;
            color: ${colors.darkWhite};
            font-size: 0.98rem;
            display: flex;
            align-items: center;
            ${media.greaterThan(`small`)} {
              width: 19%;
            }
            & > div {
              transition: transform 0.5s;
              width: 100%;
            }
            &:hover > div {
              transform: scale(1.06);
            }
          }
        `}
      >
        {frontmatter.getIdea.insights.map((x, i) => (
          <div
            key={i}
            css={css`
              user-select: none;
            `}
          >
            <div
              css={css`
                position: relative;
              `}
            >
              <Img
                fixed={x.img.image.fixed}
                css={css`
                  max-width: 100%;
                  &:after {
                    content: '';
                    background: linear-gradient(
                      to right,
                      rgba(4, 47, 55, 0.58),
                      rgba(4, 47, 55, 0.72)
                    );
                    position: absolute;
                    display: block;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                  }
                `}
              />
            </div>
            <p
              css={css`
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: 1rem;
                display: flex;
                justify-content: center;
                align-items: center;
              `}
              dangerouslySetInnerHTML={{ __html: x.descr }}
            />
          </div>
        ))}
      </div>

      <div>
        <ContributorListTitle id="contributors">
          {frontmatter.contributors.title}
        </ContributorListTitle>
        <ContributorList>
          {contributors.edges.map(x => (
            <Contributor key={x.node.item.key}>{x.node.item.name}</Contributor>
          ))}
        </ContributorList>
        <ContributorListLink to={frontmatter.contributors.link}>
          {frontmatter.contributors.linkLabel}
        </ContributorListLink>
      </div>

      <div
        css={css`
          margin-top: 4rem;
          background: ${colors.lightBlue};
          position: relative;
          padding: 2rem 1rem;
          ${fullPageWidth}
        `}
      >
        <div
          css={css`
            ${media.greaterThan(`small`)} {
              display: flex;
              justify-content: center;
            }
            & > div {
              ${media.greaterThan(`small`)} {
                width: 47%;
                /* &:first-of-type {
                  padding-right: 3rem;
                  position: relative;
                  &:after {
                    content: '';
                    height: 100%;
                    width: 1px;
                    position: absolute;
                    display: block;
                    top: 0;
                    right: 0;
                    background: linear-gradient(
                        to bottom,
                        ${colors.gray4},
                        ${colors.gray8},
                        ${colors.gray4}
                      )
                      no-repeat;
                  }
                }
                &:last-child {
                  padding-left: 3rem;
                } */
              }
            }
          `}
        >
          {[`left`].map(x => (
            <div key={x}>
              <h3
                css={css`
                  text-align: center;
                  font-size: 1.8rem;
                `}
              >
                {frontmatter.checklists[x].title}
              </h3>

              <div
                css={css`
                  margin-left: 3rem;
                  display: flex;
                  flex-direction: column;
                  align-items: space-between;
                  & > div {
                    position: relative;
                    font-size: 0.9rem;
                  }
                  & > div:not(:last-child) {
                    margin-bottom: 1.3rem;
                  }
                  & > div:before {
                    content: url(${CheckMark});
                    position: absolute;
                    left: -3rem;
                    top: 0.4rem;
                  }
                  ${media.lessThan(`small`)} {
                    & > div:last-child {
                      margin-bottom: 1.5rem;
                    }
                  }
                `}
              >
                {frontmatter.checklists[x].items.map((x, i) => (
                  <div key={i}>{x}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <TitledCopy
        centered
        title={frontmatter.outro.title}
        paragraphs={frontmatter.outro.text}
        css={css`
          margin: 5rem auto 0;
          ${media.lessThan(`medium`)} {
            & div {
              font-size: 0.9rem;
              text-align: center;
            }
          }
        `}
      />

      <SupportWidget
        title={props.data.SupportWidget.frontmatter.title}
        description={props.data.SupportWidget.frontmatter.description}
        artwork={props.data.page.frontmatter.assets.sidebarArtwork}
        paypalButton={
          props.data.SiteMeta.frontmatter.assets.paypalButton.publicURL
        }
        bankButton={props.data.SupportWidget.frontmatter.bankButton}
        bankButtonAlt={props.data.SupportWidget.frontmatter.bankButtonAlt}
        bankInfo={props.data.SupportWidget.frontmatter.bankInfo}
        bankDetails={props.data.SupportWidget.frontmatter.bankDetails}
        lang={props.pageContext.lang}
        css={css`
          margin: 3rem 0 5rem;
        `}
        artworkStyles={{
          width: `350px`,
        }}
      />
    </MainLayout>
  )
}
SupportPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.shape({
    lang: PropTypes.string.isRequired,
  }),
}
export default SupportPage

export const query = graphql`
  query($lang: String!, $slug: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts
    ...SupportWidget

    page: javascriptFrontmatter(frontmatter: { slug: { eq: $slug } }) {
      ...PageTranslations
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug
        contactLink
        summary
        assets {
          arrow_left {
            image: childImageSharp {
              fluid(maxWidth: 125, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          arrow_right {
            image: childImageSharp {
              fluid(maxWidth: 112, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          parrots {
            image: childImageSharp {
              fluid(maxWidth: 450, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          sidebarArtwork {
            image: childImageSharp {
              fluid(maxWidth: 450, quality: 75) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        intro {
          title_
          neighbor
          support
        }
        getIdea {
          title
          subtitle
          insights {
            descr
            img {
              image: childImageSharp {
                fixed(width: 202, height: 202, quality: 75) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
        contributors {
          title
          link
          linkLabel
        }
        checklists {
          left {
            title
            items
          }
          right {
            title
            items
          }
        }
        outro {
          title
          text
        }
      }
    }

    contributors: allGaiamaDonation(
      filter: { item: { anonymous: { ne: true } } }
      sort: { fields: [item___time_string], order: DESC }
      limit: 16
    ) {
      edges {
        node {
          item {
            key
            name
          }
        }
      }
    }
  }
`

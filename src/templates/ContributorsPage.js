/* global window */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Spring, animated, config } from 'react-spring/renderprops'
import MainLayout from '@components/MainLayout'
import { colors, media } from '@src/theme'

const TotalDonated = styled.h4`
  text-align: center;
`
const ContributorList = styled.div`
  margin-top: 4rem;
  ${media.greaterThan(`small`)} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`
const Contributor = styled.div`
  margin-top: 1rem;
  flex-shrink: 0;
  max-width: 100%;
  ${media.greaterThan(`small`)} {
    margin-top: 0.5rem;
    min-height: 3rem;
  }
  ${media.between(`small`, `large`)} {
    width: 48%;
    margin-top: 0;
    :nth-of-type(1n + 3) {
      margin-top: 1rem;
    }
  }
  ${media.greaterThan(`xlarge`)} {
    width: 30%;
    margin-top: 0;
    :nth-of-type(1n + 4) {
      margin-top: 1rem;
    }
  }
`
const ContributorLink = styled.a`
  display: block;
  border: none;
  padding: 0 0.5rem;
  width: 100%;

  background: ${p => (p.highlighted ? colors.primaryLite : `transparent`)};
  color: ${p => (p.highlighted ? `#fff` : colors.black)};
  transition: all 0.2s;

  :hover {
    transform: scale(1.03);
  }
`
const TotalAmount = ({ amount }) => (
  <Spring
    native
    from={{ total: 0 }}
    to={{ total: amount }}
    config={{
      ...config.molasses,
      tension: 600,
      precision: 1,
      delay: 50,
    }}
  >
    {({ total }) => (
      <animated.span
        css={css`
          width: ${(`${amount}`.length || 1) + 1}rem;
          display: inline-block;
          text-align: right;
          font-weight: 700;
        `}
      >
        {total}
        {/* {total.interpolate(n => n.toFixed(0))} */}
      </animated.span>
    )}
  </Spring>
)
TotalAmount.propTypes = {
  amount: PropTypes.number,
}

const TakeAction = ({ label, link }) => (
  <h1>
    <Link
      to={link}
      css={css`
        display: block;
        width: 100%;
        max-width: 350px;
        font-size: 1.5rem;
        padding: 0.2rem 0.4rem;
        background: #1c3c36;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        margin: 2rem auto 0;
        font-weight: 300;
        transition: all 0.1s;
        :hover {
          background: #287482;
          transform: scale(1.03);
        }
      `}
    >
      {label}
    </Link>
  </h1>
)
TakeAction.propTypes = {
  label: PropTypes.string,
  link: PropTypes.string,
}

class ContributorsPage extends React.Component {
  state = {
    items: [],
    highlighted: null,
    total: this.props.data.contributors.edges
      .reduce((acc, val) => acc + val.node.item.amount, 0)
      .toFixed(0),
  }

  componentDidMount = () => {
    if (window.location.hash) {
      this.highlightElement(window.location.hash.replace(`#`, ``))
    }
    this.props.data.contributors.edges.forEach(x =>
      window.setTimeout(
        () => this.setState({ items: [...this.state.items, x] }),
        100
      )
    )
  }

  highlightElement = key => this.setState({ highlighted: key })

  handleClick = key => () => this.highlightElement(key)

  render() {
    const { page, contributors } = this.props.data
    return (
      <MainLayout {...this.props}>
        {/* <h3>animate the total amount? maybe animate the list?</h3> */}
        <TotalDonated>
          <TotalAmount amount={this.state.total} />
          <span>
            {`${page.frontmatter.squareMeterLabel} ${
              page.frontmatter.donatedSoFarLabel
            }`}
          </span>
        </TotalDonated>

        <TakeAction
          label={page.frontmatter.takeActionLabel}
          link={page.frontmatter.takeActionLink}
        />

        {/* TODO: more stats, how many contributors have donated how many hextares from how many countries? */}

        {/* <h3>Trail</h3>
        <ContributorList>
          <Trail
            native
            items={this.state.items}
            keys={item => item.node.key}
            from={{ transform: `translate3d(0,-40px,0)` }}
            to={{ transform: `translate3d(0,0px,0)` }}
          >
            {item => props => (
              <Contributor style={props}>{item.node.name}</Contributor>
            )}
          </Trail>
        </ContributorList> */}

        {/* <h3>Transition</h3>
        <ContributorList>
          <Transition
            items={this.state.items}
            keys={item => item.node.key}
            // from={{ opacity: 0 }}
            // enter={{ opacity: 1 }}
            // leave={{ opacity: 0 }}
            // from={{ opacity: 0, transition: `opacity .25s ease` }}
            // to={{ opacity: 1, transition: `opacity .25s ease` }}
            // leave={{ opacity: 0, transition: `opacity .25s ease` }}
            from={{ transform: `translate3d(0,-40px,0)` }}
            enter={{ transform: `translate3d(0,0px,0)` }}
            leave={{ transform: `translate3d(0,-40px,0)` }}
          >
            {item => props => (
              <Contributor style={props}>{item.node.name}</Contributor>
            )}
          </Transition>
        </ContributorList> */}

        <ContributorList>
          {contributors.edges.map(({ node: { item } }, index) => (
            <Contributor key={item.key + index} id={item.key}>
              <ContributorLink
                href={`#${item.anonymous ? `anon` : item.key}`}
                highlighted={
                  this.state.highlighted === item.anonymous ? `anon` : item.key
                }
                onClick={this.handleClick(item.key)}
              >
                {page.frontmatter.thanksLabel}
                {` `}
                <strong>{item.anonymous ? `Anonymous` : item.name}</strong>
                {` `}
                {page.frontmatter.forLabel} {item.amount}
                {page.frontmatter.squareMeterLabel}
              </ContributorLink>
            </Contributor>
          ))}
        </ContributorList>

        <TakeAction
          label={page.frontmatter.takeActionLabel}
          link={page.frontmatter.takeActionLink}
        />
      </MainLayout>
    )
  }
}
ContributorsPage.propTypes = {
  data: PropTypes.object,
  pageContext: PropTypes.object,
}

export default ContributorsPage

export const query = graphql`
  query($lang: String!, $url: String!) {
    ...siteData
    ...SiteMeta
    ...languages
    ...homepage
    ...menu
    ...legal
    ...Accounts

    page: javascriptFrontmatter(fields: { url: { eq: $url } }) {
      ...PageTranslations
      fields {
        url
      }
      frontmatter {
        title
        lang
        slug

        thanksLabel
        forLabel
        squareMeterLabel
        donatedSoFarLabel

        takeActionLabel
        takeActionLink
      }
    }

    contributors: allGaiamaDonation(
      sort: { fields: [item___time_string], order: DESC }
    ) {
      edges {
        node {
          item {
            key
            name
            amount
            anonymous
          }
        }
      }
    }
  }
`

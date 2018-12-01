/* global window */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import styled from 'react-emotion'
import { Spring, animated, config } from 'react-spring'
import MainLayout from '@/components/MainLayout'
import { colors, media } from '@/theme'

const TotalDonated = styled.h4`
  text-align: center;
`
const ContributorList = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
const Contributor = styled.div`
  margin-top: 0.5rem;
  flex-shrink: 0;
  max-width: 100%;
  ${media.between(`small`, `large`)} {
    width: 48%;
    margin-top: 0;
    :nth-child(1n + 3) {
      margin-top: 2rem;
    }
  }
  ${media.greaterThan(`xlarge`)} {
    width: 30%;
    margin-top: 0;
    :nth-child(1n + 4) {
      margin-top: 2rem;
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
      <animated.strong
        css={`
          width: ${(`${amount}`.length || 1) + 1}rem;
          display: inline-block;
          text-align: right;
        `}
      >
        {total.interpolate(n => n.toFixed(0))}
      </animated.strong>
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
      css={`
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
        :hover {
          background: #287482;
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
    total: this.props.data.contributors.edges.reduce(
      (acc, val) => acc + val.node.amount,
      0
    ),
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
            {page.frontmatter.squareMeterLabel}{' '}
            {page.frontmatter.donatedSoFarLabel}
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
          {contributors.edges.map((x, index) => (
            <Contributor key={x.node.key + index} id={x.node.key}>
              <ContributorLink
                href={`#${x.node.key}`}
                highlighted={this.state.highlighted === x.node.key}
                onClick={this.handleClick(x.node.key)}
              >
                {page.frontmatter.thanksLabel} <strong>{x.node.name}</strong>
                {` `}
                {page.frontmatter.forLabel} {x.node.amount}
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

    contributors: allPayPalJson(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          key
          name
          date
          amount
        }
      }
    }
  }
`

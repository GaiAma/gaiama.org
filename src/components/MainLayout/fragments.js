import { graphql } from 'gatsby'

export const Fragments = graphql`
  fragment siteData on Query {
    site {
      siteMetadata {
        title
        siteUrl
        version
      }
    }
  }

  fragment SiteMeta on Query {
    SiteMeta: mdx(
      frontmatter: { type: { eq: "SiteMeta" }, lang: { eq: $lang } }
    ) {
      code {
        body
      }
      frontmatter {
        assets {
          logo {
            image: childImageSharp {
              fluid(
                maxWidth: 420
                quality: 75
                srcSetBreakpoints: [140, 240, 340, 840]
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          headerBg {
            image: childImageSharp {
              fluid(
                maxWidth: 1440
                quality: 75
                srcSetBreakpoints: [320, 450, 640, 900, 1280]
              ) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          paypalButton {
            publicURL
          }
          globalCover {
            publicURL
          }
        }
        skipLinks {
          toContent
          toNav
        }
        videoPlayerCookieButton
        footer {
          menuTitle
          socialTitle
          supportTitle
        }
        sponsors {
          id
          href
          title
          src {
            publicURL
          }
          alt
        }
      }
    }
  }

  fragment languages on Query {
    languages: allLanguagesAml {
      edges {
        node {
          frontmatter {
            id
            title
            titleShort
            lc
          }
        }
      }
    }
  }

  fragment Accounts on Query {
    Accounts: accountsAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        accounts {
          service
          name
          description
          handle
          url
          icon
          meta
        }
      }
    }
  }

  fragment menu on Query {
    menu: allJavascriptFrontmatter(
      filter: {
        frontmatter: { menu: { regex: "/(main|meta)/" }, lang: { eq: $lang } }
      }
      sort: { fields: [frontmatter___menuorder], order: ASC }
    ) {
      edges {
        node {
          fields {
            url
          }
          frontmatter {
            title
            titleShort
            menu
            slug
            lang
          }
        }
      }
    }
  }

  fragment homepage on Query {
    homepage: javascriptFrontmatter(
      frontmatter: { lang: { eq: $lang }, layout: { eq: "HomePage" } }
    ) {
      fields {
        url
      }
      frontmatter {
        lang
        title
        slug
        header {
          title
          subtitle
        }
      }
    }
  }

  fragment legal on Query {
    legal: allMdx(
      filter: { frontmatter: { lang: { eq: $lang }, menu: { eq: "legal" } } }
    ) {
      edges {
        node {
          fields {
            url
          }
          frontmatter {
            lang
            title
          }
        }
      }
    }
  }

  fragment PageTranslations on JavascriptFrontmatter {
    fields {
      translations {
        id
        lc
        title
        titleShort
        to
        fields {
          url
        }
        frontmatter {
          title
          lang
          slug
        }
      }
    }
  }
`

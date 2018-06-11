export const Fragments = graphql`
  fragment siteData on RootQueryType {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }

  fragment SiteMeta on RootQueryType {
    SiteMeta: siteMetaAml(frontmatter: { lang: { eq: $lang } }) {
      frontmatter {
        assets {
          logo {
            image: childImageSharp {
              sizes(maxWidth: 420, quality: 75) {
                ...GatsbyImageSharpSizes_withWebp_noBase64
              }
            }
          }
          headerBg {
            image: childImageSharp {
              sizes(maxWidth: 1280, quality: 75) {
                ...GatsbyImageSharpSizes_withWebp_noBase64
              }
            }
          }
        }
        skipLinks {
          toContent
          toNav
        }
        footer {
          menuTitle
          socialTitle
          supportTitle
          metaTitle
          meta
        }
      }
    }
  }

  fragment languages on RootQueryType {
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

  fragment Accounts on RootQueryType {
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

  fragment menu on RootQueryType {
    menu: allJavascriptFrontmatter(
      filter: {
        frontmatter: { menu: { regex: "/(main|meta)/" }, lang: { eq: $lang } }
      }
      sort: { fields: [frontmatter___menuorder], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            titleShort
            menu
            slug
            lang
            #icon
          }
        }
      }
    }
  }

  fragment homepage on RootQueryType {
    homepage: javascriptFrontmatter(
      frontmatter: { lang: { eq: $lang }, layout: { eq: "HomePage" } }
    ) {
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

  fragment legal on RootQueryType {
    legal: allJavascriptFrontmatter(
      filter: { frontmatter: { lang: { eq: $lang }, menu: { eq: "legal" } } }
    ) {
      edges {
        node {
          frontmatter {
            lang
            slug
            title
          }
        }
      }
    }
  }
`

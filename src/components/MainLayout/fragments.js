export const Fragments = graphql`
  fragment siteData on RootQueryType {
    site {
      siteMetadata {
        siteUrl
      }
    }
  }

  fragment SiteMeta on RootQueryType {
    SiteMeta: siteMetaAml (
      frontmatter: { lang: { eq: $lang } }
    ) {
      frontmatter {
        assets {
          logo {
            image: childImageSharp {
              resolutions {
                ...GatsbyImageSharpResolutions
              }
            }
          }
          headerBg {
            image: childImageSharp {
              resolutions {
                ...GatsbyImageSharpResolutions
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
    languages: allJavascriptFrontmatter (
      filter: { fileAbsolutePath: { regex: "/languages/" } }
    ) {
      edges {
        node {
          frontmatter {
            id
            title
          }
        }
      }
    }
  }

  fragment menu on RootQueryType {
    menu: allJavascriptFrontmatter (
      filter: {
        frontmatter: {
          menu: { regex: "/(main|meta)/" },
          lang: { eq: $lang }
        }
      }
      sort: { fields: [frontmatter___menuorder], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            menu
            slug
            lang
            short {
              icon
            }
          }
        }
      }
    }
  }

  fragment homepage on RootQueryType {
    homepage: javascriptFrontmatter (
      frontmatter: {lang: { eq: $lang },
      layout: { eq: "HomePage" }}
    ) {
    	frontmatter {
        lang
        title
        header {
          title
          subtitle
        }
      }
    }
  }
`

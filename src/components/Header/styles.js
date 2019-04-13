import { colors, fontFamilies, media } from '@src/theme'

/**
 *
 * switching form breakPoints to media destroyed navbar spacings -.-#
 *
 * does it work now?
 *
 */

export default {
  header: {
    position: `relative`,
    color: colors.darkWhite,
    whiteSpace: `nowrap`,
    fontWeight: 100,

    '& a': {
      color: colors.darkWhite,

      '&:hover': {
        color: colors.darkWhite,
      },
    },
    '& > .gatsby-image-wrapper': {
      position: `absolute !important`,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      overflow: `hidden`,
    },
  },

  headerTop: {
    position: `relative`,
    backgroundColor: [colors.primary, colors.primary85],
    margin: 0,
    height: `2.5rem`,

    [media.greaterThan(`large`)]: {
      height: `3.5rem`,
    },
  },

  topInner: {
    width: `96%`,
    maxWidth: `1280px`,
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    margin: `0 auto`,
    height: `100%`,
    padding: `0`,
    position: `relative`,
    // zIndex: 9,
    [media.greaterThan(`small`)]: {
      padding: `0 1rem`,
    },
  },

  headerBrand: {
    position: `relative`,
    zIndex: 2,
    '& h2': {
      fontSize: `1.1rem`,
      margin: 0,
      [media.greaterThan(`medium`)]: {
        fontSize: `1.7rem`,
      },
    },
  },

  headerMeta: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    // minWidth: `5.5rem`,
    fontSize: `.8rem`,

    [media.greaterThan(`small`)]: {
      // minWidth: `17rem`,
      fontSize: `.9rem`,
    },
  },

  headerBanner: {
    height: `7rem`,

    [media.greaterThan(`small`)]: { height: `13rem` },
    [media.greaterThan(`medium`)]: { height: `16rem` },
    [media.greaterThan(`large`)]: { height: `25rem` },

    '& .gatsby-image-wrapper': {
      zIndex: 2,
    },
  },

  headerLogo: {
    display: `block`,
    position: `relative`,
    // transform: `translateY(-1.7rem)`,
    margin: `0 auto`,
    maxWidth: `140px`,
    userSelect: `none`,

    [media.greaterThan(`small`)]: {
      maxWidth: `250px`,
      // transform: `translateY(-2.2rem)`,
    },
    [media.greaterThan(`large`)]: { maxWidth: `420px` },
  },

  headerNav: ({ bg, isSticky }) => ({
    overflow: `hidden`,
    margin: `0`,

    /* sticky stuff */
    position: isSticky && `fixed`,
    top: isSticky && 0,
    right: isSticky && 0,
    left: isSticky && 0,
    // zIndex: isSticky && 3,
    height: `2.5rem`,
    // height: isSticky ? `3rem` : `2.5rem`,
    // paddingTop: isSticky && `.5rem`,
    background: isSticky && `url(${bg}) no-repeat bottom`,
    backgroundSize: isSticky && `cover`,
    [media.greaterThan(`small`)]: {
      height: `3.5rem`,
      // height: `${isSticky ? 4 : 3.5}rem`,
      // paddingTop: isSticky && `.5rem`,
      // height: isSticky ? `4.3rem` : `3.5rem`,
      // paddingTop: isSticky && `.8rem`,
    },
    [media.greaterThan(`large`)]: {
      height: `4rem`,
      // height: isSticky ? `5rem` : `4rem`,
      // paddingTop: isSticky && `1rem`,
    },
  }),

  headerNavScroller: {
    overflowX: `auto`,
    height: `130%`,
    background: [
      colors.primary,
      colors.primary72,
      `linear-gradient(to right, ${colors.primary58}, ${colors.primary72})`,
    ],
  },

  headerNavInner: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    maxWidth: `1280px`,
    margin: `0 auto`,
    height: `77%`,
    textAlign: `right`,
    fontFamily: fontFamilies.accent,

    [media.greaterThan(`xsmall`)]: { height: `2.5rem`, width: `98%` },
    [media.greaterThan(`small`)]: { height: `3.5rem`, width: `90%` },
    [media.greaterThan(`large`)]: { height: `4rem` },
  },

  headerNavItem: {
    height: `100%`,

    span: {
      width: `100%`,
    },

    '&:last-child': {
      height: `auto`,

      a: {
        background: `#bfde2c`,
        fontWeight: `400`,
        borderRadius: `3px`,
        color: `#042f37`,
        fontSize: `1.2rem`,
        padding: `0.2rem 0.7rem`,
      },

      [media.lessThan(`small`)]: {
        position: `absolute`,
        bottom: `2.6rem`,
        right: `7px`,

        a: {
          borderRadius: `50%`,
          width: `3.3rem`,
          height: `3.3rem`,
          fontSize: `0.8rem`,
          textAlign: `center`,
          padding: `0`,
          transform: `rotate(10deg)`,
        },
      },
    },

    [media.greaterThan(`small`)]: { fontSize: `1.2rem` },
  },

  headerLink: {
    display: `block`,
    color: colors.darkWhite,
    position: `relative`,
    border: `none`,
    // zIndex: 1,

    ':hover, :active, :focus': {
      backgroundColor: `transparent`,
      color: colors.darkWhite,
      textDecoration: `none`,
    },
  },

  headerMetaItem: {
    position: `relative`,
    zIndex: 2,
    margin: `0 0.2rem`,
    padding: `0 0.4rem`,
    [media.greaterThan(`small`)]: {
      margin: `0 .75rem`,
    },
  },

  headerMeta_headerLink: {
    // WebkitFontSmoothing: `antialiased`,
    // WebkitBackfaceVisibility: `hidden`,
    // transform: `perspective(1px) translateZ(0)`,
    // transition: `transform .2s`,
    // WebkitFilter: `blur(0)`,
    '&:hover': {
      backgroundColor: `transparent`,
      transform: `scale(1.048, 1.048)`,
    },
  },

  headerNav_headerLink: {
    display: [`inline-block`, `flex`],
    alignItems: `center`,
    height: `100%`,
    padding: `0 .4rem 0`,

    ':hover, &.active': {
      background: colors.primary,
    },

    [media.greaterThan(`xsmall`)]: {
      padding: `0 .65rem 0`,
    },
    [media.greaterThan(`small`)]: {
      fontSize: `1.1rem`,
    },
    [media.greaterThan(`large`)]: {
      fontSize: `1.8rem`,
    },
  },
}

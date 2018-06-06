import hex2rgba from 'hex2rgba'
import { colors, fontFamilies, media } from '@/theme'

/**
 *
 * switching form breakPoints to media destroyed navbar spacings -.-#
 *
 * does it work now?
 *
 */

export default {
  header: ({ bg } = {}) => ({
    ...(bg && {
      background: `url(${bg}) no-repeat bottom`,
      backgroundSize: `cover`,
      backgroundColor: colors.primary,
    }),
    position: `relative`,
    color: colors.darkWhite,
    whiteSpace: `nowrap`,

    '& a': {
      color: colors.darkWhite,

      '&:hover': {
        color: colors.darkWhite,
      },
    },
  }),

  headerTop: {
    position: `relative`,
    backgroundColor: [colors.primary, hex2rgba(colors.primary, 0.85)],
    margin: 0,
    height: `2.5rem`,

    [media.greaterThan(`large`)]: {
      height: `3.5rem`,
    },
  },

  topInner: {
    width: `90%`,
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
    '& h2': {
      fontSize: `1.1rem`,
      letterSpacing: `0.1rem`,
      margin: 0,
      [media.greaterThan(`small`)]: {
        fontSize: `1.7rem`,
        letterSpacing: `0.12rem`,
      },
    },

    [media.greaterThan(`large`)]: {
      '& h2': {
        fontSize: `1.7rem`,
        letterSpacing: `0.12rem`,
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
  },

  headerLogo: {
    display: `block`,
    position: `relative`,
    transform: `translateY(-1.7rem)`,
    margin: `0 auto`,
    maxWidth: `140px`,
    userSelect: `none`,

    [media.greaterThan(`small`)]: {
      maxWidth: `250px`,
      transform: `translateY(-1.5rem)`,
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
      hex2rgba(colors.primary, 0.72),
      `linear-gradient(to right, ${hex2rgba(colors.primary, 0.58)}, ${hex2rgba(
        colors.primary,
        0.72
      )})`,
    ],
  },

  headerNavInner: {
    display: `flex`,
    alignItems: `center`,
    justifyContent: `space-between`,
    width: `90%`,
    maxWidth: `1280px`,
    margin: `0 auto`,
    height: `77%`,
    textAlign: `right`,
    fontFamily: fontFamilies.accent,

    [media.greaterThan(`xsmall`)]: { height: `2.5rem` },
    [media.greaterThan(`small`)]: { height: `3.5rem` },
    [media.greaterThan(`large`)]: { height: `4rem` },
  },

  headerNavItem: {
    height: `100%`,
    fontSize: `1.1rem`,

    [media.greaterThan(`small`)]: { fontSize: `1.2rem` },
  },

  headerLink: {
    display: `block`,
    color: colors.darkWhite,
    position: `relative`,
    // zIndex: 1,

    ':hover, :active, :focus': {
      color: colors.darkWhite,
      textDecoration: `none`,
    },
  },

  headerMetaItem: {
    margin: `0 0.2rem`,
    padding: `0 0.4rem`,
    [media.greaterThan(`small`)]: {
      margin: `0 1.5rem`,
    },
  },

  headerMeta_headerLink: {
    // WebkitFontSmoothing: `antialiased`,
    // WebkitBackfaceVisibility: `hidden`,
    // transform: `perspective(1px) translateZ(0)`,
    // transition: `transform .2s`,
    // WebkitFilter: `blur(0)`,
    '&:hover': {
      transform: `scale(1.048, 1.048)`,
    },
  },

  headerNav_headerLink: {
    display: [`inline-block`, `flex`],
    alignItems: `center`,
    height: `100%`,
    padding: `0 .6rem 0`,

    ':hover, &.active': {
      background: colors.primary,
    },

    [media.greaterThan(`small`)]: {
      fontSize: `1.1rem`,
      letterSpacing: `.12rem`,
    },
    [media.greaterThan(`large`)]: {
      fontSize: `1.8rem`,
    },
  },
}

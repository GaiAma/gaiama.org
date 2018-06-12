import React from 'react'
import glamorous from 'glamorous'
import propStyles from 'prop-styles'
// import hex2rgba from 'hex2rgba'
import {
  fontSize,
  // flex,
  flexDirection,
  alignItems,
  justifyContent,
  space,
  textAlign,
  width,
} from 'styled-system'

export const colors = {
  primary: `#042f37`,
  primaryLite: `#287482`,
  darkWhite: `#e2e2e2`,
  lightBlue: `#f3f8fd`,
  // lightBlue: `#f1f4f8`,
  link: `#0e91a0`,
  // linkHover: `#0fc1d6`,
  linkHover: `#0a474e`,
  // link: `#13abaa`,
  // linkHover: `#1ed6d5`,
  gray: `#afafaf`,
  grayTurqoise: `#7aaaaf`,
  black: `#222`,
  oldWhite: `#e0e2c5`,
  rss: `#faa949`,
  success: `#74d27e`,
  failure: `#d27474`,
  brands: {
    facebook: `#4466b3`,
    twitter: `#1ca1f3`,
    telegram: `#1d95d3`,
    gplus: `#dc4436`,
    youtube: `#fd1402`,
    github: `#000`,
  },
}

export const gradients = {
  primary: `linear-gradient(to right, rgba(4,47,55,0.58), rgba(4,47,55,0.72))`,
}

export const screenReaderOnly = {
  position: `absolute`,
  width: `1px`,
  height: `1px`,
  padding: `0`,
  overflow: `hidden`,
  clip: `rect(0, 0, 0, 0)`,
  whiteSpace: `nowrap`,
  border: `0`,
}

export const screenReaderOnlyFocusable = {
  '&:active, &:focus': {
    position: `static`,
    width: `auto`,
    height: `auto`,
    overflow: `visible`,
    clip: `auto`,
    whiteSpace: `normal`,
  },
}

export const screenReaderAndFocusable = {
  ...screenReaderOnly,
  ...screenReaderOnlyFocusable,
}

export const focusOutlineNone = {
  '&:focus': {
    outline: `none`,
  },
}

// svg gradient from https://stackoverflow.com/a/47801536/3484824
// hide svg definitions from https://stackoverflow.com/a/24820654/3484824
export const InstagramGradient = props => (
  <div
    css={{
      height: `0`,
      width: `0`,
      position: `absolute`,
      visibility: `hidden`,
    }}
  >
    <svg width="0" height="0">
      <radialGradient id="InstagramGradient" r="150%" cx="30%" cy="107%">
        <stop stopColor="#fdf497" offset="0" />
        <stop stopColor="#fdf497" offset="0.05" />
        <stop stopColor="#fd5949" offset="0.45" />
        <stop stopColor="#d6249f" offset="0.6" />
        <stop stopColor="#285AEB" offset="0.9" />
      </radialGradient>
    </svg>
  </div>
)

// export const breakPoints = {
//   maxSm: `@media (max-width: 425px)`,
//   maxMd: `@media (max-width: 768px)`,
//   minSm: `@media (min-width: 425px)`,
//   minMd: `@media (min-width: 768px)`,
//   minMdLandscape: `@media (min-width: 850px)`,
//   minLg: `@media (min-width: 992px)`,
//   minLgLandscape: `@media (min-width: 1024px)`,
//   minXl: `@media (min-width: 1200px)`,
//   maxXxl: `@media (max-width: 1280px)`,
//   minXxl: `@media (min-width: 1281px)`,
// }

export const SIZES = {
  xsmall: { min: 425, max: 768 },
  small: { min: 769, max: 850 },
  medium: { min: 851, max: 992 },
  large: { min: 993, max: 1024 },
  xlarge: { min: 1025, max: 1200 },
  xxlarge: { min: 1021, max: 1280 },
  xxxlarge: { min: 1281, max: Infinity },
  // xsmall: { min: 0, max: 599 },
  // small: { min: 600, max: 779 },
  // medium: { min: 780, max: 979 },
  // large: { min: 980, max: 1281 },
  // xlarge: { min: 1282, max: 1339 },
  // xxlarge: { min: 1340, max: 1440 },
  // xxxlarge: { min: 1441, max: Infinity },

  // Sidebar/nav related tweakpoints
  largerSidebar: { min: 1100, max: 1339 },
  sidebarFixed: { min: 2000, max: Infinity },
}

export const media = {
  between(smallKey, largeKey, excludeLarge = false) {
    if (excludeLarge) {
      return `@media (min-width: ${
        SIZES[smallKey].min
      }px) and (max-width: ${SIZES[largeKey].min - 1}px)`
    } else {
      if (SIZES[largeKey].max === Infinity) {
        return `@media (min-width: ${SIZES[smallKey].min}px)`
      } else {
        return `@media (min-width: ${SIZES[smallKey].min}px) and (max-width: ${
          SIZES[largeKey].max
        }px)`
      }
    }
  },

  greaterThan(key) {
    return `@media (min-width: ${SIZES[key].min}px)`
  },

  lessThan(key) {
    return `@media (max-width: ${SIZES[key].min - 1}px)`
  },

  size(key) {
    const size = SIZES[key]

    if (size.min == null) {
      return media.lessThan(key)
    } else if (size.max == null) {
      return media.greaterThan(key)
    } else {
      return media.between(key, key)
    }
  },
}

export const maxWidthLayout = {
  maxWidth: `1440px`,
}

export const maxWidthContent = {
  width: `90%`,
  maxWidth: `1280px`,
  marginRight: `auto`,
  marginLeft: `auto`,
}

export const fullPageWidth = {
  position: `relative`,
  [media.lessThan(`xxxlarge`)]: {
    width: `100vw`,
    left: `50%`,
    transform: `translateX(-50vw)`,
  },
  [media.greaterThan(`xxxlarge`)]: {
    left: `50%`,
    transform: `translateX(-720px)`,
    width: `1440px`,
  },
}

const fallbackFont = [
  `-apple-system`,
  `BlinkMacSystemFont`,
  `Segoe UI`,
  `Helvetica`,
  `Arial`,
  `sans-serif`,
  `Apple Color Emoji`,
  `Segoe UI Emoji`,
  `Segoe UI Symbol`,
]

export const fontFamilies = {
  main: [`Quicksand`].concat(fallbackFont).join(`,`),
  accent: [`Amatic SC`].concat(fallbackFont).join(`,`),
}

// export const fonts = {
//   header: {
//     fontSize: 60,
//     lineHeight: `65px`,
//     fontWeight: 700,

//     [media.lessThan(`medium`)]: {
//       fontSize: 40,
//       lineHeight: `45px`,
//     },
//   },
//   small: {
//     fontSize: 14,
//   },
// }

export const headlineStyles = {
  fontFamily: fontFamilies.accent,
  fontWeight: `100`,
  letterSpacing: `.09rem`,
}

export const hugeFont = {
  fontSize: `1.5rem`,

  [media.greaterThan(`medium`)]: {
    fontSize: `2.5rem`,
  },
}

export const headlineVariations = propStyles({
  simple: () => ({ fontFamily: `sans-serif` }),
})

export const H1 = glamorous.h1(
  headlineStyles,
  hugeFont,
  headlineVariations,
  fontSize,
  space,
  textAlign,
  width
)
export const H2 = glamorous.h2(
  headlineStyles,
  hugeFont,
  headlineVariations,
  fontSize,
  space,
  textAlign,
  width
)
export const H3 = glamorous.h3(
  headlineStyles,
  headlineVariations,
  fontSize,
  space,
  textAlign,
  width
)
export const H4 = glamorous.h4(
  headlineStyles,
  headlineVariations,
  fontSize,
  space,
  textAlign,
  width
)

export const Container = glamorous.div(
  propStyles({
    flex: () => ({ display: `flex` }),
  }),
  alignItems,
  justifyContent,
  flexDirection,
  space,
  width
)

export const Box = glamorous.div(
  propStyles({
    flex: () => ({
      display: `flex`,
    }),
    spaceAround: () => ({ justifyContent: `space-around` }),
    spaceBetween: () => ({
      justifyContent: `space-between`,
    }),
    center: () => ({ justifyContent: `center` }),
    aICenter: () => ({ alignItems: `center` }),
    wrap: () => ({ flexWrap: `wrap` }),
    row: () => ({ flexDirection: `row` }),
    column: () => ({ flexDirection: `column` }),
    // responsive
    oh: () => ({ overflow: `hidden` }),
    glass: () => ({
      background: `#fff`,
      padding: `1rem`,
      boxShadow: `2px 2px 9px 1px rgba(0,0,0,0.50),
      inset 0 0 21px 0 rgba(0,0,0,0.50)`,
    }),
  }),
  alignItems,
  justifyContent,
  flexDirection,
  space,
  width
)

export const Button = glamorous.button(
  {
    border: `1px solid #b0b0b0`,
    background: [`#e3e3e3`, `linear-gradient(to bottom, #e3e3e3, #f8f8fb)`],
  },
  space,
  width
)

// export const Text = glamorous.span(
//   propStyles({
//     faded: ({ theme }) => ({ ^: theme.colors.faded }),
//     fadedExtra: ({ theme }) => ({ color: theme.colors.fadedExtra }),
//     superheading: [heading, largerHeading, { fontSize: 36 }],
//     heading: [heading, largerHeading, { fontSize: 30 }],
//     subheading: [heading, largerHeading, { fontSize: 24 }],
//     superstandard: [heading, smallerHeading, { fontSize: 18 }],
//     standard: [heading, smallerHeading, { fontSize: 14 }],
//     substandard: [heading, smallerHeading, { fontSize: 12 }]
//   })
// )

/* visibility helper */
export const visible = {
  maxSm: {
    [media.greaterThan(`small`)]: {
      display: `none`,
    },
  },
  maxMd: {
    [media.greaterThan(`medium`)]: {
      display: `none`,
    },
  },
  minSm: {
    [media.lessThan(`small`)]: {
      display: `none`,
    },
  },
  minMd: {
    [media.lessThan(`medium`)]: {
      display: `none`,
    },
  },
}

export default {
  colors,
  fontFamilies,
  // fonts,
  H1,
  H2,
  H3,
  H4,
  Container,
  Box,
  Button,
  visible,
}

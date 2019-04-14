/**
 * Build reusable React components that can be styled with css, css modules, inline styles & many css-in-js libs
 * https://github.com/jfschwarz/substyle
 *
 * maybe https://wiredjs.com/ ? "hand" drawn components?
 * maybe https://github.com/bradlc/babel-plugin-tailwind-components ?
 */
import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import propStyles from 'prop-styles'
import preval from 'babel-plugin-preval/macro'

export const colors = preval`
  const h2a = require('hex2rgba')
  const primary = '#042f37'
  const primaryLite = '#287482'
  module.exports = {
    transparent: 'transparent',
    primary,
    primaryLite,
    primary58: h2a(primary, 0.58),
    primary72: h2a(primary, 0.72),
    primary85: h2a(primary, 0.85),
    white: '#fff',
    darkWhite: '#e2e2e2',
    creme: '#fafafa',
    lightBlue: '#f3f8fd',
    // lightBlue: '#f1f4f8',
    link: primaryLite, // axe '#0A616C', // before Lighthouse: '#0e91a0', 
    // linkHover: '#0fc1d6',
    linkHover: '#0a474e',
    // link: '#13abaa',
    // linkHover: '#1ed6d5',
    gray: '#afafaf',
    gray2: '#a7a7a7',
    gray3: '#ccc',
    gray4: 'rgba(204,204,204,0.13)',
    gray5: '#ececec',
    gray6: '#979797',
    gray7: '#999',
    gray8: '#abaaaa',
    gray9: '#6d6d6d',
    grayTurqoise: '#7aaaaf',
    turqoiseLight: '#a4fcfb',
    black: '#222',
    gray52: 'rgba(0,0,0,0.52)',
    gray80: 'rgba(0,0,0,0.8)',
    wine: '#9e2146',
    oldWhite: '#e0e2c5',
    blueLight: '#85bfff',
    purple: '#424770',
    purpleDark: '#2d2a34',
    grayBlue: '#aab7c4',
    rss: '#faa949',
    success: '#74d27e',
    failure: '#d27474',
    yellow: '#ff0',
    brands: {
      facebook: '#4466b3',
      twitter: '#1ca1f3',
      gplus: '#dc4436',
      youtube: '#fd1402',
      github: '#24292e',
      steemit: '#06d6a9',
    },
  }
`

export const gradients = {
  primary: `linear-gradient(to right, rgba(4,47,55,0.58), rgba(4,47,55,0.72))`,
}

export const ignoreInPrint = css`
  @media print {
    display: none;
    visibility: hidden;
  }
`

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
    css={css`
      height: 0;
      width: 0;
      position: absolute;
      visibility: hidden;
    `}
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
  xxsmall: { min: 375, max: 424 },
  xsmall: { min: 425, max: 768 },
  small: { min: 769, max: 850 },
  medium: { min: 851, max: 992 },
  large: { min: 993, max: 1024 },
  xlarge: { min: 1025, max: 1200 },
  xxlarge: { min: 1201, max: 1290 },
  xxxlarge: { min: 1291, max: Infinity },
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
  `system-ui`,
  `-apple-system`,
  `BlinkMacSystemFont`,
  `Segoe UI`,
  `Roboto`,
  // `Helvetica Neue`,
  `Helvetica`,
  // `Arial`,
  `sans-serif`,
  `Apple Color Emoji`,
  `Segoe UI Emoji`,
  `Segoe UI Symbol`,
]

export const fontFamilies = {
  // main: [`Quicksand`].concat(fallbackFont).join(`,`),
  main: fallbackFont.join(`,`),
  // accent: [`Amatic SC`].concat(fallbackFont).join(`,`),
  accent: fallbackFont.join(`,`),
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

export const Box = styled.div(
  propStyles({
    flex: () => ({
      display: `flex`,
    }),
    spaceAround: () => ({ justifyContent: `space-around` }),
    spaceBetween: () => ({
      justifyContent: `space-between`,
    }),
    jcenter: () => ({ justifyContent: `center` }),
    aICenter: () => ({ alignItems: `center` }),
    fwrap: () => ({ flexWrap: `wrap` }),
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
  })
)

// export const Text = styled.span(
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

const gray80 = `rgba(0,0,0,0.8)`
const lightBlue = `#f3f8fd`
const gray52 = `rgba(0,0,0,0.52)`

export default {
  // TODO: needed?
  useCustomProperties: false,

  initialColorModeName: `light`,
  initialColorMode: `light`,
  // useColorSchemeMediaQuery: true,

  colors: {
    text: gray80,
    background: `#fff`,
    background2: lightBlue,
    cta: `#bfde2c`,

    // legacy palette
    primary: `#042f37`,
    primaryLite: `#287482`,
    primary58: `rgba(4,47,55,0.58)`,
    primary72: `rgba(4,47,55,0.72)`,
    primary85: `rgba(4,47,55,0.85)`,
    white: `#fff`,
    darkWhite: `#e2e2e2`,
    creme: `#fafafa`,
    lightBlue,
    link: `#287482`,
    linkHover: `#0a474e`,
    gray: `#afafaf`,
    gray2: `#a7a7a7`,
    gray3: `#ccc`,
    gray4: `rgba(204,204,204,0.13)`,
    gray5: `#ececec`,
    gray6: `#979797`,
    gray7: `#999`,
    gray8: `#abaaaa`,
    gray9: `#6d6d6d`,
    grayTurqoise: `#7aaaaf`,
    turqoiseLight: `#a4fcfb`,
    black: `#222`,
    gray52,
    gray80,
    wine: `#9e2146`,
    oldWhite: `#e0e2c5`,
    blueLight: `#85bfff`,
    purple: `#424770`,
    purpleDark: `#2d2a34`,
    grayBlue: `#aab7c4`,
    rss: `#faa949`,
    success: `#74d27e`,
    failure: `#d27474`,
    yellow: `#ff0`,
    brands: {
      facebook: `#4466b3`,
      twitter: `#1ca1f3`,
      gplus: `#dc4436`,
      youtube: `#fd1402`,
      github: `#24292e`,
      steemit: `#06d6a9`,
    },

    modes: {
      dark: {
        text: `rgba(255, 255, 255, 0.7)`,
        background: `#001519`,
        background2: `#000506`,

        lightBlue: `#155063`,
        black: `#c3c3c3`,
        white: `rgba(255, 255, 255, 0.7)`,
        darkWhite: `#b3b9ba`,
        gray52: `#000`,
        gray80: `rgba(255, 255, 255, 0.8)`,
        grayTurqoise: `#416367`,
      },
    },
  },

  fonts: {
    body: `"system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    accent: `"system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },

  text: {
    caps: {
      textTransform: `uppercase`,
      letterSpacing: `0.2em`,
    },
    heading: {
      fontFamily: `body`,
      fontWeight: `body`,
      lineHeight: `body`,
    },
  },

  radii: {
    none: 0,
    sm: `0.2rem`,
    md: `0.4rem`,
    lg: `0.6rem`,
    round: `50%`,
  },

  shadows: {},
}

import Typography from 'typography'
import { colors, fontFamilies } from '@/theme'

export default new Typography({
  baseFontSize: `16px`,
  scaleRatio: 2.5,
  baseLineHeight: `1.55`,
  bodyFontFamily: fontFamilies.main.split(`,`),
  bodyWeight: `100`,
  headerFontFamily: fontFamilies.accent.split(`,`),
  headerWeight: `400`,
  overrideStyles: () => ({
    '*, *::before, *::after': {
      boxSizing: `border-box`,
    },
    html: {
      WebkitTextSizeAdjust: `100%`,
      MsTextSizeAdjust: `100%`,
      MsOverflowStyle: `scrollbar`,
      WebkitTapHighlightColor: `transparent`,
    },
    'h1, h2, h3, h4, h5, h6': { letterSpacing: `.03rem` },
    h1: { fontSize: `2.2rem` },
    h2: { fontSize: `2rem` },
    h3: { fontSize: `1.8rem` },
    h4: { fontSize: `1.6rem` },
    h5: { fontSize: `1.4rem` },
    h6: { fontSize: `1.2rem` },
    a: {
      color: colors.link,
      textDecoration: `none`,
    },
    'a:hover': {
      color: colors.linkHover,
      textDecoration: `none`,
    },
  }),
})

import Typography from 'typography'
import {
  colors,
  fontFamilies
} from '@/theme'

export default new Typography({
  baseFontSize: `16px`,
  scaleRatio: 2.5,
  baseLineHeight: `1.55`,
  blockMarginBottom: 1,
  bodyFontFamily: fontFamilies.main.split(','),
  bodyGray: `20`,
  bodyGrayHue: 0,
  bodyWeight: `100`,
  boldWeight: 700,
  headerFontFamily: fontFamilies.accent.split(','),
  headerGray: 20,
  headerGrayHue: 0,
  headerWeight: `400`,
  googleFonts: [
    // {
    //   name: `Cutive`,
    //   styles: [ `400` ],
    // }
    // {
    //   name: `Amatic SC`,
    //   styles: [ `700` ],
    // },
    // {
    //   name: `Quicksand`,
    //   styles: [
    //     `700`,
    //     `700i`,
    //     `400`,
    //     `400i`,
    //   ]
    // }
  ],
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },

    html: {
      lineHeight: '1.15',
      WebkitTextSizeAdjust: '100%',
      MsTextSizeAdjust: '100%',
      MsOverflowStyle: 'scrollbar',
      WebkitTapHighlightColor: 'transparent',
    },

    body: {
      margin: '0',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      textAlign: 'left',
      backgroundColor: '#fff',
    },

    a: {
      color: colors.link,
      textDecoration: `none`,
    },
    
    'a:hover': {
      color: colors.linkHover,
      textDecoration: `none`,
    },
  })
})

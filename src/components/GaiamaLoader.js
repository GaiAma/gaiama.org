import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const Path = styled.path`
  transform: rotateZ(360deg);
  will-change: opacity;
`
const outerAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})
const diamondAnimation = keyframes({
  '0%': { opacity: 0 },
  '33%': { opacity: 0 },
  '100%': { opacity: 1 },
})
const innerAnimation = keyframes({
  '0%': { opacity: 0 },
  '55%': { opacity: 0 },
  '100%': { opacity: 1 },
})
const Diamond = styled(Path)`
  animation: 1.1s linear 0s infinite alternate both running ${diamondAnimation};
`
const OuterRing = styled(Path)`
  animation: 1.1s linear 0s infinite alternate both running ${outerAnimation};
`
const InnerRing = styled(Path)`
  animation: 1.1s linear 0s infinite alternate both running ${innerAnimation};
`

export const GaiamaLoader = props => (
  <svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gradient1">
        <stop stopColor="#FFFFFF" offset="0%" />
        <stop stopColor="#022925" offset="100%" />
      </linearGradient>
      <linearGradient x1="50%" y1="-7.08%" x2="50%" y2="100%" id="gradient2">
        <stop stopColor="#FFFFFF" offset="0%" />
        <stop stopColor="#022925" offset="100%" />
      </linearGradient>
    </defs>
    <g>
      <Diamond
        d="M159.229357,9.57308247 L247.654451,176.821304 L160.229357,306.265187 L71.681891,176.821304 L159.229357,9.57308247 Z M79.8343847,176.340932 L160.192433,293.813042 L239.504104,176.382106 L159.260254,24.607982 L79.8343847,176.340932 Z"
        fill="url(#gradient1)"
      />
      <OuterRing
        d="M159.5,319 C71.4105824,319 0,247.589418 0,159.5 C0,71.4105824 71.4105824,0 159.5,0 C247.589418,0 319,71.4105824 319,159.5 C319,247.589418 247.589418,319 159.5,319 Z M159.5,301 C237.648292,301 301,237.648292 301,159.5 C301,81.3517079 237.648292,18 159.5,18 C81.3517079,18 18,81.3517079 18,159.5 C18,237.648292 81.3517079,301 159.5,301 Z"
        fill="url(#gradient1)"
      />
      <InnerRing
        d="M160,192.5 C119.407071,192.5 86.5,159.592929 86.5,119 C86.5,78.4070709 119.407071,45.5 160,45.5 C200.592929,45.5 233.5,78.4070709 233.5,119 C233.5,159.592929 200.592929,192.5 160,192.5 Z M160,187.5 C197.831505,187.5 228.5,156.831505 228.5,119 C228.5,81.1684946 197.831505,50.5 160,50.5 C122.168495,50.5 91.5,81.1684946 91.5,119 C91.5,156.831505 122.168495,187.5 160,187.5 Z"
        fill="url(#gradient2)"
      />
    </g>
  </svg>
)

export default GaiamaLoader

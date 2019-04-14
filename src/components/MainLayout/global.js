import preval from 'babel-plugin-preval/macro'
const { homepage } = preval`
  const { homepage } = require('../../../package.json')
  module.exports = { homepage }
`
import { colors, media } from '@src/theme'
// TODO: https://github.com/sindresorhus/modern-normalize ?
/**
 * work in progress
 *
 * inspired by:
 * - https://github.com/erquhart/reboot.css/blob/master/src/reboot.css
 */

// TODO: add PR to gatsby-remark-autolink-headers to disable floating
// https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-remark-autolink-headers/src/gatsby-ssr.js#L10
export const globalStyles = `
  /**
   * Debugger
   * from https://medium.freecodecamp.org/heres-my-favorite-weird-trick-to-debug-css-88529aa5a6a3
   */
  // *:not(path):not(g),
  .debug *:not(path):not(g) {
    color:                    hsla(210, 100%, 100%, 0.9) !important;
    background:               hsla(210, 100%,  50%, 0.5) !important;
    outline:    solid 0.25rem hsla(210, 100%, 100%, 0.5) !important;
    box-shadow: none !important;
  }

  /** *:focus,
  *:focus + svg,
  *:focus + svg * {
    stroke: red;
    outline: 1px solid red;
    border: 1px solid red;
  } */

  .anchor {
    float: none;
  }

  #nprogress .bar {
    height: 5px !important;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font: 105%/1.6 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
      'Roboto', 'Helvetica', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';

    box-sizing: border-box;
    overflow-y: scroll;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  body {
    color: ${colors.gray80};
    font-family: 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI',
      'Roboto', 'Helvetica', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    font-weight: 400;
    word-wrap: break-word;
    font-kerning: normal;
    font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    margin: 0;
    ${media.greaterThan(`small`)} {
      font-weight: 100;
    }
  }

  /**
   * Shim for "new" HTML5 structural elements to display correctly (IE10, older browsers)
   */
  article, aside, details, figcaption, figure, footer, header, main, menu, nav, section, summary {
    display: block;
  }

  /**
   * Suppress the focus outline on elements that cannot be accessed via keyboard.
   * This prevents an unwanted focus outline from appearing around elements that
   * might still respond to pointer events.
   *
   * Credit: https://github.com/suitcss/base
   */
  [tabindex="-1"]:focus {
    outline: 0 !important;
  }

  audio, canvas, progress, video {
    display: inline-block;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  progress {
    vertical-align: baseline;
  }

  [hidden],
  template {
    display: none;
  }

  a {
    text-decoration: none;
    transition: all 0.3s ease;
    color: ${colors.gray80};
    border-bottom: 2px solid ${colors.primaryLite};
  }

  a:active,
  a:hover {
    background-color: ${colors.primaryLite};
    color: #ffffff;
  }

  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  b, strong {
    font-weight: inherit;
    font-weight: bolder;
  }

  dfn {
    font-style: italic;
  }

  mark {
    background-color: ${colors.yellow};
  }

  small {
    font-size: 80%;
  }

  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  code, kbd, pre, samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  figure {
    margin: 1em 40px;
  }

  /**
   * Content grouping
   * 1. Add the correct box sizing in Firefox.
   * 2. Show the overflow in Edge and IE.
   */
  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  button, input, optgroup, select, textarea {
    font: inherit;
    margin: 0;
  }

  optgroup {
    font-weight: 700;
  }

  button, input {
    overflow: visible;
  }

  button, select {
    text-transform: none;
  }

  /** [type='reset'],
  [type='submit'],
  button,
  html [type='button'] {
    -webkit-appearance: button;
  } */

  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner,
  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring,
  button:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  fieldset {
    border: 1px solid silver;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
  }

  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  textarea {
    overflow: auto;
  }

  input, textarea {
    line-height: 1.5rem;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  img {
    border-style: none;
    max-width: 100%;
    padding: 0;
    margin: 0 0 1.55rem;
  }

  h1, h2, h3, h4, h5, h6 {
    padding: 0;
    margin: 0 0 1.55rem;
    color: inherit;
    font-family: "system-ui", -apple-system, "BlinkMacSystemFont", "Segoe UI",
      "Roboto", "Helvetica", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
      "Segoe UI Symbol";
    font-weight: 100;
    text-rendering: optimizeLegibility;
    line-height: 1.1;
  }
  h1 { font-size: 2.2rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.8rem; }
  h4 { font-size: 1.6rem; }
  h5 { font-size: 1.4rem; }
  h6 { font-size: 1.2rem; }

  hgroup {
    padding: 0;
    margin: 0 0 1.55rem;
  }

  ul, ol {
    margin: 1.55rem 0 0 1.55rem;
    padding: 0;
    list-style-position: outside;
    list-style-image: none;
  }

  ul:first-of-type,
  ol:first-of-type {
    margin-top: 0;
  }

  dl, dd, p, figure {
    padding: 0;
    margin: 0 0 1.55rem;
  }

  pre {
    padding: 0;
    margin: 0 0 1.55rem;
    font-size: 0.85rem;
    line-height: 1.55rem;
  }

  table {
    padding: 0;
    margin: 0 0 1.55rem;
    font-size: 1rem;
    line-height: 1.55rem;
    border-collapse: collapse;
    width: 100%;
  }

  fieldset {
    padding: 0;
    margin: 0 0 1.55rem;
  }

  blockquote {
    margin: 0 1.55rem 1.55rem;
    padding: 0;
  }

  form, noscript, iframe, address {
    padding: 0;
    margin: 0 0 1.55rem;
  }

  hr {
    padding: 0;
    margin: 0 0 calc(1.55rem - 1px);
    background: hsla(0, 0%, 0%, 0.2);
    border: none;
    height: 1px;
  }

  b, strong, dt, th {
    font-weight: bold;
  }

  li + li {
    margin-top: calc(1.55rem / 2);
  }

  ol li,
  ul li {
    padding-left: 0;
  }

  li > ul,
  li > ol {
    margin-left: 1.55rem;
    margin-bottom: calc(1.55rem / 2);
    margin-top: calc(1.55rem / 2);
  }

  blockquote *:last-child,
  li *:last-child,
  p *:last-child {
    margin-bottom: 0;
  }

  li > p {
    margin-bottom: calc(1.55rem / 2);
  }

  code, kbd, samp {
    font-size: 0.85rem;
    line-height: 1.55rem;
  }

  abbr, acronym {
    border-bottom: 1px dotted hsla(0, 0%, 0%, 0.5);
    cursor: help;
  }

  abbr[title] {
    text-decoration: none;
  }

  thead {
    text-align: left;
  }

  td, th {
    text-align: left;
    border-bottom: 1px solid hsla(0, 0%, 0%, 0.12);
    font-feature-settings: 'tnum';
    padding-left: 1.03333rem;
    padding-right: 1.03333rem;
    padding-top: 0.775rem;
    padding-bottom: calc(0.775rem - 1px);
  }

  th:first-of-type,
  td:first-of-type {
    padding-left: 0;
  }

  th:last-child,
  td:last-child {
    padding-right: 0;
  }

  @media print {
    body {
      margin-bottom: 0;

      box-shadow: none;
      -moz-box-shadow: none;
      -webkit-box-shadow: none;
    }

    h1 {
        margin-top: 0;
    }

    header,
    footer {
      display: none;
      visibility: hidden;
    }

    img {
      display: block;
      page-break-before: always;
      page-break-inside: avoid;
    }

    span.gatsby-resp-image-wrapper {
      position: static;
      display: inline;
      margin-left: auto;
      margin-right: auto;
      flex: none;
      max-width: 60%;

      img {
        width: auto;
        height: auto;
        max-with: 60%;
        margin: 0px auto;
        vertical-align: unset;
        position: static;
        box-shadow: none;
      }
    }

    .postBody a {
      border: none;
    }
    .postBody a:link:after, .postBody a:visited:after {
      content: " (" attr(href) ") ";
      font-size: 90%;
    }
    .postBody a[href^="/"]:after {
      content: " (${homepage}" attr(href) ") ";
    }
  }
`

import fontawesome from '@fortawesome/fontawesome'

import { faEnvelope } from '@fortawesome/fontawesome-free-regular/shakable'

import {
  faFacebookSquare,
  faInstagram,
  faYoutube,
  faTwitter,
  faGithub,
} from '@fortawesome/fontawesome-free-brands/shakable'

import {
  faCaretDown,
  faNewspaper,
  faRssSquare,
  faSortNumericUp,
  faSortNumericDown,
  faCheck,
  faCaretLeft,
  faCaretRight,
} from '@fortawesome/fontawesome-free-solid/shakable'

// Watch the DOM for any changes and add, replace, or modify icons on-the-fly
fontawesome.config.observeMutations = false

fontawesome.library.add(
  faFacebookSquare,
  faInstagram,
  faYoutube,
  faTwitter,
  faGithub,
  faEnvelope,
  faCaretDown,
  faNewspaper,
  faRssSquare,
  faSortNumericUp,
  faSortNumericDown,
  faCheck,
  faCaretLeft,
  faCaretRight
)

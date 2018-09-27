<a name="2.0.0-beta.2"></a>
# [2.0.0-beta.2](https://github.com/gaiama/gaiama.org/compare/v1.5.37...v2.0.0-beta.2) (2018-09-27)


### Bug Fixes

* **AboutPage:** wrap img in div for proper circles ([540cff5](https://github.com/gaiama/gaiama.org/commit/540cff5))
* **BlogPage:** remove webfont ([2ac54dc](https://github.com/gaiama/gaiama.org/commit/2ac54dc))
* **BlogPost:** change filter from $slug to $url ([54e4df6](https://github.com/gaiama/gaiama.org/commit/54e4df6))
* **BlogPost:** fix pager, swap slug for url ([27c31b2](https://github.com/gaiama/gaiama.org/commit/27c31b2))
* **Footer:** DO logo margin ([de30947](https://github.com/gaiama/gaiama.org/commit/de30947))
* **Footer:** DO logo margin only on desktop ([337e439](https://github.com/gaiama/gaiama.org/commit/337e439))
* **gatsby-browser:** auto scroll to menu only on link navigation ([b3fe3dd](https://github.com/gaiama/gaiama.org/commit/b3fe3dd))
* **Header:** new gatsby-image without 2nd wrapper, add logo link ([87a421b](https://github.com/gaiama/gaiama.org/commit/87a421b))
* **Link:** fix propType of ext prop ([9078a25](https://github.com/gaiama/gaiama.org/commit/9078a25))
* **MainLayout:** add missing ToastContainer ([67fd0d3](https://github.com/gaiama/gaiama.org/commit/67fd0d3))
* **Offline:** gatsby-plugin-offline globPatterns ([a46ac9a](https://github.com/gaiama/gaiama.org/commit/a46ac9a))
* **package:** add missing gatsby-plugin-layout dependency ([f28802e](https://github.com/gaiama/gaiama.org/commit/f28802e))
* **package:** add missing jest dependency upgrades ([2a1d0c6](https://github.com/gaiama/gaiama.org/commit/2a1d0c6))
* add missing gatsby-transformer-remark-multi-type plugin ([d9972e3](https://github.com/gaiama/gaiama.org/commit/d9972e3))
* **Pixel:** proxy pixel to pixel.api.. ([a09eb92](https://github.com/gaiama/gaiama.org/commit/a09eb92))
* **SEO:** robots.txt generation, re-add _redirects ([b8dc570](https://github.com/gaiama/gaiama.org/commit/b8dc570))
* **theme:** adjust xxxlarge to be > 1291 ([19a8668](https://github.com/gaiama/gaiama.org/commit/19a8668))
* **TitledCopy:** decrease title size 2.7>2.5 ([55b8148](https://github.com/gaiama/gaiama.org/commit/55b8148))
* redirects/short urls ([8686bde](https://github.com/gaiama/gaiama.org/commit/8686bde))
* removed outerWrapperClassName ([8ab29c9](https://github.com/gaiama/gaiama.org/commit/8ab29c9))


### Features

* **BlogPost:** <time /> color to colors.black for a11y ([34f8bd1](https://github.com/gaiama/gaiama.org/commit/34f8bd1))
* **BlogPost:** link <time/> to slug_short ([98e0993](https://github.com/gaiama/gaiama.org/commit/98e0993))
* **FontAwesome:** remove global icons ([d780e94](https://github.com/gaiama/gaiama.org/commit/d780e94))
* **Footer:** add Copyright note ([07f0d65](https://github.com/gaiama/gaiama.org/commit/07f0d65))
* **Footer:** add Steemit link & color, fix github color ([1ab5c31](https://github.com/gaiama/gaiama.org/commit/1ab5c31))
* **gatsby-browser:** change exports to es6 modules ([f05c88e](https://github.com/gaiama/gaiama.org/commit/f05c88e))
* **gatsby-config:** ignore files starting with . and /happygaia/ ([e50beb6](https://github.com/gaiama/gaiama.org/commit/e50beb6))
* **gatsby-node:** add index based short urls ([82d7b46](https://github.com/gaiama/gaiama.org/commit/82d7b46))
* **Header:** more width on mobile & font-size ([9f823ea](https://github.com/gaiama/gaiama.org/commit/9f823ea))
* **HomePage:** beautify and seoify home page <title/> ([574b8c9](https://github.com/gaiama/gaiama.org/commit/574b8c9))
* **layout:** add gatsby-plugin-layout ([6f53844](https://github.com/gaiama/gaiama.org/commit/6f53844))
* **Pixel:** add more metrics (plt, sd, de, vp, sr) ([8d012c6](https://github.com/gaiama/gaiama.org/commit/8d012c6))
* **Pixel:** add original referrer, utm params & app version ([9df96b8](https://github.com/gaiama/gaiama.org/commit/9df96b8))
* **Pixel:** never disable ([1450975](https://github.com/gaiama/gaiama.org/commit/1450975))
* **Pixel:** provide version and new url ([98a981d](https://github.com/gaiama/gaiama.org/commit/98a981d))
* **Pixel:** use Beacon API where available ([5694b85](https://github.com/gaiama/gaiama.org/commit/5694b85))
* **query-string:** remove default export ([5098b11](https://github.com/gaiama/gaiama.org/commit/5098b11))
* **query-string:** uri encode all keys & values ([f6f6b77](https://github.com/gaiama/gaiama.org/commit/f6f6b77))
* **ReferrerMessage:** show message additionally as toast ([25b4e4c](https://github.com/gaiama/gaiama.org/commit/25b4e4c))
* **SEO:** generate robots.txt onPostBuild ([2403bd5](https://github.com/gaiama/gaiama.org/commit/2403bd5))
* **ShareWidget:** add share link option, with short link ([59a51e2](https://github.com/gaiama/gaiama.org/commit/59a51e2))
* **ShareWidget:** switch to execCommand(`copy`) + i18n ([927c7d8](https://github.com/gaiama/gaiama.org/commit/927c7d8))
* add api proxy, update pixel endpoint ([834d340](https://github.com/gaiama/gaiama.org/commit/834d340))
* add H1 titles to all pages ([6d658f5](https://github.com/gaiama/gaiama.org/commit/6d658f5))
* add humans.txt ([b8c0abe](https://github.com/gaiama/gaiama.org/commit/b8c0abe))
* remove additional heading font-sizes ([0dd2d2a](https://github.com/gaiama/gaiama.org/commit/0dd2d2a))
* **slug:** add speakingurl, auto generate slug & new url field ([6251ca0](https://github.com/gaiama/gaiama.org/commit/6251ca0))
* **template:** rename 404 to ErrorPage ([81f3a72](https://github.com/gaiama/gaiama.org/commit/81f3a72))
* **theme:** use systemfont stack, drop webfonts ([6fce402](https://github.com/gaiama/gaiama.org/commit/6fce402))
* **TitledCopy:** allow change of title rank h1-h6 ([1eee180](https://github.com/gaiama/gaiama.org/commit/1eee180))
* **toast:** init react-toastify and utils/toast.js ([b8f845f](https://github.com/gaiama/gaiama.org/commit/b8f845f))
* **Toast:** pass options through, disable autoClose for error ([488e375](https://github.com/gaiama/gaiama.org/commit/488e375))


### BREAKING CHANGES

* **slug:** `slug` will now only contain the slugified title (no path)
add `url` field, constructed of language, possible `/blog/` prefix and the `slug`
* **FontAwesome:** make sure to import icons individually where needed!
* **query-string:** remove default export, query-string has now to be imported either by
`import * as QS from './query-string.js'`
or destructured
`import { parse, stringify } from './query-string.js'`
* **Pixel:** simplifies query string construction using utils/query-string.js which removes string substitution of [[title]] etc.
* **Pixel:** removes [[random]]



<a name="1.5.37"></a>
## [1.5.37](https://github.com/gaiama/gaiama.org/compare/70cdd0f...v1.5.37) (2018-07-18)


### Bug Fixes

* language switcher swapping positions, now .sort()ed ([70cdd0f](https://github.com/gaiama/gaiama.org/commit/70cdd0f))




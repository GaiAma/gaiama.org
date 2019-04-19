/* global window */
/**
 * lazy loading tricks from
 * https://www.screenshotbin.com/blog/handling-lazy-loaded-webpages-puppeteer
 */
const puppeteer = require(`puppeteer`)
const { toMatchImageSnapshot } = require(`jest-image-snapshot`)
expect.extend({ toMatchImageSnapshot })

jest.setTimeout(15000)

function wait(ms) {
  return new Promise(resolve => setTimeout(() => resolve(), ms))
}

const [width, height] = [1240, 530]
let page
let browser

const testIf =
  (process.env.MODE && process.env.MODE === `skipsnapshots`) ||
  (process.env.SKIP && process.env.SKIP === `e2e`)
    ? test.skip
    : test

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: [`--window-size=${width},${height}`],
  })
  page = await browser.newPage()
  await page.setViewport({ width, height })
  // await page.setViewport({ width, height })
  // await page.goto(`http://localhost:8000`)
})
afterAll(() => {
  browser.close()
})

const URL = `http://localhost:8000/en/`

const pagesToTest = [
  {
    title: `Home Page`,
    url: URL,
  },
  {
    title: `About Us`,
    url: `${URL}about-us`,
  },
  {
    title: `You & GaiAma`,
    url: `${URL}you-and-gaiama`,
  },
  {
    title: `Blog`,
    url: `${URL}blog`,
  },
  // {
  //   title: `Gallery`,
  //   url: `${URL}gallery`,
  // },
  {
    title: `Contact`,
    url: `${URL}contact`,
  },
]

describe(`Visual regressions`, () => {
  pagesToTest.forEach(x =>
    testIf(
      x.title,
      async done => {
        await page.goto(x.url)
        // await page.evaluate(() => {
        //   window.scrollBy(0, window.innerHeight)
        // })
        // Get the height of the rendered page
        const bodyHandle = await page.$(`body`)
        const { height } = await bodyHandle.boundingBox()
        await bodyHandle.dispose()

        // Scroll one viewport at a time, pausing to let content load
        const viewportHeight = page.viewport().height
        let viewportIncr = 0
        while (viewportIncr + viewportHeight < height) {
          await page.evaluate(_viewportHeight => {
            window.scrollBy(0, _viewportHeight)
          }, viewportHeight)
          await wait(20)
          viewportIncr = viewportIncr + viewportHeight
        }

        // Scroll back to top
        await page.evaluate(_ => {
          window.scrollTo(0, 0)
        })

        // Some extra delay to let images load
        await wait(100)

        const screenshot = await page.screenshot({ fullPage: true })
        expect(screenshot).toMatchImageSnapshot()
        done()
      },
      20000
    )
  )
})

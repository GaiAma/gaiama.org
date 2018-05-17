const puppeteer = require(`puppeteer`)
const { toMatchImageSnapshot } = require(`jest-image-snapshot`)
expect.extend({ toMatchImageSnapshot })

jest.setTimeout(15000)

let page
let browser

const testIf = process.env.MODE && process.env.MODE === `skipsnapshots`
  ? test.skip
  : process.env.SKIP && process.env.SKIP === `e2e`
    ? test.skip
    : test

beforeAll(async () => {
  browser = await puppeteer.launch()
  page = await browser.newPage()
  // await page.setViewport({ width, height })
  // await page.goto(`http://localhost:8000`)
})
afterAll(() => {
  browser.close()
})

// const URL = `http://localhost:8000/`
const URL = `http://localhost:3333/`

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
  {
    title: `Gallery`,
    url: `${URL}gallery`,
  },
  {
    title: `Contact`,
    url: `${URL}contact`,
  },
]

describe(`Visual regressions`, () => {
  pagesToTest.forEach(x =>
    testIf(x.title, async done => {
      await page.goto(x.url)
      await page.evaluate(() => {
        /* eslint-disable-next-line no-undef */
        window.scrollBy(0, window.innerHeight)
      })
      const screenshot = await page.screenshot({ fullPage: true })
      expect(screenshot).toMatchImageSnapshot()
      done()
    }, 20000)
  )
})
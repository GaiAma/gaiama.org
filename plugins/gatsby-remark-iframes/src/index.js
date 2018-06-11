import unified from 'unified'
import rehype2remark from 'rehype-remark'
import rehypeRaw from 'rehype-raw'
import remark2rehype from 'remark-rehype'
import remarkIframe from 'remark-iframes'
import visit from 'unist-util-visit'
// import { writeFileSync } from 'fs'
import markdown from 'remark-parse'
import remark from 'remark'
import { parse } from 'url'

const transformer = (markdownAST, opts) => {
  // writeFileSync(
  //   `${__dirname}/debug`,
  //   JSON.stringify(markdownAST, null, 2)
  // )
  visit(markdownAST, `text`, (node, index, parent) => {
    if (node.value === `!(`) {
      const link = parent.children[index + 1]
      if (link && link.url && link.url.indexOf(`http`) === 0) {
        const { hostname } = parse(link.url)
        const closing = parent.children[index + 2]
        if (opts[hostname] && closing.value === `)`) {
          // const src =
          return {
            type: 'iframe',
            src,
            data: {
              hName: provider.tag,
              hProperties: {
                src: finalUrl,
                width: provider.width,
                height: provider.height,
                allowfullscreen: true,
                frameborder: '0',
              },
              thumbnail: thumbnail,
            },
          }
        }
      }
    }
  })
  // return unified()
  //   .use(remark2rehype)
  //   .use(rehypeRaw)
  //   .use(remarkIframe, opts)
  //   .use(rehype2remark)
  //   .processSync(markdownAST)
}

// export const setParserPlugins = opts => [remarkIframe, opts]

const processor = unified()
  .use(markdown)
  .use(transformer)

const md = `# heading :D

!(https://vimeo.com/147470058)`

// processor.process(md)
transformer(remark().parse(md), {
  'vimeo.com': {
    tag: `iframe`,
    width: 500,
    height: 281,
    disabled: false,
    replace: [
      [`http://`, `https://`],
      [`www.`, ``],
      [`vimeo.com/`, `player.vimeo.com/video/`],
    ],
    append: `?color=3d95a8&title=0&byline=0&portrait=0`,
  },
})

export default transformer

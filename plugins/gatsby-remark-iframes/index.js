"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _unified = _interopRequireDefault(require("unified"));

var _rehypeRemark = _interopRequireDefault(require("rehype-remark"));

var _rehypeRaw = _interopRequireDefault(require("rehype-raw"));

var _remarkRehype = _interopRequireDefault(require("remark-rehype"));

var _remarkIframes = _interopRequireDefault(require("remark-iframes"));

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _remarkParse = _interopRequireDefault(require("remark-parse"));

var _remark = _interopRequireDefault(require("remark"));

var _url = require("url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { writeFileSync } from 'fs'
var transformer = function transformer(markdownAST, opts) {
  // writeFileSync(
  //   `${__dirname}/debug`,
  //   JSON.stringify(markdownAST, null, 2)
  // )
  (0, _unistUtilVisit.default)(markdownAST, "text", function (node, index, parent) {
    if (node.value === "!(") {
      var link = parent.children[index + 1];

      if (link && link.url && link.url.indexOf("http") === 0) {
        var _parse = (0, _url.parse)(link.url),
            hostname = _parse.hostname;

        var closing = parent.children[index + 2];

        if (opts[hostname] && closing.value === ")") {
          // const src =
          return {
            type: 'iframe',
            src: src,
            data: {
              hName: provider.tag,
              hProperties: {
                src: finalUrl,
                width: provider.width,
                height: provider.height,
                allowfullscreen: true,
                frameborder: '0'
              },
              thumbnail: thumbnail
            }
          };
        }
      }
    }
  }); // return unified()
  //   .use(remark2rehype)
  //   .use(rehypeRaw)
  //   .use(remarkIframe, opts)
  //   .use(rehype2remark)
  //   .processSync(markdownAST)
}; // export const setParserPlugins = opts => [remarkIframe, opts]


var processor = (0, _unified.default)().use(_remarkParse.default).use(transformer);
var md = "# heading :D\n\n!(https://vimeo.com/147470058)"; // processor.process(md)

transformer((0, _remark.default)().parse(md), {
  'vimeo.com': {
    tag: "iframe",
    width: 500,
    height: 281,
    disabled: false,
    replace: [["http://", "https://"], ["www.", ""], ["vimeo.com/", "player.vimeo.com/video/"]],
    append: "?color=3d95a8&title=0&byline=0&portrait=0"
  }
});
var _default = transformer;
exports.default = _default;
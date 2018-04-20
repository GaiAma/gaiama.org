"use strict";

var _cheerio = _interopRequireDefault(require("cheerio"));

var _unistUtilModifyChildren = _interopRequireDefault(require("unist-util-modify-children"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import remark from 'remark'
// import rehype from 'remark-rehype'
// import format from 'rehype-format'
// import stringify from 'rehype-stringify'
// import visitChildren from 'unist-util-visit-children'
// const markdown = `
// some text paragraph before gallery
// ![alt text](./assets/image.jpeg "Image Title")
// ![other alt text](./assets/image2.png)
// some text paragraph after gallery
// `
// const log = x => console.log(`\n\n`, JSON.stringify(x, null, 2), `\n\n`)
var log = function log(x) {
  return _fs.default.writeFileSync("/Users/Can/Sites/GaiAma.org/testblog/LOGFILE.txt", "__ENTRY__\n" + JSON.stringify(x, null, 2) + "\n__ENTRY-END__\n\n", {
    flag: "a"
  });
}; // const visit = visitChildren(log)
// const result = remark()
//   // .use(visitor)
//   .use(modifierPlugin)
//   .use(rehype)
//   .use(format)
//   .use(stringify)
//   .processSync(markdown)
// log(String(result))
// function visitor() {
//   return function transformer(tree) {
//     tree.children.map()
//     // visit(tree.children[0])
//   }
// }


module.exports = function (_ref, pluginOptions) {
  var markdownAST = _ref.markdownAST;
  // log(markdownAST)
  markdownAST.children.filter(function (x) {
    return x && x.children && x.children.length;
  }).map((0, _unistUtilModifyChildren.default)(modifier)); // .map(log)

  return markdownAST;
};

function modifier(node, index, parent) {
  if (parent.type !== "paragraph") return false;
  var whitespaceStripped = parent.children.filter(function (x) {
    return !/^(\\n)*\s+$/.test(x.value);
  });
  var onlyContainsImages = whitespaceStripped.every(function (x) {
    return x.type === "html" && x.value.includes("gatsby-resp-image-figure");
  });

  if (onlyContainsImages) {
    parent.type = "div";
    parent.data = {
      hProperties: {
        class: "inline-gallery"
      }
    };
    parent.children.map(function (x) {
      var $ = _cheerio.default.load(x.value);

      var imageWithRatio = $("[data-ratio]");

      if (imageWithRatio) {
        if (parent.children.length > 1) {
          imageWithRatio.css("flex", imageWithRatio.attr("data-ratio"));
        }

        imageWithRatio.attr("data-ratio", null);
        x.value = $("body").html();
      }
    });
    parent.children = whitespaceStripped;
    log(parent);
  }

  return index + 1;
}
/**
 * works, but not compatible with 
 */
// // import remark from 'remark'
// // import rehype from 'remark-rehype'
// // import format from 'rehype-format'
// // import stringify from 'rehype-stringify'
// // import visitChildren from 'unist-util-visit-children'
// import modifyChildren from 'unist-util-modify-children'
// import fs from 'fs'
// // const markdown = `
// // some text paragraph before gallery
// // ![alt text](./assets/image.jpeg "Image Title")
// // ![other alt text](./assets/image2.png)
// // some text paragraph after gallery
// // `
// // const log = x => console.log(`\n\n`, JSON.stringify(x, null, 2), `\n\n`)
// const log = x => fs.writeFileSync(
//   `/Users/Can/Sites/GaiAma.org/testblog/LOGFILE.txt`,
//   `__ENTRY__\n` + JSON.stringify(x, null, 2) + `\n__ENTRY-END__\n\n`,
//   { flag: `a` }
// )
// // const visit = visitChildren(log)
// // const result = remark()
// //   // .use(visitor)
// //   .use(modifierPlugin)
// //   .use(rehype)
// //   .use(format)
// //   .use(stringify)
// //   .processSync(markdown)
// // log(String(result))
// // function visitor() {
// //   return function transformer(tree) {
// //     tree.children.map()
// //     // visit(tree.children[0])
// //   }
// // }
// module.exports = ({ markdownAST }, pluginOptions) => {
//   // log(markdownAST)
//   markdownAST.children
//     .filter(x => x && x.children && x.children.length)
//     .map(modifyChildren(modifier))
//   return markdownAST
// }
// function modifier(node, index, parent) {
//   if (parent.type !== `paragraph`) return false
//   const whitespaceStripped = parent.children.filter(x =>
//     !/^(\\n)*\s+$/.test(x.value)
//   )
//   const onlyContainsImages = whitespaceStripped.every(x => x.type === `image`)
//   if (onlyContainsImages) {
//     parent.type = `div`
//     parent.data = {
//       hProperties: {
//         class: `inline-gallery`,
//       },
//     }
//     parent.children = whitespaceStripped
//     log(parent)
//   }
//   return index + 1
// }
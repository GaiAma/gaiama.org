"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

// const select = require(`unist-util-select`)
const visitWithParents = require(`unist-util-visit-parents`);

const path = require(`path`);

const isRelativeUrl = require(`is-relative-url`);

const _ = require(`lodash`);

const _require = require(`gatsby-plugin-sharp`),
      fluid = _require.fluid;

const Promise = require(`bluebird`);

const cheerio = require(`cheerio`);

const slash = require(`slash`); // If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image fluid sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.


module.exports = ({
  files,
  markdownNode,
  markdownAST,
  pathPrefix,
  getNode,
  reporter
}, pluginOptions) => {
  const defaults = {
    maxWidth: 650,
    wrapperStyle: ``,
    backgroundColor: `white`,
    linkImagesToOriginal: true,
    showCaptions: false,
    pathPrefix,
    withWebp: false
  };

  const options = _.defaults(pluginOptions, defaults);

  const findParentLinks = ({
    children
  }) => children.some(node => node.type === `html` && !!node.value.match(/<a /) || node.type === `link`); // This will allow the use of html image tags
  // const rawHtmlNodes = select(markdownAST, `html`)


  let rawHtmlNodes = [];
  visitWithParents(markdownAST, `html`, (node, ancestors) => {
    const inLink = ancestors.some(findParentLinks);
    rawHtmlNodes.push({
      node,
      inLink
    });
  }); // This will only work for markdown syntax image tags

  let markdownImageNodes = [];
  visitWithParents(markdownAST, `image`, (node, ancestors) => {
    const inLink = ancestors.some(findParentLinks);
    markdownImageNodes.push({
      node,
      inLink
    });
  }); // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image

  const generateImagesAndUpdateNode =
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(function* (node, resolve, inLink) {
      // Check if this markdownNode has a File parent. This plugin
      // won't work if the image isn't hosted locally.
      const parentNode = getNode(markdownNode.parent);
      let imagePath;

      if (parentNode && parentNode.dir) {
        imagePath = slash(path.join(parentNode.dir, node.url));
      } else {
        return null;
      }

      const imageNode = _.find(files, file => {
        if (file && file.absolutePath) {
          return file.absolutePath === imagePath;
        }

        return null;
      });

      if (!imageNode || !imageNode.absolutePath) {
        return resolve();
      }

      let fluidResult = yield fluid({
        file: imageNode,
        args: options,
        reporter
      });

      if (!fluidResult) {
        return resolve();
      } // Calculate the paddingBottom %


      const ratio = `${1 / fluidResult.aspectRatio * 100}%`;
      const originalImg = fluidResult.originalImg;
      const fallbackSrc = fluidResult.src;
      const srcSet = fluidResult.srcSet;
      const presentationWidth = fluidResult.presentationWidth; // Generate default alt tag

      const srcSplit = node.url.split(`/`);
      const fileName = srcSplit[srcSplit.length - 1];
      const fileNameNoExt = fileName.replace(/\.[^/.]+$/, ``);
      const defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, ` `); // TODO
      // Fade in images on load.
      // https://www.perpetual-beta.org/weblog/silky-smooth-image-loading.html

      const imageClass = `gatsby-resp-image-image`;
      const imageStyle = `width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px ${options.backgroundColor};`; // Create our base image tag

      let imageTag = `
      <img
        class="${imageClass}"
        style="${imageStyle}"
        alt="${node.alt ? node.alt : defaultAlt}"
        title="${node.title ? node.title : ``}"
        src="${fallbackSrc}"
        srcset="${srcSet}"
        sizes="${fluidResult.sizes}"
      />
    `; // if options.withWebp is enabled, generate a webp version and change the image tag to a picture tag

      if (options.withWebp) {
        const webpFluidResult = yield fluid({
          file: imageNode,
          args: _.defaults({
            toFormat: `WEBP`
          }, // override options if it's an object, otherwise just pass through defaults
          options.withWebp === true ? {} : options.withWebp, pluginOptions, defaults),
          reporter
        });

        if (!webpFluidResult) {
          return resolve();
        }

        imageTag = `
      <picture>
        <source
          srcset="${webpFluidResult.srcSet}"
          sizes="${webpFluidResult.sizes}"
          type="${webpFluidResult.srcSetType}"
        />
        <source
          srcset="${srcSet}"
          sizes="${fluidResult.sizes}"
          type="${fluidResult.srcSetType}"
        />
        <img
          class="${imageClass}"
          style="${imageStyle}"
          src="${fallbackSrc}"
          alt="${node.alt ? node.alt : defaultAlt}"
          title="${node.title ? node.title : ``}"
          src="${fallbackSrc}"
        />
      </picture>
      `;
      } // Construct new image node w/ aspect ratio placeholder


      const showCaptions = options.showCaptions && node.title;
      let rawHTML = `
  <span
    class="gatsby-resp-image-wrapper"
    style="position: relative; display: block; ${showCaptions ? null : options.wrapperStyle}; max-width: ${presentationWidth}px; margin-left: auto; margin-right: auto;"
  >
    <span
      class="gatsby-resp-image-background-image"
      style="padding-bottom: ${ratio}; position: relative; bottom: 0; left: 0; background-image: url('${fluidResult.base64}'); background-size: cover; display: block;"
    >${imageTag}</span>
  </span>
  `; // Make linking to original image optional.

      if (!inLink && options.linkImagesToOriginal) {
        rawHTML = `
  <a
    class="gatsby-resp-image-link"
    href="${originalImg}"
    style="display: block"
    target="_blank"
    rel="noopener"
  >
  ${rawHTML}
  </a>
    `;
      } // Wrap in figure and use title as caption


      if (showCaptions) {
        rawHTML = `
  <figure class="gatsby-resp-image-figure" style="${options.wrapperStyle}">
  ${rawHTML}
  <figcaption class="gatsby-resp-image-figcaption">${node.title}</figcaption>
  </figure>
      `;
      }

      return rawHTML;
    });

    return function generateImagesAndUpdateNode(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  return Promise.all( // Simple because there is no nesting in markdown
  markdownImageNodes.map(({
    node,
    inLink
  }) => new Promise(
  /*#__PURE__*/
  function () {
    var _ref2 = (0, _asyncToGenerator2.default)(function* (resolve, reject) {
      const fileType = node.url.slice(-3); // Ignore gifs as we can't process them,
      // svgs as they are already responsive by definition

      if (isRelativeUrl(node.url) && fileType !== `gif` && fileType !== `svg`) {
        const rawHTML = yield generateImagesAndUpdateNode(node, resolve, inLink);

        if (rawHTML) {
          // Replace the image node with an inline HTML node.
          node.type = `html`;
          node.value = rawHTML;
        }

        return resolve(node);
      } else {
        // Image isn't relative so there's nothing for us to do.
        return resolve();
      }
    });

    return function (_x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }()))).then(markdownImageNodes => // HTML image node stuff
  Promise.all( // Complex because HTML nodes can contain multiple images
  rawHtmlNodes.map(({
    node,
    inLink
  }) => new Promise(
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2.default)(function* (resolve, reject) {
      if (!node.value) {
        return resolve();
      }

      const $ = cheerio.load(node.value);

      if ($(`img`).length === 0) {
        // No img tags
        return resolve();
      }

      let imageRefs = [];
      $(`img`).each(function () {
        imageRefs.push($(this));
      });

      for (var _i = 0; _i < imageRefs.length; _i++) {
        let thisImg = imageRefs[_i];
        // Get the details we need.
        let formattedImgTag = {};
        formattedImgTag.url = thisImg.attr(`src`);
        formattedImgTag.title = thisImg.attr(`title`);
        formattedImgTag.alt = thisImg.attr(`alt`);

        if (!formattedImgTag.url) {
          return resolve();
        }

        const fileType = formattedImgTag.url.slice(-3); // Ignore gifs as we can't process them,
        // svgs as they are already responsive by definition

        if (isRelativeUrl(formattedImgTag.url) && fileType !== `gif` && fileType !== `svg`) {
          const rawHTML = yield generateImagesAndUpdateNode(formattedImgTag, resolve, inLink);

          if (rawHTML) {
            // Replace the image string
            thisImg.replaceWith(rawHTML);
          } else {
            return resolve();
          }
        }
      } // Replace the image node with an inline HTML node.


      node.type = `html`;
      node.value = $(`body`).html(); // fix for cheerio v1

      return resolve(node);
    });

    return function (_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }()))).then(htmlImageNodes => markdownImageNodes.concat(htmlImageNodes).filter(node => !!node)));
};
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _gatsby = require("gatsby");

var _createContentDigest = _interopRequireDefault(require("gatsby/dist/utils/create-content-digest"));

var _common = require("./common.js");

var _fs = _interopRequireDefault(require("fs"));

var _jsxFileName = "/Users/Can/Projekte/Coding/forks/gatsby/packages/gatsby-plugin-manifest/src/gatsby-ssr.js";
var iconDigest = null;

exports.onRenderBody = function (_ref, pluginOptions) {
  var setHeadComponents = _ref.setHeadComponents,
      _ref$pathname = _ref.pathname,
      pathname = _ref$pathname === void 0 ? "/" : _ref$pathname;

  if (Array.isArray(pluginOptions.manifests)) {
    pluginOptions = pluginOptions.manifests.find(function (x) {
      return RegExp(x.regex || "^/" + x.language + "/.*").test(pathname);
    });
    if (!pluginOptions) return false;
  } // We use this to build a final array to pass as the argument to setHeadComponents at the end of onRenderBody.


  var headComponents = [];
  var srcIconExists = !!pluginOptions.icon;
  var icons = pluginOptions.icons || _common.defaultIcons;
  var legacy = typeof pluginOptions.legacy !== "undefined" ? pluginOptions.legacy : true;
  var cacheBusting = typeof pluginOptions.cache_busting_mode !== "undefined" ? pluginOptions.cache_busting_mode : "query"; // If icons were generated, also add a favicon link.

  if (srcIconExists) {
    var favicon = icons && icons.length ? icons[0].src : null;

    if (cacheBusting !== "none") {
      iconDigest = (0, _createContentDigest.default)(_fs.default.readFileSync(pluginOptions.icon));
    }

    var insertFaviconLinkTag = typeof pluginOptions.include_favicon !== "undefined" ? pluginOptions.include_favicon : true;

    if (favicon && insertFaviconLinkTag) {
      headComponents.push(_react.default.createElement("link", {
        key: "gatsby-plugin-manifest-icon-link",
        rel: "shortcut icon",
        href: (0, _gatsby.withPrefix)((0, _common.addDigestToPath)(favicon, iconDigest, cacheBusting)),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 49
        },
        __self: this
      }));
    }
  }

  var suffix = pluginOptions.language ? "_" + pluginOptions.language : ""; // Add manifest link tag.

  headComponents.push(_react.default.createElement("link", {
    key: "gatsby-plugin-manifest-link",
    rel: "manifest",
    href: (0, _gatsby.withPrefix)("/manifest" + suffix + ".webmanifest"),
    crossOrigin: pluginOptions.crossOrigin,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  })); // The user has an option to opt out of the theme_color meta tag being inserted into the head.

  if (pluginOptions.theme_color) {
    var insertMetaTag = typeof pluginOptions.theme_color_in_head !== "undefined" ? pluginOptions.theme_color_in_head : true;

    if (insertMetaTag) {
      headComponents.push(_react.default.createElement("meta", {
        key: "gatsby-plugin-manifest-meta",
        name: "theme-color",
        content: pluginOptions.theme_color,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 79
        },
        __self: this
      }));
    }
  }

  if (legacy) {
    var iconLinkTags = icons.map(function (icon) {
      return _react.default.createElement("link", {
        key: "gatsby-plugin-manifest-apple-touch-icon-" + icon.sizes,
        rel: "apple-touch-icon",
        sizes: icon.sizes,
        href: (0, _gatsby.withPrefix)((0, _common.addDigestToPath)(icon.src, iconDigest, srcIconExists ? cacheBusting : "none")),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 90
        },
        __self: this
      });
    });
    headComponents = headComponents.concat(iconLinkTags);
  }

  setHeadComponents(headComponents);
  return true;
};
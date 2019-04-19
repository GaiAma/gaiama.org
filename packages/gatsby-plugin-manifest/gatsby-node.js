"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sharp = _interopRequireDefault(require("sharp"));

var _createContentDigest = _interopRequireDefault(require("gatsby/dist/utils/create-content-digest"));

var _common = require("./common");

_sharp.default.simd(true);

try {
  // Handle Sharp's concurrency based on the Gatsby CPU count
  // See: http://sharp.pixelplumbing.com/en/stable/api-utility/#concurrency
  // See: https://www.gatsbyjs.org/docs/multi-core-builds/
  var cpuCoreCount = require("gatsby/dist/utils/cpu-core-count");

  _sharp.default.concurrency(cpuCoreCount());
} catch (_unused) {// if above throws error this probably means that used Gatsby version
  // doesn't support cpu-core-count utility.
}

function generateIcons(icons, srcIcon) {
  return Promise.all(icons.map(
  /*#__PURE__*/
  function () {
    var _ref = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(icon) {
      var size, imgPath, density;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              size = parseInt(icon.sizes.substring(0, icon.sizes.lastIndexOf("x")));
              imgPath = _path.default.join("public", icon.src); // For vector graphics, instruct sharp to use a pixel density
              // suitable for the resolution we're rasterizing to.
              // For pixel graphics sources this has no effect.
              // Sharp accept density from 1 to 2400

              density = Math.min(2400, Math.max(1, size));
              return _context.abrupt("return", (0, _sharp.default)(srcIcon, {
                density: density
              }).resize({
                width: size,
                height: size,
                fit: "contain",
                background: {
                  r: 255,
                  g: 255,
                  b: 255,
                  alpha: 0
                }
              }).toFile(imgPath));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()));
}

exports.onPostBootstrap =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(_ref2, _ref3) {
    var reporter, manifests, manifest, activity;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reporter = _ref2.reporter;
            manifests = _ref3.manifests, manifest = (0, _objectWithoutPropertiesLoose2.default)(_ref3, ["manifests"]);
            activity = reporter.activityTimer("Build manifest and related icons");
            activity.start();

            if (!Array.isArray(manifests)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return Promise.all(manifests.map(function (x) {
              return makeManifest(reporter, x);
            }));

          case 7:
            _context2.next = 11;
            break;

          case 9:
            _context2.next = 11;
            return makeManifest(reporter, manifest);

          case 11:
            activity.end();

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function (_x2, _x3) {
    return _ref4.apply(this, arguments);
  };
}();

var makeManifest =
/*#__PURE__*/
function () {
  var _ref5 = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee3(reporter, pluginOptions) {
    var icon, language, manifest, suffix, paths, sharpIcon, metadata, cacheMode, iconDigest;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            icon = pluginOptions.icon, language = pluginOptions.language, manifest = (0, _objectWithoutPropertiesLoose2.default)(pluginOptions, ["icon", "language"]);
            suffix = language ? "_" + language : ""; // Delete options we won't pass to the manifest.webmanifest.

            delete manifest.plugins;
            delete manifest.legacy;
            delete manifest.theme_color_in_head;
            delete manifest.cache_busting_mode;
            delete manifest.crossOrigin;
            delete manifest.icon_options;
            delete manifest.include_favicon;
            delete manifest.regex; // If icons are not manually defined, use the default icon set.

            if (!manifest.icons) {
              manifest.icons = _common.defaultIcons;
            } // Specify extra options for each icon (if requested).


            if (pluginOptions.icon_options) {
              manifest.icons = manifest.icons.map(function (icon) {
                return (0, _extends2.default)({}, pluginOptions.icon_options, icon);
              });
            } // Determine destination path for icons.


            paths = {};
            manifest.icons.forEach(function (icon) {
              var iconPath = _path.default.join("public", _path.default.dirname(icon.src));

              if (!paths[iconPath]) {
                var exists = _fs.default.existsSync(iconPath); //create destination directory if it doesn't exist


                if (!exists) {
                  _fs.default.mkdirSync(iconPath);
                }

                paths[iconPath] = true;
              }
            }); // Only auto-generate icons if a src icon is defined.

            if (!(icon !== undefined)) {
              _context3.next = 30;
              break;
            }

            if ((0, _common.doesIconExist)(icon)) {
              _context3.next = 17;
              break;
            }

            throw "icon (" + icon + ") does not exist as defined in gatsby-config.js. Make sure the file exists relative to the root of the site.";

          case 17:
            sharpIcon = (0, _sharp.default)(icon);
            _context3.next = 20;
            return sharpIcon.metadata();

          case 20:
            metadata = _context3.sent;

            if (metadata.width !== metadata.height) {
              reporter.warn("The icon(" + icon + ") you provided to 'gatsby-plugin-manifest' is not square.\n" + "The icons we generate will be square and for the best results we recommend you provide a square icon.\n");
            } //add cache busting


            cacheMode = typeof pluginOptions.cache_busting_mode !== "undefined" ? pluginOptions.cache_busting_mode : "query"; //if cacheBusting is being done via url query icons must be generated before cache busting runs

            if (!(cacheMode === "query")) {
              _context3.next = 26;
              break;
            }

            _context3.next = 26;
            return generateIcons(manifest.icons, icon);

          case 26:
            if (cacheMode !== "none") {
              iconDigest = (0, _createContentDigest.default)(_fs.default.readFileSync(icon));
              manifest.icons.forEach(function (icon) {
                icon.src = (0, _common.addDigestToPath)(icon.src, iconDigest, cacheMode);
              });
            } //if file names are being modified by cacheBusting icons must be generated after cache busting runs


            if (!(cacheMode !== "query")) {
              _context3.next = 30;
              break;
            }

            _context3.next = 30;
            return generateIcons(manifest.icons, icon);

          case 30:
            //Write manifest
            _fs.default.writeFileSync(_path.default.join("public", "manifest" + suffix + ".webmanifest"), JSON.stringify(manifest));

          case 31:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function makeManifest(_x4, _x5) {
    return _ref5.apply(this, arguments);
  };
}();
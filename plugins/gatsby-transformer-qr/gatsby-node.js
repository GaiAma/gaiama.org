"use strict";

var _fs = require("fs");

var _path = require("path");

var _get = _interopRequireDefault(require("lodash/get"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _cuid = _interopRequireDefault(require("cuid"));

var _makeDir = _interopRequireDefault(require("make-dir"));

var _qrImage = _interopRequireDefault(require("qr-image"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var defaultOptions = {
  extension: "svg",
  filenameProp: "frontmatter.id",
  path: "frontmatter.__transformers"
};

function onCreateNode(_x, _x2) {
  return _onCreateNode.apply(this, arguments);
}

function _onCreateNode() {
  _onCreateNode = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref, pluginOptions) {
    var node, boundActionCreators, _merge, extension, dir, filenameProp, textProp, path, validValues, id, filename, absolutePath;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            node = _ref.node, boundActionCreators = _ref.boundActionCreators;
            _merge = (0, _merge2.default)(defaultOptions, pluginOptions), extension = _merge.extension, dir = _merge.dir, filenameProp = _merge.filenameProp, textProp = _merge.textProp, path = _merge.path, validValues = _merge.validValues;
            /**
             * continue only of validValues provided and path exists with valid value
             * or if node contains __transformers key in path or `frontmatter` and includes `QR`
             */

            if (!(validValues && !validValues.includes((0, _get.default)(node, path, "")) && !(0, _get.default)(node, path, "").split(",").includes("QR"))) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            // const { createNode, createParentChildLink } = boundActionCreators
            id = (0, _cuid.default)();
            filename = "".concat((0, _get.default)(node, filenameProp, id), ".").concat(extension);
            absolutePath = ""; // save to disk only if dir provided

            if (!dir) {
              _context.next = 11;
              break;
            }

            // ensure dir exists
            absolutePath = (0, _path.join)(dir, filename);
            _context.next = 11;
            return (0, _makeDir.default)(dir);

          case 11:
            if (!absolutePath) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return _qrImage.default.image((0, _get.default)(node, textProp), {
              type: extension
            }).pipe((0, _fs.createWriteStream)(absolutePath));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _onCreateNode.apply(this, arguments);
}

exports.onCreateNode = onCreateNode;
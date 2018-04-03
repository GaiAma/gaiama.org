"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _archieml = _interopRequireDefault(require("archieml"));

var _crypto = _interopRequireDefault(require("crypto"));

var _path = _interopRequireDefault(require("path"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var _default =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref, pluginOptions) {
    var node, loadNodeContent, boundActionCreators, createNode, createParentChildLink, languages, defaults, options, content, data, amlNode, contentSeparatorRegex, rawBody;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            node = _ref.node, loadNodeContent = _ref.loadNodeContent, boundActionCreators = _ref.boundActionCreators;
            createNode = boundActionCreators.createNode, createParentChildLink = boundActionCreators.createParentChildLink;
            languages = {
              markdown: "md"
            };
            defaults = {
              extension: "aml",
              bodySeparator: "--body--",
              bodyLanguage: languages.markdown
            };
            options = _objectSpread({}, defaults, {
              pluginOptions: pluginOptions // We only care about files with matching extension.

            });

            if (!(node.extension !== options.extension)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return");

          case 7:
            _context.next = 9;
            return loadNodeContent(node);

          case 9:
            content = _context.sent;
            data = _archieml.default.load(content, pluginOptions); // Convert date objects to string. Otherwise there's type mismatches
            // during inference as some dates are strings and others date objects.
            // if (data.data) {
            //   data.data = _.mapValues(data.data, v => {
            //     if (_.isDate(v)) {
            //       return v.toJSON()
            //     } else {
            //       return v
            //     }
            //   })
            // }

            amlNode = {
              id: "".concat(node.id, " >>> ArchieML"),
              children: [],
              parent: node.id,
              internal: {
                content: content,
                // type: `ArchieML`,
                // type: _.upperFirst(_.camelCase(`${node.name} Aml`)),
                type: _lodash.default.upperFirst(_lodash.default.camelCase("".concat(_path.default.basename(node.dir), " Aml")))
              }
            };
            amlNode.frontmatter = _objectSpread({}, data);
            // amlNode.excerpt = data.excerpt
            contentSeparatorRegex = new RegExp(options.bodySeparator, "i");

            if (content.match(contentSeparatorRegex)) {
              rawBody = content.split(options.bodySeparator);
              amlNode.rawBody = rawBody[1]; // if (options.bodyLanguage === languages.markdown) {}
            } // Add path to the markdown file path


            if (node.internal.type === "File") {
              amlNode.fileAbsolutePath = node.absolutePath;
              amlNode.fileRelativePath = node.relativePath;
            }

            amlNode.internal.contentDigest = _crypto.default.createHash("md5").update(JSON.stringify(amlNode)).digest("hex");
            createNode(amlNode);
            createParentChildLink({
              parent: node,
              child: amlNode
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = _default;
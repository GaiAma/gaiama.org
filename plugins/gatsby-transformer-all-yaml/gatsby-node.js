"use strict";

var _path = _interopRequireDefault(require("path"));

var _crypto = _interopRequireDefault(require("crypto"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var onCreateNode =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var node, boundActionCreators, loadNodeContent, transformObject, createNode, createParentChildLink, content, parsedContent;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            transformObject = function _ref3(obj, id, type) {
              var objStr = JSON.stringify(obj);

              var contentDigest = _crypto.default.createHash("md5").update(objStr).digest("hex");

              var yamlNode = _extends({}, obj, {
                id: id,
                children: [],
                parent: node.id,
                internal: {
                  contentDigest: contentDigest,
                  type: type
                }
              });

              yamlNode.relativePath = node.relativePath;
              createNode(yamlNode);
              createParentChildLink({
                parent: node,
                child: yamlNode
              });
            };

            node = _ref.node, boundActionCreators = _ref.boundActionCreators, loadNodeContent = _ref.loadNodeContent;

            if (!(node.internal.mediaType !== "text/yaml")) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            createNode = boundActionCreators.createNode, createParentChildLink = boundActionCreators.createParentChildLink;
            _context.next = 7;
            return loadNodeContent(node);

          case 7:
            content = _context.sent;
            parsedContent = _jsYaml.default.load(content);

            if (_lodash.default.isArray(parsedContent)) {
              parsedContent.forEach(function (obj, i) {
                transformObject(obj, obj.id ? obj.id : "".concat(node.id, " [").concat(i, "] >>> YAML"), _lodash.default.upperFirst(_lodash.default.camelCase("".concat(node.name, " Yaml"))));
              });
            } else if (_lodash.default.isPlainObject(parsedContent)) {
              transformObject(parsedContent, parsedContent.id ? parsedContent.id : "".concat(node.id, " >>> YAMLPages"), "yamlPages");
            }

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function onCreateNode(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.onCreateNode = onCreateNode;
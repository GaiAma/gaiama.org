"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sourceNodes = void 0;

require("@babel/polyfill");

var _gitlab = _interopRequireDefault(require("gitlab"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var sourceNodes =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref, _ref2) {
    var boundActionCreators, token, user, repository, _ref2$tree, tree, _ref2$releases, releases, _ref2$secrets, secrets, gitlab, projects, gaiamaContent, _tree;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            boundActionCreators = _ref.boundActionCreators;
            token = _ref2.token, user = _ref2.user, repository = _ref2.repository, _ref2$tree = _ref2.tree, tree = _ref2$tree === void 0 ? false : _ref2$tree, _ref2$releases = _ref2.releases, releases = _ref2$releases === void 0 ? false : _ref2$releases, _ref2$secrets = _ref2.secrets, secrets = _ref2$secrets === void 0 ? {} : _ref2$secrets;
            _context.prev = 2;
            gitlab = new _gitlab.default({
              url: "https://gitlab.com",
              token: token
            });
            _context.next = 6;
            return gitlab.GroupProjects.all("GaiAma");

          case 6:
            projects = _context.sent;
            gaiamaContent = projects.find(function (x) {
              return x.name === "gaiama-content";
            }); // console.log(gaiamaContent)

            _context.next = 10;
            return gitlab.Repositories.tree(gaiamaContent.id);

          case 10:
            _tree = _context.sent;
            // console.log(tree)
            gitlab.RepositoryFiles.show(gaiamaContent.id, "testfile", "master").then(function (x) {
              return console.log(x);
            });
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](2);
            console.error(_context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[2, 14]]);
  }));

  return function sourceNodes(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

exports.sourceNodes = sourceNodes;
sourceNodes({}, {
  token: "AzqC3DHxg7DbAUjJJ6hQ"
});
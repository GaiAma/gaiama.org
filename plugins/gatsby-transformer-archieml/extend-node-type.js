"use strict";

var _graphql = require("graphql");

var _remark = _interopRequireDefault(require("remark"));

var _unistUtilSelect = _interopRequireDefault(require("unist-util-select"));

var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));

var _lodash = _interopRequireDefault(require("lodash"));

var _unistUtilVisit = _interopRequireDefault(require("unist-util-visit"));

var _mdastUtilToHast = _interopRequireDefault(require("mdast-util-to-hast"));

var _hastUtilToHtml = _interopRequireDefault(require("hast-util-to-html"));

var _mdastUtilToc = _interopRequireDefault(require("mdast-util-toc"));

var _bluebird = _interopRequireDefault(require("bluebird"));

var _prune = _interopRequireDefault(require("underscore.string/prune"));

var _unified = _interopRequireDefault(require("unified"));

var _remarkParse = _interopRequireDefault(require("remark-parse"));

var _remarkStringify = _interopRequireDefault(require("remark-stringify"));

var _retextEnglish = _interopRequireDefault(require("retext-english"));

var _remarkRetext = _interopRequireDefault(require("remark-retext"));

var _graphqlTypeJson = _interopRequireDefault(require("graphql-type-json"));

var _unistUtilRemovePosition = _interopRequireDefault(require("unist-util-remove-position"));

var _hastUtilRaw = _interopRequireDefault(require("hast-util-raw"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } } function _next(value) { step("next", value); } function _throw(err) { step("throw", err); } _next(); }); }; }

var pluginsCacheStr = "";
var pathPrefixCacheStr = "";

var astCacheKey = function astCacheKey(node) {
  return "transformer-remark-markdown-ast-".concat(node.internal.contentDigest, "-").concat(pluginsCacheStr, "-").concat(pathPrefixCacheStr);
};

var htmlCacheKey = function htmlCacheKey(node) {
  return "transformer-remark-markdown-html-".concat(node.internal.contentDigest, "-").concat(pluginsCacheStr, "-").concat(pathPrefixCacheStr);
};

var htmlAstCacheKey = function htmlAstCacheKey(node) {
  return "transformer-remark-markdown-html-ast-".concat(node.internal.contentDigest, "-").concat(pluginsCacheStr, "-").concat(pathPrefixCacheStr);
};

var headingsCacheKey = function headingsCacheKey(node) {
  return "transformer-remark-markdown-headings-".concat(node.internal.contentDigest, "-").concat(pluginsCacheStr, "-").concat(pathPrefixCacheStr);
};

var tableOfContentsCacheKey = function tableOfContentsCacheKey(node) {
  return "transformer-remark-markdown-toc-".concat(node.internal.contentDigest, "-").concat(pluginsCacheStr, "-").concat(pathPrefixCacheStr);
}; // ensure only one `/` in new url


var withPathPrefix = function withPathPrefix(url, pathPrefix) {
  return (pathPrefix + url).replace(/\/\//, "/");
};
/**
 * Map that keeps track of generation of AST to not generate it multiple
 * times in parallel.
 *
 * @type {Map<string,Promise>}
 */


var ASTPromiseMap = new Map();

module.exports = function (_ref, pluginOptions) {
  var type = _ref.type,
      store = _ref.store,
      pathPrefix = _ref.pathPrefix,
      getNode = _ref.getNode,
      cache = _ref.cache,
      reporter = _ref.reporter;

  if (type.name !== "MarkdownRemark") {
    return {};
  }

  pluginsCacheStr = pluginOptions.plugins.map(function (p) {
    return p.name;
  }).join("");
  pathPrefixCacheStr = pathPrefix || "";
  return new _bluebird.default(function (resolve, reject) {
    // Setup Remark.
    var remark = new _remark.default().data("settings", {
      commonmark: true,
      footnotes: true,
      pedantic: true
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = pluginOptions.plugins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _plugin = _step.value;

        var requiredPlugin = require(_plugin.resolve);

        if (_lodash.default.isFunction(requiredPlugin.setParserPlugins)) {
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = requiredPlugin.setParserPlugins(_plugin.pluginOptions)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var _parserPlugin = _step2.value;

              if (_lodash.default.isArray(_parserPlugin)) {
                var _parserPlugin2 = _slicedToArray(_parserPlugin, 2),
                    parser = _parserPlugin2[0],
                    options = _parserPlugin2[1];

                remark = remark.use(parser, options);
              } else {
                remark = remark.use(_parserPlugin);
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    function getAST(_x) {
      return _getAST.apply(this, arguments);
    }

    function _getAST() {
      _getAST = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(markdownNode) {
        var cacheKey, cachedAST, ASTGenerationPromise;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                cacheKey = astCacheKey(markdownNode);
                _context2.next = 3;
                return cache.get(cacheKey);

              case 3:
                cachedAST = _context2.sent;

                if (!cachedAST) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", cachedAST);

              case 8:
                if (!ASTPromiseMap.has(cacheKey)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 11;
                return ASTPromiseMap.get(cacheKey);

              case 11:
                return _context2.abrupt("return", _context2.sent);

              case 14:
                ASTGenerationPromise = new _bluebird.default(
                /*#__PURE__*/
                function () {
                  var _ref4 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee(resolve) {
                    var files, ast;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            files = _lodash.default.values(store.getState().nodes).filter(function (n) {
                              return n.internal.type === "File";
                            });
                            _context.next = 3;
                            return new _bluebird.default(function (resolve, reject) {
                              // Use Bluebird's Promise function "each" to run remark plugins serially.
                              _bluebird.default.each(pluginOptions.plugins, function (plugin) {
                                var requiredPlugin = require(plugin.resolve);

                                if (_lodash.default.isFunction(requiredPlugin.mutateSource)) {
                                  return requiredPlugin.mutateSource({
                                    markdownNode: markdownNode,
                                    files: files,
                                    getNode: getNode,
                                    reporter: reporter
                                  }, plugin.pluginOptions);
                                } else {
                                  return _bluebird.default.resolve();
                                }
                              }).then(function () {
                                var markdownAST = remark.parse(markdownNode.internal.content);

                                if (pathPrefix) {
                                  // Ensure relative links include `pathPrefix`
                                  (0, _unistUtilVisit.default)(markdownAST, "link", function (node) {
                                    if (node.url && node.url.startsWith("/") && !node.url.startsWith("//")) {
                                      node.url = withPathPrefix(node.url, pathPrefix);
                                    }
                                  });
                                } // source => parse (can order parsing for dependencies) => typegen
                                //
                                // source plugins identify nodes, provide id, initial parse, know
                                // when nodes are created/removed/deleted
                                // get passed cached DataTree and return list of clean and dirty nodes.
                                // Also get passed `dirtyNodes` function which they can call with an array
                                // of node ids which will then get re-parsed and the inferred schema
                                // recreated (if inferring schema gets too expensive, can also
                                // cache the schema until a query fails at which point recreate the
                                // schema).
                                //
                                // parse plugins take data from source nodes and extend it, never mutate
                                // it. Freeze all nodes once done so typegen plugins can't change it
                                // this lets us save off the DataTree at that point as well as create
                                // indexes.
                                //
                                // typegen plugins identify further types of data that should be lazily
                                // computed due to their expense, or are hard to infer graphql type
                                // (markdown ast), or are need user input in order to derive e.g.
                                // markdown headers or date fields.
                                //
                                // wrap all resolve functions to (a) auto-memoize and (b) cache to disk any
                                // resolve function that takes longer than ~10ms (do research on this
                                // e.g. how long reading/writing to cache takes), and (c) track which
                                // queries are based on which source nodes. Also if connection of what
                                // which are always rerun if their underlying nodes change..
                                //
                                // every node type in DataTree gets a schema type automatically.
                                // typegen plugins just modify the auto-generated types to add derived fields
                                // as well as computationally expensive fields.


                                var files = _lodash.default.values(store.getState().nodes).filter(function (n) {
                                  return n.internal.type === "File";
                                }); // Use Bluebird's Promise function "each" to run remark plugins serially.


                                _bluebird.default.each(pluginOptions.plugins, function (plugin) {
                                  var requiredPlugin = require(plugin.resolve);

                                  if (_lodash.default.isFunction(requiredPlugin)) {
                                    return requiredPlugin({
                                      markdownAST: markdownAST,
                                      markdownNode: markdownNode,
                                      getNode: getNode,
                                      files: files,
                                      pathPrefix: pathPrefix,
                                      reporter: reporter
                                    }, plugin.pluginOptions);
                                  } else {
                                    return _bluebird.default.resolve();
                                  }
                                }).then(function () {
                                  resolve(markdownAST);
                                });
                              });
                            });

                          case 3:
                            ast = _context.sent;
                            // Save new AST to cache and return
                            cache.set(astCacheKey(markdownNode), ast); // We can now release promise, as we cached result

                            ASTPromiseMap.delete(astCacheKey);
                            return _context.abrupt("return", resolve(ast));

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, this);
                  }));

                  return function (_x6) {
                    return _ref4.apply(this, arguments);
                  };
                }());
                ASTPromiseMap.set(cacheKey, ASTGenerationPromise);
                _context2.next = 18;
                return ASTGenerationPromise;

              case 18:
                return _context2.abrupt("return", _context2.sent);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      return _getAST.apply(this, arguments);
    }

    function getHeadings(_x2) {
      return _getHeadings.apply(this, arguments);
    }

    function _getHeadings() {
      _getHeadings = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(markdownNode) {
        var cachedHeadings, ast, headings;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return cache.get(headingsCacheKey(markdownNode));

              case 2:
                cachedHeadings = _context3.sent;

                if (!cachedHeadings) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return", cachedHeadings);

              case 7:
                _context3.next = 9;
                return getAST(markdownNode);

              case 9:
                ast = _context3.sent;
                headings = (0, _unistUtilSelect.default)(ast, "heading").map(function (heading) {
                  return {
                    value: _lodash.default.first((0, _unistUtilSelect.default)(heading, "text").map(function (text) {
                      return text.value;
                    })),
                    depth: heading.depth
                  };
                });
                cache.set(headingsCacheKey(markdownNode), headings);
                return _context3.abrupt("return", headings);

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      return _getHeadings.apply(this, arguments);
    }

    function getTableOfContents(_x3) {
      return _getTableOfContents.apply(this, arguments);
    }

    function _getTableOfContents() {
      _getTableOfContents = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(markdownNode) {
        var cachedToc, ast, tocAst, toc, addSlugToUrl;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return cache.get(tableOfContentsCacheKey(markdownNode));

              case 2:
                cachedToc = _context4.sent;

                if (!cachedToc) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", cachedToc);

              case 7:
                _context4.next = 9;
                return getAST(markdownNode);

              case 9:
                ast = _context4.sent;
                tocAst = (0, _mdastUtilToc.default)(ast);

                if (tocAst.map) {
                  addSlugToUrl = function addSlugToUrl(node) {
                    if (node.url) {
                      node.url = [pathPrefix, markdownNode.fields.slug, node.url].join("/").replace(/\/\//g, "/");
                    }

                    if (node.children) {
                      node.children = node.children.map(function (node) {
                        return addSlugToUrl(node);
                      });
                    }

                    return node;
                  };

                  tocAst.map = addSlugToUrl(tocAst.map);
                  toc = (0, _hastUtilToHtml.default)((0, _mdastUtilToHast.default)(tocAst.map));
                } else {
                  toc = "";
                }

                cache.set(tableOfContentsCacheKey(markdownNode), toc);
                return _context4.abrupt("return", toc);

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      return _getTableOfContents.apply(this, arguments);
    }

    function getHTMLAst(_x4) {
      return _getHTMLAst.apply(this, arguments);
    }

    function _getHTMLAst() {
      _getHTMLAst = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(markdownNode) {
        var cachedAst, ast, htmlAst;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return cache.get(htmlAstCacheKey(markdownNode));

              case 2:
                cachedAst = _context5.sent;

                if (!cachedAst) {
                  _context5.next = 7;
                  break;
                }

                return _context5.abrupt("return", cachedAst);

              case 7:
                _context5.next = 9;
                return getAST(markdownNode);

              case 9:
                ast = _context5.sent;
                htmlAst = (0, _mdastUtilToHast.default)(ast, {
                  allowDangerousHTML: true
                }); // Save new HTML AST to cache and return

                cache.set(htmlAstCacheKey(markdownNode), htmlAst);
                return _context5.abrupt("return", htmlAst);

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));
      return _getHTMLAst.apply(this, arguments);
    }

    function getHTML(_x5) {
      return _getHTML.apply(this, arguments);
    }

    function _getHTML() {
      _getHTML = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(markdownNode) {
        var cachedHTML, ast, html;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return cache.get(htmlCacheKey(markdownNode));

              case 2:
                cachedHTML = _context6.sent;

                if (!cachedHTML) {
                  _context6.next = 7;
                  break;
                }

                return _context6.abrupt("return", cachedHTML);

              case 7:
                _context6.next = 9;
                return getHTMLAst(markdownNode);

              case 9:
                ast = _context6.sent;
                // Save new HTML to cache and return
                html = (0, _hastUtilToHtml.default)(ast, {
                  allowDangerousHTML: true
                }); // Save new HTML to cache and return

                cache.set(htmlCacheKey(markdownNode), html);
                return _context6.abrupt("return", html);

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));
      return _getHTML.apply(this, arguments);
    }

    var HeadingType = new _graphql.GraphQLObjectType({
      name: "MarkdownHeading",
      fields: {
        value: {
          type: _graphql.GraphQLString,
          resolve: function resolve(heading) {
            return heading.value;
          }
        },
        depth: {
          type: _graphql.GraphQLInt,
          resolve: function resolve(heading) {
            return heading.depth;
          }
        }
      }
    });
    var HeadingLevels = new _graphql.GraphQLEnumType({
      name: "HeadingLevels",
      values: {
        h1: {
          value: 1
        },
        h2: {
          value: 2
        },
        h3: {
          value: 3
        },
        h4: {
          value: 4
        },
        h5: {
          value: 5
        },
        h6: {
          value: 6
        }
      }
    });
    return resolve({
      html: {
        type: _graphql.GraphQLString,
        resolve: function resolve(markdownNode) {
          return getHTML(markdownNode);
        }
      },
      htmlAst: {
        type: _graphqlTypeJson.default,
        resolve: function resolve(markdownNode) {
          return getHTMLAst(markdownNode).then(function (ast) {
            var strippedAst = (0, _unistUtilRemovePosition.default)(_lodash.default.clone(ast), true);
            return (0, _hastUtilRaw.default)(strippedAst);
          });
        }
      },
      excerpt: {
        type: _graphql.GraphQLString,
        args: {
          pruneLength: {
            type: _graphql.GraphQLInt,
            defaultValue: 140
          }
        },
        resolve: function resolve(markdownNode, _ref2) {
          var pruneLength = _ref2.pruneLength;

          if (markdownNode.excerpt) {
            return _bluebird.default.resolve(markdownNode.excerpt);
          }

          return getAST(markdownNode).then(function (ast) {
            var excerptNodes = [];
            (0, _unistUtilVisit.default)(ast, function (node) {
              if (node.type === "text" || node.type === "inlineCode") {
                excerptNodes.push(node.value);
              }

              return;
            });
            return (0, _prune.default)(excerptNodes.join(" "), pruneLength, "\u2026");
          });
        }
      },
      headings: {
        type: new _graphql.GraphQLList(HeadingType),
        args: {
          depth: {
            type: HeadingLevels
          }
        },
        resolve: function resolve(markdownNode, _ref3) {
          var depth = _ref3.depth;
          return getHeadings(markdownNode).then(function (headings) {
            if (typeof depth === "number") {
              headings = headings.filter(function (heading) {
                return heading.depth === depth;
              });
            }

            return headings;
          });
        }
      },
      timeToRead: {
        type: _graphql.GraphQLInt,
        resolve: function resolve(markdownNode) {
          return getHTML(markdownNode).then(function (html) {
            var timeToRead = 0;
            var pureText = (0, _sanitizeHtml.default)(html, {
              allowTags: []
            });
            var avgWPM = 265;

            var wordCount = _lodash.default.words(pureText).length;

            timeToRead = Math.round(wordCount / avgWPM);

            if (timeToRead === 0) {
              timeToRead = 1;
            }

            return timeToRead;
          });
        }
      },
      tableOfContents: {
        type: _graphql.GraphQLString,
        resolve: function resolve(markdownNode) {
          return getTableOfContents(markdownNode);
        }
      },
      // TODO add support for non-latin languages https://github.com/wooorm/remark/issues/251#issuecomment-296731071
      wordCount: {
        type: new _graphql.GraphQLObjectType({
          name: "wordCount",
          fields: {
            paragraphs: {
              type: _graphql.GraphQLInt
            },
            sentences: {
              type: _graphql.GraphQLInt
            },
            words: {
              type: _graphql.GraphQLInt
            }
          }
        }),
        resolve: function resolve(markdownNode) {
          var counts = {};
          (0, _unified.default)().use(_remarkParse.default).use(_remarkRetext.default, (0, _unified.default)().use(_retextEnglish.default).use(count)).use(_remarkStringify.default).processSync(markdownNode.internal.content);
          return {
            paragraphs: counts.ParagraphNode,
            sentences: counts.SentenceNode,
            words: counts.WordNode
          };

          function count() {
            return counter;

            function counter(tree) {
              (0, _unistUtilVisit.default)(tree, visitor);

              function visitor(node) {
                counts[node.type] = (counts[node.type] || 0) + 1;
              }
            }
          }
        }
      }
    });
  });
};
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Root = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _m2React = require("../../m2-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Root = function Root(_ref) {
  var routes = _ref.routes,
      store = _ref.store,
      routeType = _ref.routeType;

  var _routes = (0, _m2React.renderRoutes)(routes, '/', routeType);

  return _react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _routes);
};

exports.Root = Root;
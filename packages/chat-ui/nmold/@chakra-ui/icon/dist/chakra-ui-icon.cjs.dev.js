'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('@chakra-ui/system');
var utils = require('@chakra-ui/utils');
var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var _excluded = ["as", "viewBox", "color", "focusable", "children", "className", "__css"];
var fallbackIcon = {
  path: /*#__PURE__*/React__namespace.createElement("g", {
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, /*#__PURE__*/React__namespace.createElement("path", {
    strokeLinecap: "round",
    fill: "none",
    d: "M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"
  }), /*#__PURE__*/React__namespace.createElement("path", {
    fill: "currentColor",
    strokeLinecap: "round",
    d: "M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"
  }), /*#__PURE__*/React__namespace.createElement("circle", {
    fill: "none",
    strokeMiterlimit: "10",
    cx: "12",
    cy: "12",
    r: "11.25"
  })),
  viewBox: "0 0 24 24"
};
var Icon = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var element = props.as,
      viewBox = props.viewBox,
      _props$color = props.color,
      color = _props$color === void 0 ? "currentColor" : _props$color,
      _props$focusable = props.focusable,
      focusable = _props$focusable === void 0 ? false : _props$focusable,
      children = props.children,
      className = props.className,
      __css = props.__css,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var _className = utils.cx("chakra-icon", className);

  var styles = _extends({
    w: "1em",
    h: "1em",
    display: "inline-block",
    lineHeight: "1em",
    flexShrink: 0,
    color: color
  }, __css);

  var shared = {
    ref: ref,
    focusable: focusable,
    className: _className,
    __css: styles
  };

  var _viewBox = viewBox != null ? viewBox : fallbackIcon.viewBox;
  /**
   * If you're using an icon library like `react-icons`.
   * Note: anyone passing the `as` prop, should manage the `viewBox` from the external component
   */


  if (element && typeof element !== "string") {
    return /*#__PURE__*/React__namespace.createElement(system.chakra.svg, _extends({
      as: element
    }, shared, rest));
  }

  var _path = children != null ? children : fallbackIcon.path;

  return /*#__PURE__*/React__namespace.createElement(system.chakra.svg, _extends({
    verticalAlign: "middle",
    viewBox: _viewBox
  }, shared, rest), _path);
});

if (utils.__DEV__) {
  Icon.displayName = "Icon";
}

var Icon$1 = Icon;

function createIcon(options) {
  var _options$viewBox = options.viewBox,
      viewBox = _options$viewBox === void 0 ? "0 0 24 24" : _options$viewBox,
      pathDefinition = options.d,
      path = options.path,
      displayName = options.displayName,
      _options$defaultProps = options.defaultProps,
      defaultProps = _options$defaultProps === void 0 ? {} : _options$defaultProps;
  var Comp = /*#__PURE__*/system.forwardRef(function (props, ref) {
    return /*#__PURE__*/React__namespace.createElement(Icon, _extends({
      ref: ref,
      viewBox: viewBox
    }, defaultProps, props), path != null ? path : /*#__PURE__*/React__namespace.createElement("path", {
      fill: "currentColor",
      d: pathDefinition
    }));
  });

  if (utils.__DEV__) {
    Comp.displayName = displayName;
  }

  return Comp;
}

exports.Icon = Icon;
exports.createIcon = createIcon;
exports["default"] = Icon$1;

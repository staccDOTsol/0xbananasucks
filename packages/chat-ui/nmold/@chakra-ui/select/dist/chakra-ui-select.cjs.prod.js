'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var formControl = require('@chakra-ui/form-control');
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

var _excluded = ["children", "placeholder", "className"],
    _excluded2 = ["rootProps", "placeholder", "icon", "color", "height", "h", "minH", "minHeight", "iconColor", "iconSize", "isFullWidth"],
    _excluded3 = ["children"];
var SelectField = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var children = props.children,
      placeholder = props.placeholder,
      className = props.className,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  return /*#__PURE__*/React__namespace.createElement(system.chakra.select, _extends({}, rest, {
    ref: ref,
    className: utils.cx("chakra-select", className)
  }), placeholder && /*#__PURE__*/React__namespace.createElement("option", {
    value: ""
  }, placeholder), children);
});

if (utils.__DEV__) {
  SelectField.displayName = "SelectField";
}

/**
 * React component used to select one item from a list of options.
 */
var Select = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var styles = system.useMultiStyleConfig("Select", props);

  var _omitThemingProps = system.omitThemingProps(props),
      rootProps = _omitThemingProps.rootProps,
      placeholder = _omitThemingProps.placeholder,
      icon = _omitThemingProps.icon,
      color = _omitThemingProps.color,
      height = _omitThemingProps.height,
      h = _omitThemingProps.h,
      minH = _omitThemingProps.minH,
      minHeight = _omitThemingProps.minHeight,
      iconColor = _omitThemingProps.iconColor,
      iconSize = _omitThemingProps.iconSize;
      _omitThemingProps.isFullWidth;
      var rest = _objectWithoutPropertiesLoose(_omitThemingProps, _excluded2);

  var _split = utils.split(rest, system.layoutPropNames),
      layoutProps = _split[0],
      otherProps = _split[1];

  var ownProps = formControl.useFormControl(otherProps);
  var rootStyles = {
    width: "100%",
    height: "fit-content",
    position: "relative",
    color: color
  };
  var fieldStyles = utils.mergeWith({
    paddingEnd: "2rem"
  }, styles.field, {
    _focus: {
      zIndex: "unset"
    }
  });
  return /*#__PURE__*/React__namespace.createElement(system.chakra.div, _extends({
    className: "chakra-select__wrapper",
    __css: rootStyles
  }, layoutProps, rootProps), /*#__PURE__*/React__namespace.createElement(SelectField, _extends({
    ref: ref,
    height: h != null ? h : height,
    minH: minH != null ? minH : minHeight,
    placeholder: placeholder
  }, ownProps, {
    __css: fieldStyles
  }), props.children), /*#__PURE__*/React__namespace.createElement(SelectIcon, _extends({
    "data-disabled": utils.dataAttr(ownProps.disabled)
  }, (iconColor || color) && {
    color: iconColor || color
  }, {
    __css: styles.icon
  }, iconSize && {
    fontSize: iconSize
  }), icon));
});

if (utils.__DEV__) {
  Select.displayName = "Select";
}

var DefaultIcon = function DefaultIcon(props) {
  return /*#__PURE__*/React__namespace.createElement("svg", _extends({
    viewBox: "0 0 24 24"
  }, props), /*#__PURE__*/React__namespace.createElement("path", {
    fill: "currentColor",
    d: "M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
  }));
};
var IconWrapper = system.chakra("div", {
  baseStyle: {
    position: "absolute",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    top: "50%",
    transform: "translateY(-50%)"
  }
});

var SelectIcon = function SelectIcon(props) {
  var _props$children = props.children,
      children = _props$children === void 0 ? /*#__PURE__*/React__namespace.createElement(DefaultIcon, null) : _props$children,
      rest = _objectWithoutPropertiesLoose(props, _excluded3);

  var clone = /*#__PURE__*/React__namespace.cloneElement(children, {
    role: "presentation",
    className: "chakra-select__icon",
    focusable: false,
    "aria-hidden": true,
    // force icon to adhere to `IconWrapper` styles
    style: {
      width: "1em",
      height: "1em",
      color: "currentColor"
    }
  });
  return /*#__PURE__*/React__namespace.createElement(IconWrapper, _extends({}, rest, {
    className: "chakra-select__icon-wrapper"
  }), /*#__PURE__*/React__namespace.isValidElement(children) ? clone : null);
};

if (utils.__DEV__) {
  SelectIcon.displayName = "SelectIcon";
}

exports.DefaultIcon = DefaultIcon;
exports.Select = Select;
exports.SelectField = SelectField;
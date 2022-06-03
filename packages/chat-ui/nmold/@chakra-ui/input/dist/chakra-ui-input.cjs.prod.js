'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var formControl = require('@chakra-ui/form-control');
var system = require('@chakra-ui/system');
var utils = require('@chakra-ui/utils');
var React = require('react');
var reactUtils = require('@chakra-ui/react-utils');

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

/**
 * Input
 *
 * Element that allows users enter single valued data.
 */
var Input = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var styles = system.useMultiStyleConfig("Input", props);
  var ownProps = system.omitThemingProps(props);
  var input = formControl.useFormControl(ownProps);

  var _className = utils.cx("chakra-input", props.className);

  return /*#__PURE__*/React__namespace.createElement(system.chakra.input, _extends({}, input, {
    __css: styles.field,
    ref: ref,
    className: _className
  }));
});

if (utils.__DEV__) {
  Input.displayName = "Input";
} // This is used in `input-group.tsx`


Input.id = "Input";

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

var _excluded$2 = ["placement"];
var placements = {
  left: {
    marginEnd: "-1px",
    borderEndRadius: 0,
    borderEndColor: "transparent"
  },
  right: {
    marginStart: "-1px",
    borderStartRadius: 0,
    borderStartColor: "transparent"
  }
};
var StyledAddon = system.chakra("div", {
  baseStyle: {
    flex: "0 0 auto",
    width: "auto",
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap"
  }
});

/**
 * InputAddon
 *
 * Element to append or prepend to an input
 */
var InputAddon = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var _placements$placement;

  var _props$placement = props.placement,
      placement = _props$placement === void 0 ? "left" : _props$placement,
      rest = _objectWithoutPropertiesLoose(props, _excluded$2);

  var placementStyles = (_placements$placement = placements[placement]) != null ? _placements$placement : {};
  var styles = system.useStyles();
  return /*#__PURE__*/React__namespace.createElement(StyledAddon, _extends({
    ref: ref
  }, rest, {
    __css: _extends({}, styles.addon, placementStyles)
  }));
});

if (utils.__DEV__) {
  InputAddon.displayName = "InputAddon";
}
/**
 * InputLeftAddon
 *
 * Element to append to the left of an input
 */


var InputLeftAddon = /*#__PURE__*/system.forwardRef(function (props, ref) {
  return /*#__PURE__*/React__namespace.createElement(InputAddon, _extends({
    ref: ref,
    placement: "left"
  }, props, {
    className: utils.cx("chakra-input__left-addon", props.className)
  }));
});

if (utils.__DEV__) {
  InputLeftAddon.displayName = "InputLeftAddon";
} // This is used in `input-group.tsx`


InputLeftAddon.id = "InputLeftAddon";
/**
 * InputRightAddon
 *
 * Element to append to the right of an input
 */

var InputRightAddon = /*#__PURE__*/system.forwardRef(function (props, ref) {
  return /*#__PURE__*/React__namespace.createElement(InputAddon, _extends({
    ref: ref,
    placement: "right"
  }, props, {
    className: utils.cx("chakra-input__right-addon", props.className)
  }));
});

if (utils.__DEV__) {
  InputRightAddon.displayName = "InputRightAddon";
} // This is used in `input-group.tsx`


InputRightAddon.id = "InputRightAddon";

var _excluded$1 = ["children", "className"];
var InputGroup = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var styles = system.useMultiStyleConfig("Input", props);

  var _omitThemingProps = system.omitThemingProps(props),
      children = _omitThemingProps.children,
      className = _omitThemingProps.className,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, _excluded$1);

  var _className = utils.cx("chakra-input__group", className);

  var groupStyles = {};
  var validChildren = reactUtils.getValidChildren(children);
  var input = styles.field;
  validChildren.forEach(function (child) {
    if (!styles) return;

    if (input && child.type.id === "InputLeftElement") {
      var _input$height;

      groupStyles.paddingStart = (_input$height = input.height) != null ? _input$height : input.h;
    }

    if (input && child.type.id === "InputRightElement") {
      var _input$height2;

      groupStyles.paddingEnd = (_input$height2 = input.height) != null ? _input$height2 : input.h;
    }

    if (child.type.id === "InputRightAddon") {
      groupStyles.borderEndRadius = 0;
    }

    if (child.type.id === "InputLeftAddon") {
      groupStyles.borderStartRadius = 0;
    }
  });
  var clones = validChildren.map(function (child) {
    var _child$props, _child$props2;

    /**
     * Make it possible to override the size and variant from `Input`
     */
    var theming = {
      size: ((_child$props = child.props) == null ? void 0 : _child$props.size) || props.size,
      variant: ((_child$props2 = child.props) == null ? void 0 : _child$props2.variant) || props.variant
    };
    return child.type.id !== "Input" ? /*#__PURE__*/React__namespace.cloneElement(child, theming) : /*#__PURE__*/React__namespace.cloneElement(child, Object.assign(theming, groupStyles, child.props));
  });
  return /*#__PURE__*/React__namespace.createElement(system.chakra.div, _extends({
    className: _className,
    ref: ref,
    __css: {
      width: "100%",
      display: "flex",
      position: "relative"
    }
  }, rest), /*#__PURE__*/React__namespace.createElement(system.StylesProvider, {
    value: styles
  }, clones));
});

if (utils.__DEV__) {
  InputGroup.displayName = "InputGroup";
}

var _excluded = ["placement"],
    _excluded2 = ["className"],
    _excluded3 = ["className"];
var StyledElement = system.chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    zIndex: 2
  }
});
var InputElement = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var _input$height, _input$height2, _elementStyles;

  var _props$placement = props.placement,
      placement = _props$placement === void 0 ? "left" : _props$placement,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var styles = system.useStyles();
  var input = styles.field;
  var attr = placement === "left" ? "insetStart" : "insetEnd";
  var elementStyles = (_elementStyles = {}, _elementStyles[attr] = "0", _elementStyles.width = (_input$height = input == null ? void 0 : input.height) != null ? _input$height : input == null ? void 0 : input.h, _elementStyles.height = (_input$height2 = input == null ? void 0 : input.height) != null ? _input$height2 : input == null ? void 0 : input.h, _elementStyles.fontSize = input == null ? void 0 : input.fontSize, _elementStyles);
  return /*#__PURE__*/React__namespace.createElement(StyledElement, _extends({
    ref: ref,
    __css: elementStyles
  }, rest));
}); // This is used in `input-group.tsx`

InputElement.id = "InputElement";

if (utils.__DEV__) {
  InputElement.displayName = "InputElement";
}

var InputLeftElement = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose(props, _excluded2);

  var _className = utils.cx("chakra-input__left-element", className);

  return /*#__PURE__*/React__namespace.createElement(InputElement, _extends({
    ref: ref,
    placement: "left",
    className: _className
  }, rest));
}); // This is used in `input-group.tsx`

InputLeftElement.id = "InputLeftElement";

if (utils.__DEV__) {
  InputLeftElement.displayName = "InputLeftElement";
}

var InputRightElement = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var className = props.className,
      rest = _objectWithoutPropertiesLoose(props, _excluded3);

  var _className = utils.cx("chakra-input__right-element", className);

  return /*#__PURE__*/React__namespace.createElement(InputElement, _extends({
    ref: ref,
    placement: "right",
    className: _className
  }, rest));
}); // This is used in `input-group.tsx`

InputRightElement.id = "InputRightElement";

if (utils.__DEV__) {
  InputRightElement.displayName = "InputRightElement";
}

exports.Input = Input;
exports.InputAddon = InputAddon;
exports.InputGroup = InputGroup;
exports.InputLeftAddon = InputLeftAddon;
exports.InputLeftElement = InputLeftElement;
exports.InputRightAddon = InputRightAddon;
exports.InputRightElement = InputRightElement;
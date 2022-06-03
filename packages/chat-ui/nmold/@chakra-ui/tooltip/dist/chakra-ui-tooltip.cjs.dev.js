'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var popper = require('@chakra-ui/popper');
var portal = require('@chakra-ui/portal');
var system = require('@chakra-ui/system');
var utils = require('@chakra-ui/utils');
var visuallyHidden = require('@chakra-ui/visually-hidden');
var framerMotion = require('framer-motion');
var React = require('react');
var hooks = require('@chakra-ui/hooks');
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

var scale = {
  exit: {
    scale: 0.85,
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.15,
        easings: "easeInOut"
      },
      scale: {
        duration: 0.2,
        easings: "easeInOut"
      }
    }
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      opacity: {
        easings: "easeOut",
        duration: 0.2
      },
      scale: {
        duration: 0.2,
        ease: [0.175, 0.885, 0.4, 1.1]
      }
    }
  }
};

var _excluded$1 = ["openDelay", "closeDelay", "closeOnClick", "closeOnMouseDown", "onOpen", "onClose", "placement", "id", "isOpen", "defaultIsOpen", "arrowSize", "arrowShadowColor", "arrowPadding", "modifiers", "isDisabled", "gutter", "offset", "direction"];
function useTooltip(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$openDelay = _props.openDelay,
      openDelay = _props$openDelay === void 0 ? 0 : _props$openDelay,
      _props$closeDelay = _props.closeDelay,
      closeDelay = _props$closeDelay === void 0 ? 0 : _props$closeDelay,
      _props$closeOnClick = _props.closeOnClick,
      closeOnClick = _props$closeOnClick === void 0 ? true : _props$closeOnClick,
      closeOnMouseDown = _props.closeOnMouseDown,
      onOpenProp = _props.onOpen,
      onCloseProp = _props.onClose,
      placement = _props.placement,
      id = _props.id,
      isOpenProp = _props.isOpen,
      defaultIsOpen = _props.defaultIsOpen,
      _props$arrowSize = _props.arrowSize,
      arrowSize = _props$arrowSize === void 0 ? 10 : _props$arrowSize,
      arrowShadowColor = _props.arrowShadowColor,
      arrowPadding = _props.arrowPadding,
      modifiers = _props.modifiers,
      isDisabled = _props.isDisabled,
      gutter = _props.gutter,
      offset = _props.offset,
      direction = _props.direction,
      htmlProps = _objectWithoutPropertiesLoose(_props, _excluded$1);

  var _useDisclosure = hooks.useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen: defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp
  }),
      isOpen = _useDisclosure.isOpen,
      onOpen = _useDisclosure.onOpen,
      onClose = _useDisclosure.onClose;

  var _usePopper = popper.usePopper({
    enabled: isOpen,
    placement: placement,
    arrowPadding: arrowPadding,
    modifiers: modifiers,
    gutter: gutter,
    offset: offset,
    direction: direction
  }),
      referenceRef = _usePopper.referenceRef,
      getPopperProps = _usePopper.getPopperProps,
      getArrowInnerProps = _usePopper.getArrowInnerProps,
      getArrowProps = _usePopper.getArrowProps;

  var tooltipId = hooks.useId(id, "tooltip");
  var ref = React__namespace.useRef(null);
  var enterTimeout = React__namespace.useRef();
  var exitTimeout = React__namespace.useRef();
  var openWithDelay = React__namespace.useCallback(function () {
    if (!isDisabled) {
      enterTimeout.current = window.setTimeout(onOpen, openDelay);
    }
  }, [isDisabled, onOpen, openDelay]);
  var closeWithDelay = React__namespace.useCallback(function () {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }

    exitTimeout.current = window.setTimeout(onClose, closeDelay);
  }, [closeDelay, onClose]);
  var onClick = React__namespace.useCallback(function () {
    if (closeOnClick) {
      closeWithDelay();
    }
  }, [closeOnClick, closeWithDelay]);
  var onMouseDown = React__namespace.useCallback(function () {
    if (closeOnMouseDown) {
      closeWithDelay();
    }
  }, [closeOnMouseDown, closeWithDelay]);
  var onKeyDown = React__namespace.useCallback(function (event) {
    if (isOpen && event.key === "Escape") {
      closeWithDelay();
    }
  }, [isOpen, closeWithDelay]);
  hooks.useEventListener("keydown", onKeyDown);
  React__namespace.useEffect(function () {
    return function () {
      clearTimeout(enterTimeout.current);
      clearTimeout(exitTimeout.current);
    };
  }, []);
  /**
   * This allows for catching mouseleave events when the tooltip
   * trigger is disabled. There's currently a known issue in
   * React regarding the onMouseLeave polyfill.
   * @see https://github.com/facebook/react/issues/11972
   */

  hooks.useEventListener("mouseleave", closeWithDelay, function () {
    return ref.current;
  });
  var getTriggerProps = React__namespace.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends({}, props, {
      ref: reactUtils.mergeRefs(ref, _ref, referenceRef),
      onMouseEnter: utils.callAllHandlers(props.onMouseEnter, openWithDelay),
      onClick: utils.callAllHandlers(props.onClick, onClick),
      onMouseDown: utils.callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: utils.callAllHandlers(props.onFocus, openWithDelay),
      onBlur: utils.callAllHandlers(props.onBlur, closeWithDelay),
      "aria-describedby": isOpen ? tooltipId : undefined
    });

    return triggerProps;
  }, [openWithDelay, closeWithDelay, onMouseDown, isOpen, tooltipId, onClick, referenceRef]);
  var getTooltipPositionerProps = React__namespace.useCallback(function (props, forwardedRef) {
    var _extends2;

    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return getPopperProps(_extends({}, props, {
      style: _extends({}, props.style, (_extends2 = {}, _extends2[popper.popperCSSVars.arrowSize["var"]] = arrowSize ? utils.px(arrowSize) : undefined, _extends2[popper.popperCSSVars.arrowShadowColor["var"]] = arrowShadowColor, _extends2))
    }), forwardedRef);
  }, [getPopperProps, arrowSize, arrowShadowColor]);
  var getTooltipProps = React__namespace.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var tooltipProps = _extends({
      ref: _ref
    }, htmlProps, props, {
      id: tooltipId,
      role: "tooltip",
      style: _extends({}, props.style, {
        position: "relative",
        transformOrigin: popper.popperCSSVars.transformOrigin.varRef
      })
    });

    return tooltipProps;
  }, [htmlProps, tooltipId]);
  return {
    isOpen: isOpen,
    show: openWithDelay,
    hide: closeWithDelay,
    getTriggerProps: getTriggerProps,
    getTooltipProps: getTooltipProps,
    getTooltipPositionerProps: getTooltipPositionerProps,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps
  };
}

var _excluded = ["children", "label", "shouldWrapChildren", "aria-label", "hasArrow", "bg", "portalProps"];
var StyledTooltip = system.chakra(framerMotion.motion.div);
/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/docs/overlay/tooltip
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#tooltip
 */

var Tooltip = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var styles = system.useStyleConfig("Tooltip", props);
  var ownProps = system.omitThemingProps(props);
  var theme = system.useTheme();

  var children = ownProps.children,
      label = ownProps.label,
      shouldWrapChildren = ownProps.shouldWrapChildren,
      ariaLabel = ownProps["aria-label"],
      hasArrow = ownProps.hasArrow,
      bg = ownProps.bg,
      portalProps = ownProps.portalProps,
      rest = _objectWithoutPropertiesLoose(ownProps, _excluded);

  if (bg) {
    styles.bg = bg;
    styles[popper.popperCSSVars.arrowBg["var"]] = utils.getCSSVar(theme, "colors", bg);
  }

  var tooltip = useTooltip(_extends({}, rest, {
    direction: theme.direction
  }));
  var shouldWrap = utils.isString(children) || shouldWrapChildren;
  var trigger;

  if (shouldWrap) {
    trigger = /*#__PURE__*/React__namespace.createElement(system.chakra.span, _extends({
      tabIndex: 0
    }, tooltip.getTriggerProps()), children);
  } else {
    /**
     * Ensure tooltip has only one child node
     */
    var child = React__namespace.Children.only(children);
    trigger = /*#__PURE__*/React__namespace.cloneElement(child, tooltip.getTriggerProps(child.props, child.ref));
  }

  var hasAriaLabel = !!ariaLabel;

  var _tooltipProps = tooltip.getTooltipProps({}, ref);

  var tooltipProps = hasAriaLabel ? utils.omit(_tooltipProps, ["role", "id"]) : _tooltipProps;
  var hiddenProps = utils.pick(_tooltipProps, ["role", "id"]);
  /**
   * If the `label` is empty, there's no
   * point showing the tooltip. Let's simply return back the children
   */

  if (!label) {
    return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, children);
  }

  return /*#__PURE__*/React__namespace.createElement(React__namespace.Fragment, null, trigger, /*#__PURE__*/React__namespace.createElement(framerMotion.AnimatePresence, null, tooltip.isOpen && /*#__PURE__*/React__namespace.createElement(portal.Portal, portalProps, /*#__PURE__*/React__namespace.createElement(system.chakra.div, _extends({}, tooltip.getTooltipPositionerProps(), {
    __css: {
      zIndex: styles.zIndex,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React__namespace.createElement(StyledTooltip, _extends({
    variants: scale
  }, tooltipProps, {
    initial: "exit",
    animate: "enter",
    exit: "exit",
    __css: styles
  }), label, hasAriaLabel && /*#__PURE__*/React__namespace.createElement(visuallyHidden.VisuallyHidden, hiddenProps, ariaLabel), hasArrow && /*#__PURE__*/React__namespace.createElement(system.chakra.div, {
    "data-popper-arrow": true,
    className: "chakra-tooltip__arrow-wrapper"
  }, /*#__PURE__*/React__namespace.createElement(system.chakra.div, {
    "data-popper-arrow-inner": true,
    className: "chakra-tooltip__arrow",
    __css: {
      bg: styles.bg
    }
  })))))));
});

if (utils.__DEV__) {
  Tooltip.displayName = "Tooltip";
}

exports.Tooltip = Tooltip;
exports.useTooltip = useTooltip;

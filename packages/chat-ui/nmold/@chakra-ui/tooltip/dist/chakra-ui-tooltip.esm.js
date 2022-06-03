import { usePopper, popperCSSVars } from '@chakra-ui/popper';
import { Portal } from '@chakra-ui/portal';
import { chakra, forwardRef, useStyleConfig, omitThemingProps, useTheme } from '@chakra-ui/system';
import { callAllHandlers, px, getCSSVar, isString, omit, pick, __DEV__ } from '@chakra-ui/utils';
import { VisuallyHidden } from '@chakra-ui/visually-hidden';
import { motion, AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { useDisclosure, useId, useEventListener } from '@chakra-ui/hooks';
import { mergeRefs } from '@chakra-ui/react-utils';

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

  var _useDisclosure = useDisclosure({
    isOpen: isOpenProp,
    defaultIsOpen: defaultIsOpen,
    onOpen: onOpenProp,
    onClose: onCloseProp
  }),
      isOpen = _useDisclosure.isOpen,
      onOpen = _useDisclosure.onOpen,
      onClose = _useDisclosure.onClose;

  var _usePopper = usePopper({
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

  var tooltipId = useId(id, "tooltip");
  var ref = React.useRef(null);
  var enterTimeout = React.useRef();
  var exitTimeout = React.useRef();
  var openWithDelay = React.useCallback(function () {
    if (!isDisabled) {
      enterTimeout.current = window.setTimeout(onOpen, openDelay);
    }
  }, [isDisabled, onOpen, openDelay]);
  var closeWithDelay = React.useCallback(function () {
    if (enterTimeout.current) {
      clearTimeout(enterTimeout.current);
    }

    exitTimeout.current = window.setTimeout(onClose, closeDelay);
  }, [closeDelay, onClose]);
  var onClick = React.useCallback(function () {
    if (closeOnClick) {
      closeWithDelay();
    }
  }, [closeOnClick, closeWithDelay]);
  var onMouseDown = React.useCallback(function () {
    if (closeOnMouseDown) {
      closeWithDelay();
    }
  }, [closeOnMouseDown, closeWithDelay]);
  var onKeyDown = React.useCallback(function (event) {
    if (isOpen && event.key === "Escape") {
      closeWithDelay();
    }
  }, [isOpen, closeWithDelay]);
  useEventListener("keydown", onKeyDown);
  React.useEffect(function () {
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

  useEventListener("mouseleave", closeWithDelay, function () {
    return ref.current;
  });
  var getTriggerProps = React.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends({}, props, {
      ref: mergeRefs(ref, _ref, referenceRef),
      onMouseEnter: callAllHandlers(props.onMouseEnter, openWithDelay),
      onClick: callAllHandlers(props.onClick, onClick),
      onMouseDown: callAllHandlers(props.onMouseDown, onMouseDown),
      onFocus: callAllHandlers(props.onFocus, openWithDelay),
      onBlur: callAllHandlers(props.onBlur, closeWithDelay),
      "aria-describedby": isOpen ? tooltipId : undefined
    });

    return triggerProps;
  }, [openWithDelay, closeWithDelay, onMouseDown, isOpen, tooltipId, onClick, referenceRef]);
  var getTooltipPositionerProps = React.useCallback(function (props, forwardedRef) {
    var _extends2;

    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return getPopperProps(_extends({}, props, {
      style: _extends({}, props.style, (_extends2 = {}, _extends2[popperCSSVars.arrowSize["var"]] = arrowSize ? px(arrowSize) : undefined, _extends2[popperCSSVars.arrowShadowColor["var"]] = arrowShadowColor, _extends2))
    }), forwardedRef);
  }, [getPopperProps, arrowSize, arrowShadowColor]);
  var getTooltipProps = React.useCallback(function (props, _ref) {
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
        transformOrigin: popperCSSVars.transformOrigin.varRef
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
var StyledTooltip = chakra(motion.div);
/**
 * Tooltips display informative text when users hover, focus on, or tap an element.
 *
 * @see Docs     https://chakra-ui.com/docs/overlay/tooltip
 * @see WAI-ARIA https://www.w3.org/TR/wai-aria-practices/#tooltip
 */

var Tooltip = /*#__PURE__*/forwardRef(function (props, ref) {
  var styles = useStyleConfig("Tooltip", props);
  var ownProps = omitThemingProps(props);
  var theme = useTheme();

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
    styles[popperCSSVars.arrowBg["var"]] = getCSSVar(theme, "colors", bg);
  }

  var tooltip = useTooltip(_extends({}, rest, {
    direction: theme.direction
  }));
  var shouldWrap = isString(children) || shouldWrapChildren;
  var trigger;

  if (shouldWrap) {
    trigger = /*#__PURE__*/React.createElement(chakra.span, _extends({
      tabIndex: 0
    }, tooltip.getTriggerProps()), children);
  } else {
    /**
     * Ensure tooltip has only one child node
     */
    var child = React.Children.only(children);
    trigger = /*#__PURE__*/React.cloneElement(child, tooltip.getTriggerProps(child.props, child.ref));
  }

  var hasAriaLabel = !!ariaLabel;

  var _tooltipProps = tooltip.getTooltipProps({}, ref);

  var tooltipProps = hasAriaLabel ? omit(_tooltipProps, ["role", "id"]) : _tooltipProps;
  var hiddenProps = pick(_tooltipProps, ["role", "id"]);
  /**
   * If the `label` is empty, there's no
   * point showing the tooltip. Let's simply return back the children
   */

  if (!label) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, trigger, /*#__PURE__*/React.createElement(AnimatePresence, null, tooltip.isOpen && /*#__PURE__*/React.createElement(Portal, portalProps, /*#__PURE__*/React.createElement(chakra.div, _extends({}, tooltip.getTooltipPositionerProps(), {
    __css: {
      zIndex: styles.zIndex,
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement(StyledTooltip, _extends({
    variants: scale
  }, tooltipProps, {
    initial: "exit",
    animate: "enter",
    exit: "exit",
    __css: styles
  }), label, hasAriaLabel && /*#__PURE__*/React.createElement(VisuallyHidden, hiddenProps, ariaLabel), hasArrow && /*#__PURE__*/React.createElement(chakra.div, {
    "data-popper-arrow": true,
    className: "chakra-tooltip__arrow-wrapper"
  }, /*#__PURE__*/React.createElement(chakra.div, {
    "data-popper-arrow-inner": true,
    className: "chakra-tooltip__arrow",
    __css: {
      bg: styles.bg
    }
  })))))));
});

if (__DEV__) {
  Tooltip.displayName = "Tooltip";
}

export { Tooltip, useTooltip };
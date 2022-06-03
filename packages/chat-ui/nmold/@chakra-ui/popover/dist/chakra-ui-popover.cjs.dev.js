'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var closeButton = require('@chakra-ui/close-button');
var system = require('@chakra-ui/system');
var utils = require('@chakra-ui/utils');
var React = require('react');
var reactUtils = require('@chakra-ui/react-utils');
var framerMotion = require('framer-motion');
var hooks = require('@chakra-ui/hooks');
var popper = require('@chakra-ui/popper');

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

var _createContext = reactUtils.createContext({
  name: "PopoverContext",
  errorMessage: "usePopoverContext: `context` is undefined. Seems you forgot to wrap all popover components within `<Popover />`"
}),
    PopoverProvider = _createContext[0],
    usePopoverContext = _createContext[1];

var mergeVariants = function mergeVariants(variants) {
  if (!variants) return;
  return utils.mergeWith(variants, {
    enter: {
      visibility: "visible"
    },
    exit: {
      transitionEnd: {
        visibility: "hidden"
      }
    }
  });
};

var scaleFade = {
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: [0.4, 0, 1, 1]
    }
  },
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.15,
      ease: [0, 0, 0.2, 1]
    }
  }
};
var Section = framerMotion.motion(system.chakra.section);
var PopoverTransition = /*#__PURE__*/React__namespace["default"].forwardRef(function (props, ref) {
  var _usePopoverContext = usePopoverContext(),
      isOpen = _usePopoverContext.isOpen;

  return /*#__PURE__*/React__namespace["default"].createElement(Section, _extends({
    ref: ref,
    variants: mergeVariants(props.variants)
  }, props, {
    initial: false,
    animate: isOpen ? "enter" : "exit"
  }));
});
PopoverTransition.defaultProps = {
  variants: scaleFade
};

var _excluded$1 = ["closeOnBlur", "closeOnEsc", "initialFocusRef", "id", "returnFocusOnClose", "autoFocus", "arrowSize", "arrowShadowColor", "trigger", "openDelay", "closeDelay", "isLazy", "lazyBehavior", "computePositionOnMount"];
var TRIGGER = {
  click: "click",
  hover: "hover"
};

/**
 * @internal
 */
function usePopover(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      _props$closeOnBlur = _props.closeOnBlur,
      closeOnBlur = _props$closeOnBlur === void 0 ? true : _props$closeOnBlur,
      _props$closeOnEsc = _props.closeOnEsc,
      closeOnEsc = _props$closeOnEsc === void 0 ? true : _props$closeOnEsc,
      initialFocusRef = _props.initialFocusRef,
      id = _props.id,
      _props$returnFocusOnC = _props.returnFocusOnClose,
      returnFocusOnClose = _props$returnFocusOnC === void 0 ? true : _props$returnFocusOnC,
      _props$autoFocus = _props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus,
      arrowSize = _props.arrowSize,
      arrowShadowColor = _props.arrowShadowColor,
      _props$trigger = _props.trigger,
      trigger = _props$trigger === void 0 ? TRIGGER.click : _props$trigger,
      _props$openDelay = _props.openDelay,
      openDelay = _props$openDelay === void 0 ? 200 : _props$openDelay,
      _props$closeDelay = _props.closeDelay,
      closeDelay = _props$closeDelay === void 0 ? 200 : _props$closeDelay,
      isLazy = _props.isLazy,
      _props$lazyBehavior = _props.lazyBehavior,
      lazyBehavior = _props$lazyBehavior === void 0 ? "unmount" : _props$lazyBehavior,
      computePositionOnMount = _props.computePositionOnMount,
      popperProps = _objectWithoutPropertiesLoose(_props, _excluded$1);

  var _useDisclosure = hooks.useDisclosure(props),
      isOpen = _useDisclosure.isOpen,
      onClose = _useDisclosure.onClose,
      onOpen = _useDisclosure.onOpen,
      onToggle = _useDisclosure.onToggle;

  var triggerRef = React.useRef(null);
  var popoverRef = React.useRef(null);
  var isHoveringRef = React.useRef(false);
  var hasBeenOpened = React.useRef(false);

  if (isOpen) {
    hasBeenOpened.current = true;
  }

  var _useState = React.useState(false),
      hasHeader = _useState[0],
      setHasHeader = _useState[1];

  var _useState2 = React.useState(false),
      hasBody = _useState2[0],
      setHasBody = _useState2[1];

  var _useIds = hooks.useIds(id, "popover-trigger", "popover-content", "popover-header", "popover-body"),
      triggerId = _useIds[0],
      popoverId = _useIds[1],
      headerId = _useIds[2],
      bodyId = _useIds[3];

  var _usePopper = popper.usePopper(_extends({}, popperProps, {
    enabled: isOpen || !!computePositionOnMount
  })),
      referenceRef = _usePopper.referenceRef,
      getArrowProps = _usePopper.getArrowProps,
      getPopperProps = _usePopper.getPopperProps,
      getArrowInnerProps = _usePopper.getArrowInnerProps,
      forceUpdate = _usePopper.forceUpdate;

  hooks.useFocusOnPointerDown({
    enabled: isOpen,
    ref: triggerRef
  });
  hooks.useFocusOnHide(popoverRef, {
    focusRef: triggerRef,
    visible: isOpen,
    shouldFocus: returnFocusOnClose && trigger === TRIGGER.click
  });
  hooks.useFocusOnShow(popoverRef, {
    focusRef: initialFocusRef,
    visible: isOpen,
    shouldFocus: autoFocus && trigger === TRIGGER.click
  });
  var shouldRenderChildren = utils.determineLazyBehavior({
    hasBeenSelected: hasBeenOpened.current,
    isLazy: isLazy,
    lazyBehavior: lazyBehavior,
    isSelected: isOpen
  });
  var getPopoverProps = React.useCallback(function (props, _ref) {
    var _extends2;

    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var popoverProps = _extends({}, props, {
      style: _extends({}, props.style, (_extends2 = {
        transformOrigin: popper.popperCSSVars.transformOrigin.varRef
      }, _extends2[popper.popperCSSVars.arrowSize["var"]] = arrowSize ? utils.px(arrowSize) : undefined, _extends2[popper.popperCSSVars.arrowShadowColor["var"]] = arrowShadowColor, _extends2)),
      ref: reactUtils.mergeRefs(popoverRef, _ref),
      children: shouldRenderChildren ? props.children : null,
      id: popoverId,
      tabIndex: -1,
      role: "dialog",
      onKeyDown: utils.callAllHandlers(props.onKeyDown, function (event) {
        if (closeOnEsc && event.key === "Escape") {
          onClose();
        }
      }),
      onBlur: utils.callAllHandlers(props.onBlur, function (event) {
        var relatedTarget = utils.getRelatedTarget(event);
        var targetIsPopover = utils.contains(popoverRef.current, relatedTarget);
        var targetIsTrigger = utils.contains(triggerRef.current, relatedTarget);
        var isValidBlur = !targetIsPopover && !targetIsTrigger;

        if (isOpen && closeOnBlur && isValidBlur) {
          onClose();
        }
      }),
      "aria-labelledby": hasHeader ? headerId : undefined,
      "aria-describedby": hasBody ? bodyId : undefined
    });

    if (trigger === TRIGGER.hover) {
      popoverProps.role = "tooltip";
      popoverProps.onMouseEnter = utils.callAllHandlers(props.onMouseEnter, function () {
        isHoveringRef.current = true;
      });
      popoverProps.onMouseLeave = utils.callAllHandlers(props.onMouseLeave, function () {
        isHoveringRef.current = false;
        setTimeout(onClose, closeDelay);
      });
    }

    return popoverProps;
  }, [shouldRenderChildren, popoverId, hasHeader, headerId, hasBody, bodyId, trigger, closeOnEsc, onClose, isOpen, closeOnBlur, closeDelay, arrowShadowColor, arrowSize]);
  var getPopoverPositionerProps = React.useCallback(function (props, forwardedRef) {
    if (props === void 0) {
      props = {};
    }

    if (forwardedRef === void 0) {
      forwardedRef = null;
    }

    return getPopperProps(_extends({}, props, {
      style: _extends({
        visibility: isOpen ? "visible" : "hidden"
      }, props.style)
    }), forwardedRef);
  }, [isOpen, getPopperProps]);
  var openTimeout = React.useRef();
  var closeTimeout = React.useRef();
  var getTriggerProps = React.useCallback(function (props, _ref) {
    if (props === void 0) {
      props = {};
    }

    if (_ref === void 0) {
      _ref = null;
    }

    var triggerProps = _extends({}, props, {
      ref: reactUtils.mergeRefs(triggerRef, _ref, referenceRef),
      id: triggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpen,
      "aria-controls": popoverId
    });

    if (trigger === TRIGGER.click) {
      triggerProps.onClick = utils.callAllHandlers(props.onClick, onToggle);
    }

    if (trigger === TRIGGER.hover) {
      /**
       * Any content that shows on pointer hover should also show on keyboard focus.
       * Consider focus and blur to be the `hover` for keyboard users.
       *
       * @see https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
       */
      triggerProps.onFocus = utils.callAllHandlers(props.onFocus, onOpen);
      triggerProps.onBlur = utils.callAllHandlers(props.onBlur, onClose);
      /**
       * Any content that shows on hover or focus must be dismissible.
       * This case pressing `Escape` will dismiss the popover
       */

      triggerProps.onKeyDown = utils.callAllHandlers(props.onKeyDown, function (event) {
        if (event.key === "Escape") {
          onClose();
        }
      });
      triggerProps.onMouseEnter = utils.callAllHandlers(props.onMouseEnter, function () {
        isHoveringRef.current = true;
        openTimeout.current = window.setTimeout(onOpen, openDelay);
      });
      triggerProps.onMouseLeave = utils.callAllHandlers(props.onMouseLeave, function () {
        isHoveringRef.current = false;

        if (openTimeout.current) {
          clearTimeout(openTimeout.current);
          openTimeout.current = undefined;
        }

        closeTimeout.current = window.setTimeout(function () {
          if (isHoveringRef.current === false) {
            onClose();
          }
        }, closeDelay);
      });
    }

    return triggerProps;
  }, [triggerId, isOpen, popoverId, trigger, referenceRef, onToggle, onOpen, onClose, openDelay, closeDelay]);
  React.useEffect(function () {
    return function () {
      if (openTimeout.current) {
        clearTimeout(openTimeout.current);
      }

      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);
  var getHeaderProps = React.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      id: headerId,
      ref: reactUtils.mergeRefs(ref, function (node) {
        setHasHeader(!!node);
      })
    });
  }, [headerId]);
  var getBodyProps = React.useCallback(function (props, ref) {
    if (props === void 0) {
      props = {};
    }

    if (ref === void 0) {
      ref = null;
    }

    return _extends({}, props, {
      id: bodyId,
      ref: reactUtils.mergeRefs(ref, function (node) {
        setHasBody(!!node);
      })
    });
  }, [bodyId]);
  return {
    forceUpdate: forceUpdate,
    isOpen: isOpen,
    onClose: onClose,
    getArrowProps: getArrowProps,
    getArrowInnerProps: getArrowInnerProps,
    getPopoverPositionerProps: getPopoverPositionerProps,
    getPopoverProps: getPopoverProps,
    getTriggerProps: getTriggerProps,
    getHeaderProps: getHeaderProps,
    getBodyProps: getBodyProps
  };
}

var _excluded = ["children"],
    _excluded2 = ["rootProps"];

/**
 * Popover is used to bring attention to specific user interface elements,
 * typically to suggest an action or to guide users through a new experience.
 */
var Popover = function Popover(props) {
  var styles = system.useMultiStyleConfig("Popover", props);

  var _omitThemingProps = system.omitThemingProps(props),
      children = _omitThemingProps.children,
      rest = _objectWithoutPropertiesLoose(_omitThemingProps, _excluded);

  var theme = system.useTheme();
  var context = usePopover(_extends({}, rest, {
    direction: theme.direction
  }));
  return /*#__PURE__*/React__namespace.createElement(PopoverProvider, {
    value: context
  }, /*#__PURE__*/React__namespace.createElement(system.StylesProvider, {
    value: styles
  }, utils.runIfFn(children, {
    isOpen: context.isOpen,
    onClose: context.onClose,
    forceUpdate: context.forceUpdate
  })));
};

if (utils.__DEV__) {
  Popover.displayName = "Popover";
}
/**
 * PopoverTrigger opens the popover's content. It must be an interactive element
 * such as `button` or `a`.
 */


var PopoverTrigger = function PopoverTrigger(props) {
  // enforce a single child
  var child = React__namespace.Children.only(props.children);

  var _usePopoverContext = usePopoverContext(),
      getTriggerProps = _usePopoverContext.getTriggerProps;

  return /*#__PURE__*/React__namespace.cloneElement(child, getTriggerProps(child.props, child.ref));
};

if (utils.__DEV__) {
  PopoverTrigger.displayName = "PopoverTrigger";
}

var PopoverContent = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var rootProps = props.rootProps,
      contentProps = _objectWithoutPropertiesLoose(props, _excluded2);

  var _usePopoverContext2 = usePopoverContext(),
      getPopoverProps = _usePopoverContext2.getPopoverProps,
      getPopoverPositionerProps = _usePopoverContext2.getPopoverPositionerProps;

  var styles = system.useStyles();

  var contentStyles = _extends({
    position: "relative",
    display: "flex",
    flexDirection: "column"
  }, styles.content);

  return /*#__PURE__*/React__namespace.createElement(system.chakra.div, _extends({}, getPopoverPositionerProps(rootProps), {
    __css: styles.popper,
    className: "chakra-popover__popper"
  }), /*#__PURE__*/React__namespace.createElement(PopoverTransition, _extends({}, getPopoverProps(contentProps, ref), {
    className: utils.cx("chakra-popover__content", props.className),
    __css: contentStyles
  })));
});

if (utils.__DEV__) {
  PopoverContent.displayName = "PopoverContent";
}

/**
 * PopoverHeader is the accessible header or label
 * for the popover's content and it is first announced by screenreaders.
 */
var PopoverHeader = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var _usePopoverContext3 = usePopoverContext(),
      getHeaderProps = _usePopoverContext3.getHeaderProps;

  var styles = system.useStyles();
  return /*#__PURE__*/React__namespace.createElement(system.chakra.header, _extends({}, getHeaderProps(props, ref), {
    className: utils.cx("chakra-popover__header", props.className),
    __css: styles.header
  }));
});

if (utils.__DEV__) {
  PopoverHeader.displayName = "PopoverHeader";
}

/**
 * PopoverBody is the main content area for the popover. Should contain
 * at least one interactive element.
 */
var PopoverBody = /*#__PURE__*/system.forwardRef(function (props, ref) {
  var _usePopoverContext4 = usePopoverContext(),
      getBodyProps = _usePopoverContext4.getBodyProps;

  var styles = system.useStyles();
  return /*#__PURE__*/React__namespace.createElement(system.chakra.div, _extends({}, getBodyProps(props, ref), {
    className: utils.cx("chakra-popover__body", props.className),
    __css: styles.body
  }));
});

if (utils.__DEV__) {
  PopoverBody.displayName = "PopoverBody";
}

var PopoverFooter = function PopoverFooter(props) {
  var styles = system.useStyles();
  return /*#__PURE__*/React__namespace.createElement(system.chakra.footer, _extends({}, props, {
    className: utils.cx("chakra-popover__footer", props.className),
    __css: styles.footer
  }));
};

if (utils.__DEV__) {
  PopoverFooter.displayName = "PopoverFooter";
}

var PopoverCloseButton = function PopoverCloseButton(props) {
  var _usePopoverContext5 = usePopoverContext(),
      onClose = _usePopoverContext5.onClose;

  var styles = system.useStyles();
  return /*#__PURE__*/React__namespace.createElement(closeButton.CloseButton, _extends({
    size: "sm",
    onClick: onClose,
    className: utils.cx("chakra-popover__close-btn", props.className),
    __css: styles.closeButton
  }, props));
};

if (utils.__DEV__) {
  PopoverCloseButton.displayName = "PopoverCloseButton";
}

var PopoverArrow = function PopoverArrow(props) {
  var _ref;

  var bg = props.bg,
      bgColor = props.bgColor,
      backgroundColor = props.backgroundColor;

  var _usePopoverContext6 = usePopoverContext(),
      getArrowProps = _usePopoverContext6.getArrowProps,
      getArrowInnerProps = _usePopoverContext6.getArrowInnerProps;

  var styles = system.useStyles();
  var arrowBg = (_ref = bg != null ? bg : bgColor) != null ? _ref : backgroundColor;
  return /*#__PURE__*/React__namespace.createElement(system.chakra.div, _extends({}, getArrowProps(), {
    className: "chakra-popover__arrow-positioner"
  }), /*#__PURE__*/React__namespace.createElement(system.chakra.div, _extends({
    className: utils.cx("chakra-popover__arrow", props.className)
  }, getArrowInnerProps(props), {
    __css: _extends({}, styles.arrow, {
      "--popper-arrow-bg": arrowBg ? "colors." + arrowBg + ", " + arrowBg : undefined
    })
  })));
};

if (utils.__DEV__) {
  PopoverArrow.displayName = "PopoverArrow";
}

exports.Popover = Popover;
exports.PopoverArrow = PopoverArrow;
exports.PopoverBody = PopoverBody;
exports.PopoverCloseButton = PopoverCloseButton;
exports.PopoverContent = PopoverContent;
exports.PopoverFooter = PopoverFooter;
exports.PopoverHeader = PopoverHeader;
exports.PopoverTrigger = PopoverTrigger;
exports.usePopover = usePopover;
exports.usePopoverContext = usePopoverContext;
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var utils = require('@chakra-ui/utils');
var framerMotion = require('framer-motion');
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

var TransitionEasings = {
  ease: [0.25, 0.1, 0.25, 1],
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1]
};
var TransitionVariants = {
  scale: {
    enter: {
      scale: 1
    },
    exit: {
      scale: 0.95
    }
  },
  fade: {
    enter: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  },
  pushLeft: {
    enter: {
      x: "100%"
    },
    exit: {
      x: "-30%"
    }
  },
  pushRight: {
    enter: {
      x: "-100%"
    },
    exit: {
      x: "30%"
    }
  },
  pushUp: {
    enter: {
      y: "100%"
    },
    exit: {
      y: "-30%"
    }
  },
  pushDown: {
    enter: {
      y: "-100%"
    },
    exit: {
      y: "30%"
    }
  },
  slideLeft: {
    position: {
      left: 0,
      top: 0,
      bottom: 0,
      width: "100%"
    },
    enter: {
      x: 0,
      y: 0
    },
    exit: {
      x: "-100%",
      y: 0
    }
  },
  slideRight: {
    position: {
      right: 0,
      top: 0,
      bottom: 0,
      width: "100%"
    },
    enter: {
      x: 0,
      y: 0
    },
    exit: {
      x: "100%",
      y: 0
    }
  },
  slideUp: {
    position: {
      top: 0,
      left: 0,
      right: 0,
      maxWidth: "100vw"
    },
    enter: {
      x: 0,
      y: 0
    },
    exit: {
      x: 0,
      y: "-100%"
    }
  },
  slideDown: {
    position: {
      bottom: 0,
      left: 0,
      right: 0,
      maxWidth: "100vw"
    },
    enter: {
      x: 0,
      y: 0
    },
    exit: {
      x: 0,
      y: "100%"
    }
  }
};
function slideTransition(options) {
  var _options$direction;

  var side = (_options$direction = options == null ? void 0 : options.direction) != null ? _options$direction : "right";

  switch (side) {
    case "right":
      return TransitionVariants.slideRight;

    case "left":
      return TransitionVariants.slideLeft;

    case "bottom":
      return TransitionVariants.slideDown;

    case "top":
      return TransitionVariants.slideUp;

    default:
      return TransitionVariants.slideRight;
  }
}
var TransitionDefaults = {
  enter: {
    duration: 0.2,
    ease: TransitionEasings.easeOut
  },
  exit: {
    duration: 0.1,
    ease: TransitionEasings.easeIn
  }
};
var withDelay = {
  enter: function enter(transition, delay) {
    return _extends({}, transition, {
      delay: utils.isNumber(delay) ? delay : delay == null ? void 0 : delay["enter"]
    });
  },
  exit: function exit(transition, delay) {
    return _extends({}, transition, {
      delay: utils.isNumber(delay) ? delay : delay == null ? void 0 : delay["exit"]
    });
  }
};

var _excluded$4 = ["in", "unmountOnExit", "animateOpacity", "startingHeight", "endingHeight", "style", "className", "transition", "transitionEnd"];

var isNumeric = function isNumeric(value) {
  return value != null && parseInt(value.toString(), 10) > 0;
};

var defaultTransitions = {
  exit: {
    height: {
      duration: 0.2,
      ease: TransitionEasings.ease
    },
    opacity: {
      duration: 0.3,
      ease: TransitionEasings.ease
    }
  },
  enter: {
    height: {
      duration: 0.3,
      ease: TransitionEasings.ease
    },
    opacity: {
      duration: 0.4,
      ease: TransitionEasings.ease
    }
  }
};
var variants$4 = {
  exit: function exit(_ref) {
    var _transition$exit;

    var animateOpacity = _ref.animateOpacity,
        startingHeight = _ref.startingHeight,
        transition = _ref.transition,
        transitionEnd = _ref.transitionEnd,
        delay = _ref.delay;
    return _extends({}, animateOpacity && {
      opacity: isNumeric(startingHeight) ? 1 : 0
    }, {
      overflow: "hidden",
      height: startingHeight,
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.exit,
      transition: (_transition$exit = transition == null ? void 0 : transition.exit) != null ? _transition$exit : withDelay.exit(defaultTransitions.exit, delay)
    });
  },
  enter: function enter(_ref2) {
    var _transition$enter;

    var animateOpacity = _ref2.animateOpacity,
        endingHeight = _ref2.endingHeight,
        transition = _ref2.transition,
        transitionEnd = _ref2.transitionEnd,
        delay = _ref2.delay;
    return _extends({}, animateOpacity && {
      opacity: 1
    }, {
      height: endingHeight,
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.enter,
      transition: (_transition$enter = transition == null ? void 0 : transition.enter) != null ? _transition$enter : withDelay.enter(defaultTransitions.enter, delay)
    });
  }
};
var Collapse = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var isOpen = props["in"],
      unmountOnExit = props.unmountOnExit,
      _props$animateOpacity = props.animateOpacity,
      animateOpacity = _props$animateOpacity === void 0 ? true : _props$animateOpacity,
      _props$startingHeight = props.startingHeight,
      startingHeight = _props$startingHeight === void 0 ? 0 : _props$startingHeight,
      _props$endingHeight = props.endingHeight,
      endingHeight = _props$endingHeight === void 0 ? "auto" : _props$endingHeight,
      style = props.style,
      className = props.className,
      transition = props.transition,
      transitionEnd = props.transitionEnd,
      rest = _objectWithoutPropertiesLoose(props, _excluded$4);

  var _React$useState = React__namespace.useState(false),
      mounted = _React$useState[0],
      setMounted = _React$useState[1];

  React__namespace.useEffect(function () {
    var timeout = setTimeout(function () {
      setMounted(true);
    });
    return function () {
      return clearTimeout(timeout);
    };
  }, []);
  /**
   * Warn 🚨: `startingHeight` and `unmountOnExit` are mutually exclusive
   *
   * If you specify a starting height, the collapsed needs to be mounted
   * for the height to take effect.
   */

  utils.warn({
    condition: Boolean(startingHeight > 0 && unmountOnExit),
    message: "startingHeight and unmountOnExit are mutually exclusive. You can't use them together"
  });
  var hasStartingHeight = parseFloat(startingHeight.toString()) > 0;
  var custom = {
    startingHeight: startingHeight,
    endingHeight: endingHeight,
    animateOpacity: animateOpacity,
    transition: !mounted ? {
      enter: {
        duration: 0
      }
    } : transition,
    transitionEnd: utils.mergeWith(transitionEnd, {
      enter: {
        overflow: "initial"
      },
      exit: unmountOnExit ? undefined : {
        display: hasStartingHeight ? "block" : "none"
      }
    })
  };
  var show = unmountOnExit ? isOpen : true;
  var animate = isOpen || unmountOnExit ? "enter" : "exit";
  return /*#__PURE__*/React__namespace.createElement(framerMotion.AnimatePresence, {
    initial: false,
    custom: custom
  }, show && /*#__PURE__*/React__namespace.createElement(framerMotion.motion.div, _extends({
    ref: ref
  }, rest, {
    className: utils.cx("chakra-collapse", className),
    style: _extends({
      overflow: "hidden",
      display: "block"
    }, style),
    custom: custom,
    variants: variants$4,
    initial: unmountOnExit ? "exit" : false,
    animate: animate,
    exit: "exit"
  })));
});

if (utils.__DEV__) {
  Collapse.displayName = "Collapse";
}

var _excluded$3 = ["unmountOnExit", "in", "className", "transition", "transitionEnd", "delay"];
var variants$3 = {
  enter: function enter(_temp) {
    var _transition$enter;

    var _ref = _temp === void 0 ? {} : _temp,
        transition = _ref.transition,
        transitionEnd = _ref.transitionEnd,
        delay = _ref.delay;

    return {
      opacity: 1,
      transition: (_transition$enter = transition == null ? void 0 : transition.enter) != null ? _transition$enter : withDelay.enter(TransitionDefaults.enter, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.enter
    };
  },
  exit: function exit(_temp2) {
    var _transition$exit;

    var _ref2 = _temp2 === void 0 ? {} : _temp2,
        transition = _ref2.transition,
        transitionEnd = _ref2.transitionEnd,
        delay = _ref2.delay;

    return {
      opacity: 0,
      transition: (_transition$exit = transition == null ? void 0 : transition.exit) != null ? _transition$exit : withDelay.exit(TransitionDefaults.exit, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.exit
    };
  }
};
var fadeConfig = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants$3
};
var Fade = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var unmountOnExit = props.unmountOnExit,
      isOpen = props["in"],
      className = props.className,
      transition = props.transition,
      transitionEnd = props.transitionEnd,
      delay = props.delay,
      rest = _objectWithoutPropertiesLoose(props, _excluded$3);

  var animate = isOpen || unmountOnExit ? "enter" : "exit";
  var show = unmountOnExit ? isOpen && unmountOnExit : true;
  var custom = {
    transition: transition,
    transitionEnd: transitionEnd,
    delay: delay
  };
  return /*#__PURE__*/React__namespace.createElement(framerMotion.AnimatePresence, {
    custom: custom
  }, show && /*#__PURE__*/React__namespace.createElement(framerMotion.motion.div, _extends({
    ref: ref,
    className: utils.cx("chakra-fade", className),
    custom: custom
  }, fadeConfig, {
    animate: animate
  }, rest)));
});

if (utils.__DEV__) {
  Fade.displayName = "Fade";
}

var _excluded$2 = ["unmountOnExit", "in", "reverse", "initialScale", "className", "transition", "transitionEnd", "delay"];
var variants$2 = {
  exit: function exit(_ref) {
    var _transition$exit;

    var reverse = _ref.reverse,
        initialScale = _ref.initialScale,
        transition = _ref.transition,
        transitionEnd = _ref.transitionEnd,
        delay = _ref.delay;
    return _extends({
      opacity: 0
    }, reverse ? {
      scale: initialScale,
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.exit
    } : {
      transitionEnd: _extends({
        scale: initialScale
      }, transitionEnd == null ? void 0 : transitionEnd.exit)
    }, {
      transition: (_transition$exit = transition == null ? void 0 : transition.exit) != null ? _transition$exit : withDelay.exit(TransitionDefaults.exit, delay)
    });
  },
  enter: function enter(_ref2) {
    var _transition$enter;

    var transitionEnd = _ref2.transitionEnd,
        transition = _ref2.transition,
        delay = _ref2.delay;
    return {
      opacity: 1,
      scale: 1,
      transition: (_transition$enter = transition == null ? void 0 : transition.enter) != null ? _transition$enter : withDelay.enter(TransitionDefaults.enter, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.enter
    };
  }
};
var scaleFadeConfig = {
  initial: "exit",
  animate: "enter",
  exit: "exit",
  variants: variants$2
};
var ScaleFade = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var unmountOnExit = props.unmountOnExit,
      isOpen = props["in"],
      _props$reverse = props.reverse,
      reverse = _props$reverse === void 0 ? true : _props$reverse,
      _props$initialScale = props.initialScale,
      initialScale = _props$initialScale === void 0 ? 0.95 : _props$initialScale,
      className = props.className,
      transition = props.transition,
      transitionEnd = props.transitionEnd,
      delay = props.delay,
      rest = _objectWithoutPropertiesLoose(props, _excluded$2);

  var show = unmountOnExit ? isOpen && unmountOnExit : true;
  var animate = isOpen || unmountOnExit ? "enter" : "exit";
  var custom = {
    initialScale: initialScale,
    reverse: reverse,
    transition: transition,
    transitionEnd: transitionEnd,
    delay: delay
  };
  return /*#__PURE__*/React__namespace.createElement(framerMotion.AnimatePresence, {
    custom: custom
  }, show && /*#__PURE__*/React__namespace.createElement(framerMotion.motion.div, _extends({
    ref: ref,
    className: utils.cx("chakra-offset-slide", className)
  }, scaleFadeConfig, {
    animate: animate,
    custom: custom
  }, rest)));
});

if (utils.__DEV__) {
  ScaleFade.displayName = "ScaleFade";
}

var _excluded$1 = ["direction", "style", "unmountOnExit", "in", "className", "transition", "transitionEnd", "delay"];
var defaultTransition = {
  exit: {
    duration: 0.15,
    ease: TransitionEasings.easeInOut
  },
  enter: {
    type: "spring",
    damping: 25,
    stiffness: 180
  }
};
var variants$1 = {
  exit: function exit(_ref) {
    var _transition$exit;

    var direction = _ref.direction,
        transition = _ref.transition,
        transitionEnd = _ref.transitionEnd,
        delay = _ref.delay;

    var _slideTransition = slideTransition({
      direction: direction
    }),
        exitStyles = _slideTransition.exit;

    return _extends({}, exitStyles, {
      transition: (_transition$exit = transition == null ? void 0 : transition.exit) != null ? _transition$exit : withDelay.exit(defaultTransition.exit, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.exit
    });
  },
  enter: function enter(_ref2) {
    var _transition$enter;

    var direction = _ref2.direction,
        transitionEnd = _ref2.transitionEnd,
        transition = _ref2.transition,
        delay = _ref2.delay;

    var _slideTransition2 = slideTransition({
      direction: direction
    }),
        enterStyles = _slideTransition2.enter;

    return _extends({}, enterStyles, {
      transition: (_transition$enter = transition == null ? void 0 : transition.enter) != null ? _transition$enter : withDelay.enter(defaultTransition.enter, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.enter
    });
  }
};
var Slide = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var _props$direction = props.direction,
      direction = _props$direction === void 0 ? "right" : _props$direction,
      style = props.style,
      unmountOnExit = props.unmountOnExit,
      isOpen = props["in"],
      className = props.className,
      transition = props.transition,
      transitionEnd = props.transitionEnd,
      delay = props.delay,
      rest = _objectWithoutPropertiesLoose(props, _excluded$1);

  var transitionStyles = slideTransition({
    direction: direction
  });
  var computedStyle = Object.assign({
    position: "fixed"
  }, transitionStyles.position, style);
  var show = unmountOnExit ? isOpen && unmountOnExit : true;
  var animate = isOpen || unmountOnExit ? "enter" : "exit";
  var custom = {
    transitionEnd: transitionEnd,
    transition: transition,
    direction: direction,
    delay: delay
  };
  return /*#__PURE__*/React__namespace.createElement(framerMotion.AnimatePresence, {
    custom: custom
  }, show && /*#__PURE__*/React__namespace.createElement(framerMotion.motion.div, _extends({
    ref: ref,
    initial: "exit",
    className: utils.cx("chakra-slide", className),
    animate: animate,
    exit: "exit",
    custom: custom,
    variants: variants$1,
    style: computedStyle
  }, rest)));
});

if (utils.__DEV__) {
  Slide.displayName = "Slide";
}

var _excluded = ["unmountOnExit", "in", "reverse", "className", "offsetX", "offsetY", "transition", "transitionEnd", "delay"];
var variants = {
  initial: function initial(_ref) {
    var _transition$exit;

    var offsetX = _ref.offsetX,
        offsetY = _ref.offsetY,
        transition = _ref.transition,
        transitionEnd = _ref.transitionEnd,
        delay = _ref.delay;
    return {
      opacity: 0,
      x: offsetX,
      y: offsetY,
      transition: (_transition$exit = transition == null ? void 0 : transition.exit) != null ? _transition$exit : withDelay.exit(TransitionDefaults.exit, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.exit
    };
  },
  enter: function enter(_ref2) {
    var _transition$enter;

    var transition = _ref2.transition,
        transitionEnd = _ref2.transitionEnd,
        delay = _ref2.delay;
    return {
      opacity: 1,
      x: 0,
      y: 0,
      transition: (_transition$enter = transition == null ? void 0 : transition.enter) != null ? _transition$enter : withDelay.enter(TransitionDefaults.enter, delay),
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.enter
    };
  },
  exit: function exit(_ref3) {
    var _transition$exit2;

    var offsetY = _ref3.offsetY,
        offsetX = _ref3.offsetX,
        transition = _ref3.transition,
        transitionEnd = _ref3.transitionEnd,
        reverse = _ref3.reverse,
        delay = _ref3.delay;
    var offset = {
      x: offsetX,
      y: offsetY
    };
    return _extends({
      opacity: 0,
      transition: (_transition$exit2 = transition == null ? void 0 : transition.exit) != null ? _transition$exit2 : withDelay.exit(TransitionDefaults.exit, delay)
    }, reverse ? _extends({}, offset, {
      transitionEnd: transitionEnd == null ? void 0 : transitionEnd.exit
    }) : {
      transitionEnd: _extends({}, offset, transitionEnd == null ? void 0 : transitionEnd.exit)
    });
  }
};
var slideFadeConfig = {
  initial: "initial",
  animate: "enter",
  exit: "exit",
  variants: variants
};
var SlideFade = /*#__PURE__*/React__namespace.forwardRef(function (props, ref) {
  var unmountOnExit = props.unmountOnExit,
      isOpen = props["in"],
      _props$reverse = props.reverse,
      reverse = _props$reverse === void 0 ? true : _props$reverse,
      className = props.className,
      _props$offsetX = props.offsetX,
      offsetX = _props$offsetX === void 0 ? 0 : _props$offsetX,
      _props$offsetY = props.offsetY,
      offsetY = _props$offsetY === void 0 ? 8 : _props$offsetY,
      transition = props.transition,
      transitionEnd = props.transitionEnd,
      delay = props.delay,
      rest = _objectWithoutPropertiesLoose(props, _excluded);

  var show = unmountOnExit ? isOpen && unmountOnExit : true;
  var animate = isOpen || unmountOnExit ? "enter" : "exit";
  var custom = {
    offsetX: offsetX,
    offsetY: offsetY,
    reverse: reverse,
    transition: transition,
    transitionEnd: transitionEnd,
    delay: delay
  };
  return /*#__PURE__*/React__namespace.createElement(framerMotion.AnimatePresence, {
    custom: custom
  }, show && /*#__PURE__*/React__namespace.createElement(framerMotion.motion.div, _extends({
    ref: ref,
    className: utils.cx("chakra-offset-slide", className),
    custom: custom
  }, slideFadeConfig, {
    animate: animate
  }, rest)));
});

if (utils.__DEV__) {
  SlideFade.displayName = "SlideFade";
}

exports.Collapse = Collapse;
exports.EASINGS = TransitionEasings;
exports.Fade = Fade;
exports.ScaleFade = ScaleFade;
exports.Slide = Slide;
exports.SlideFade = SlideFade;
exports.fadeConfig = fadeConfig;
exports.scaleFadeConfig = scaleFadeConfig;
exports.slideFadeConfig = slideFadeConfig;

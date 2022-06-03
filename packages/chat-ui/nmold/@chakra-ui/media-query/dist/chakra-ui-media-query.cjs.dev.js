'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var system = require('@chakra-ui/system');
var utils = require('@chakra-ui/utils');
var React = require('react');
var reactEnv = require('@chakra-ui/react-env');

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

var useSafeLayoutEffect = utils.isBrowser ? React__namespace.useLayoutEffect : React__namespace.useEffect;
/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 */

function useMediaQuery(query) {
  var env = reactEnv.useEnvironment();
  var queries = Array.isArray(query) ? query : [query];
  var isSupported = utils.isBrowser && "matchMedia" in env.window;

  var _React$useState = React__namespace.useState(queries.map(function (query) {
    return isSupported ? !!env.window.matchMedia(query).matches : false;
  })),
      matches = _React$useState[0],
      setMatches = _React$useState[1];

  useSafeLayoutEffect(function () {
    if (!isSupported) return undefined;
    var mediaQueryList = queries.map(function (query) {
      return env.window.matchMedia(query);
    });
    var listenerList = mediaQueryList.map(function () {
      var listener = function listener() {
        var isEqual = function isEqual(prev, curr) {
          return prev.length === curr.length && prev.every(function (elem, idx) {
            return elem === curr[idx];
          });
        };

        var currentMatches = mediaQueryList.map(function (mediaQuery) {
          return mediaQuery.matches;
        });

        if (!isEqual(matches, currentMatches)) {
          setMatches(currentMatches);
        }
      };

      env.window.addEventListener("resize", listener);
      return listener;
    });
    return function () {
      mediaQueryList.forEach(function (_, index) {
        env.window.removeEventListener("resize", listenerList[index]);
      });
    };
  }, [query]);
  return matches;
}

/**
 * Visibility
 *
 * React component to control the visibility of its
 * children based on the current breakpoint
 */
var Visibility = function Visibility(props) {
  var breakpoint = props.breakpoint,
      hide = props.hide,
      children = props.children;

  var _useMediaQuery = useMediaQuery(breakpoint),
      show = _useMediaQuery[0];

  var isVisible = hide ? !show : show;
  var rendered = isVisible ? children : null;
  return rendered;
};

var Hide = function Hide(props) {
  var children = props.children;
  var query = useQuery(props);
  return /*#__PURE__*/React__namespace.createElement(Visibility, {
    breakpoint: query,
    hide: true
  }, children);
};

if (utils.__DEV__) {
  Hide.displayName = "Hide";
}

var Show = function Show(props) {
  var children = props.children;
  var query = useQuery(props);
  return /*#__PURE__*/React__namespace.createElement(Visibility, {
    breakpoint: query
  }, children);
};

if (utils.__DEV__) {
  Show.displayName = "Show";
}

var getBreakpoint = function getBreakpoint(theme, value) {
  return utils.memoizedGet(theme, "breakpoints." + value, value);
};

function useQuery(props) {
  var _props$breakpoint = props.breakpoint,
      breakpoint = _props$breakpoint === void 0 ? "" : _props$breakpoint,
      below = props.below,
      above = props.above;
  var theme = system.useTheme();
  var bpBelow = getBreakpoint(theme, below);
  var bpAbove = getBreakpoint(theme, above);
  var query = breakpoint;

  if (bpBelow) {
    query = "(max-width: " + bpBelow + ")";
  } else if (bpAbove) {
    query = "(min-width: " + bpAbove + ")";
  }

  return query;
}

/**
 * React hook used to get the user's animation preference.
 */

function usePrefersReducedMotion() {
  var _useMediaQuery = useMediaQuery("(prefers-reduced-motion: reduce)"),
      prefersReducedMotion = _useMediaQuery[0];

  return prefersReducedMotion;
}
/**
 * React hook for getting the user's color mode preference.
 */

function useColorModePreference() {
  var _useMediaQuery2 = useMediaQuery(["(prefers-color-scheme: light)", "(prefers-color-scheme: dark)"]),
      isLight = _useMediaQuery2[0],
      isDark = _useMediaQuery2[1];

  if (isLight) return "light";
  if (isDark) return "dark";
  return undefined;
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

function createMediaQueries(breakpoints) {
  return Object.entries(breakpoints) // sort css units in ascending order to ensure media queries are generated
  // in the correct order and reference to each other correctly aswell
  .sort(function (a, b) {
    return Number.parseInt(a[1], 10) > Number.parseInt(b[1], 10) ? 1 : -1;
  }).map(function (_ref, index, arr) {
    var breakpoint = _ref[0],
        minWidth = _ref[1];
    // given a following breakpoint
    var next = arr[index + 1]; // this breakpoint must end prior the threshold of the next

    var maxWidth = next ? next[1] : undefined;
    var query = createMediaQueryString(minWidth, maxWidth);
    return {
      minWidth: minWidth,
      maxWidth: maxWidth,
      breakpoint: breakpoint,
      query: query
    };
  });
}
/**
 * Create a media query string from the breakpoints,
 * using a combination of `min-width` and `max-width`.
 */

function createMediaQueryString(minWidth, maxWidth) {
  var hasMinWidth = parseInt(minWidth, 10) >= 0;

  if (!hasMinWidth && !maxWidth) {
    return "";
  }

  var query = "(min-width: " + toMediaString(minWidth) + ")";

  if (!maxWidth) {
    return query;
  }

  if (query) {
    query += " and ";
  }

  query += "(max-width: " + toMediaString(subtract(maxWidth)) + ")";
  return query;
}

var measurementRegex = /([0-9]+\.?[0-9]*)/;

var calculateMeasurement = function calculateMeasurement(value, modifier) {
  if (typeof value === "number") {
    return "" + (value + modifier);
  }

  return value.replace(measurementRegex, function (match) {
    return "" + (parseFloat(match) + modifier);
  });
};
/**
 * 0.01 and 0.1 are too small of a difference for `px` breakpoint values
 *
 * @see https://github.com/chakra-ui/chakra-ui/issues/2188#issuecomment-712774785
 */


function subtract(value) {
  return calculateMeasurement(value, value.endsWith("px") ? -1 : -0.01);
}
/**
 * Convert media query value to string
 */


function toMediaString(value) {
  return utils.isNumber(value) ? value + "px" : value;
}

var _excluded = ["query"],
    _excluded2 = ["query"];

/**
 * React hook used to get the current responsive media breakpoint.
 *
 * @param defaultBreakpoint default breakpoint name
 * (in non-window environments like SSR)
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent
 */
function useBreakpoint(defaultBreakpoint) {
  var _useTheme = system.useTheme(),
      breakpoints = _useTheme.breakpoints;

  var env = reactEnv.useEnvironment();
  var mediaQueries = React__namespace["default"].useMemo(function () {
    return createMediaQueries(_extends({
      base: "0px"
    }, breakpoints));
  }, [breakpoints]);

  var _React$useState = React__namespace["default"].useState(function () {
    if (!defaultBreakpoint) {
      return undefined;
    }

    var mediaQuery = mediaQueries.find(function (_ref) {
      var breakpoint = _ref.breakpoint;
      return breakpoint === defaultBreakpoint;
    });

    if (mediaQuery) {
      mediaQuery.query;
          var breakpoint = _objectWithoutPropertiesLoose(mediaQuery, _excluded);

      return breakpoint;
    }

    return undefined;
  }),
      currentBreakpoint = _React$useState[0],
      setCurrentBreakpoint = _React$useState[1];

  var current = currentBreakpoint == null ? void 0 : currentBreakpoint.breakpoint;
  var update = React__namespace["default"].useCallback(function (query, breakpoint) {
    if (query.matches && current !== breakpoint.breakpoint) {
      setCurrentBreakpoint(breakpoint);
    }
  }, [current]);
  React__namespace["default"].useEffect(function () {
    var listeners = new Set();
    mediaQueries.forEach(function (_ref2) {
      var query = _ref2.query,
          breakpoint = _objectWithoutPropertiesLoose(_ref2, _excluded2);

      var mediaQuery = env.window.matchMedia(query); // trigger an initial update to determine media query

      update(mediaQuery, breakpoint);

      var handleChange = function handleChange() {
        update(mediaQuery, breakpoint);
      }; // add media query-listener


      mediaQuery.addListener(handleChange); // push the media query list handleChange
      // so we can use it to remove Listener

      listeners.add({
        mediaQuery: mediaQuery,
        handleChange: handleChange
      });
      return function () {
        // clean up 1
        mediaQuery.removeListener(handleChange);
      };
    });
    return function () {
      // clean up 2: for safety
      listeners.forEach(function (_ref3) {
        var mediaQuery = _ref3.mediaQuery,
            handleChange = _ref3.handleChange;
        mediaQuery.removeListener(handleChange);
      });
      listeners.clear();
    };
  }, [mediaQueries, breakpoints, update, env.window]);
  return current;
}

function getClosestValue(values, breakpoint, breakpoints) {
  if (breakpoints === void 0) {
    breakpoints = utils.breakpoints;
  }

  var index = Object.keys(values).indexOf(breakpoint);

  if (index !== -1) {
    return values[breakpoint];
  }

  var stopIndex = breakpoints.indexOf(breakpoint);

  while (stopIndex >= 0) {
    var key = breakpoints[stopIndex];

    if (values[key] != null) {
      index = stopIndex;
      break;
    }

    stopIndex -= 1;
  }

  if (index !== -1) {
    var _key = breakpoints[index];
    return values[_key];
  }

  return undefined;
}

/**
 * React hook for getting the value for the current breakpoint from the
 * provided responsive values object.
 *
 * @param values
 * @param defaultBreakpoint default breakpoint name
 * (in non-window environments like SSR)
 *
 * For SSR, you can use a package like [is-mobile](https://github.com/kaimallea/isMobile)
 * to get the default breakpoint value from the user-agent
 *
 * @example
 * const width = useBreakpointValue({ base: '150px', md: '250px' })
 */

function useBreakpointValue(values, defaultBreakpoint) {
  var breakpoint = useBreakpoint(defaultBreakpoint);
  var theme = system.useTheme();
  if (!breakpoint) return undefined;
  /**
   * Get the non-number breakpoint keys from the provided breakpoints
   */

  var breakpoints = Object.keys(theme.breakpoints);
  var obj = utils.isArray(values) ? utils.fromEntries(Object.entries(utils.arrayToObjectNotation(values, breakpoints)).map(function (_ref) {
    var key = _ref[0],
        value = _ref[1];
    return [key, value];
  })) : values;
  return getClosestValue(obj, breakpoint, breakpoints);
}

exports.Hide = Hide;
exports.Show = Show;
exports.useBreakpoint = useBreakpoint;
exports.useBreakpointValue = useBreakpointValue;
exports.useColorModePreference = useColorModePreference;
exports.useMediaQuery = useMediaQuery;
exports.usePrefersReducedMotion = usePrefersReducedMotion;
exports.useQuery = useQuery;
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactEnv = require('@chakra-ui/react-env');
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

var classNames = {
  light: "chakra-ui-light",
  dark: "chakra-ui-dark"
};

/**
 * SSR: Graceful fallback for the `body` element
 */
var mockBody = {
  classList: {
    add: utils.noop,
    remove: utils.noop
  }
};

var getBody = function getBody(document) {
  return utils.isBrowser ? document.body : mockBody;
};
/**
 * Function to add/remove class from `body` based on color mode
 */


function syncBodyClassName(isDark, document) {
  var body = getBody(document);
  body.classList.add(isDark ? classNames.dark : classNames.light);
  body.classList.remove(isDark ? classNames.light : classNames.dark);
}
/**
 * Check if JS media query matches the query string passed
 */

function getMediaQuery(query) {
  var mediaQueryList = window.matchMedia == null ? void 0 : window.matchMedia(query);

  if (!mediaQueryList) {
    return undefined;
  }

  return !!mediaQueryList.media === mediaQueryList.matches;
}

var queries = {
  light: "(prefers-color-scheme: light)",
  dark: "(prefers-color-scheme: dark)"
};

function getColorScheme(fallback) {
  var _getMediaQuery;

  var isDark = (_getMediaQuery = getMediaQuery(queries.dark)) != null ? _getMediaQuery : fallback === "dark";
  return isDark ? "dark" : "light";
}
/**
 * Adds system os color mode listener, and run the callback
 * once preference changes
 */

function addListener(fn) {
  if (!("matchMedia" in window)) {
    return utils.noop;
  }

  var mediaQueryList = window.matchMedia(queries.dark);

  var listener = function listener() {
    fn(mediaQueryList.matches ? "dark" : "light", true);
  };

  mediaQueryList.addEventListener("change", listener);
  return function () {
    mediaQueryList.removeEventListener("change", listener);
  };
}
var root = {
  get: function get() {
    return document.documentElement.style.getPropertyValue("--chakra-ui-color-mode") || document.documentElement.dataset.theme;
  },
  set: function set(mode) {
    if (utils.isBrowser) {
      /**
       * @deprecated
       * The CSS variable `--chakra-ui-color-mode` will be removed in the next major release
       * Please use the `data-theme` attribute to determine the current color mode
       */
      document.documentElement.style.setProperty("--chakra-ui-color-mode", mode);
      document.documentElement.setAttribute("data-theme", mode);
    }
  }
};

var hasSupport = function hasSupport() {
  return typeof Storage !== "undefined";
};

var storageKey = "chakra-ui-color-mode";

/**
 * Simple object to handle read-write to localStorage
 */
var localStorageManager = {
  get: function get(init) {
    if (!hasSupport()) return init;

    try {
      var _value = localStorage.getItem(storageKey);

      return _value != null ? _value : init;
    } catch (error) {
      if (utils.__DEV__) {
        console.log(error);
      }

      return init;
    }
  },
  set: function set(value) {
    if (!hasSupport()) return;

    try {
      localStorage.setItem(storageKey, value);
    } catch (error) {
      if (utils.__DEV__) {
        console.log(error);
      }
    }
  },
  type: "localStorage"
};
/**
 * Simple object to handle read-write to cookies
 */

var cookieStorageManager = function cookieStorageManager(cookies) {
  if (cookies === void 0) {
    cookies = "";
  }

  return {
    get: function get(init) {
      var match = cookies.match(new RegExp("(^| )" + storageKey + "=([^;]+)"));

      if (match) {
        return match[2];
      }

      return init;
    },
    set: function set(value) {
      document.cookie = storageKey + "=" + value + "; max-age=31536000; path=/";
    },
    type: "cookie"
  };
};

var ColorModeContext = /*#__PURE__*/React__namespace.createContext({});

if (utils.__DEV__) {
  ColorModeContext.displayName = "ColorModeContext";
}
/**
 * React hook that reads from `ColorModeProvider` context
 * Returns the color mode and function to toggle it
 */


var useColorMode = function useColorMode() {
  var context = React__namespace.useContext(ColorModeContext);

  if (context === undefined) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }

  return context;
};

/**
 * Provides context for the color mode based on config in `theme`
 * Returns the color mode and function to toggle the color mode
 */
function ColorModeProvider(props) {
  var value = props.value,
      children = props.children,
      _props$options = props.options,
      useSystemColorMode = _props$options.useSystemColorMode,
      initialColorMode = _props$options.initialColorMode,
      _props$colorModeManag = props.colorModeManager,
      colorModeManager = _props$colorModeManag === void 0 ? localStorageManager : _props$colorModeManag;
  var defaultColorMode = initialColorMode === "dark" ? "dark" : "light";
  /**
   * Only attempt to retrieve if we're on the server. Else this will result
   * in a hydration mismatch warning and partially invalid visuals.
   *
   * Else fallback safely to `theme.config.initialColormode` (default light)
   */

  var _React$useState = React__namespace.useState(colorModeManager.type === "cookie" ? colorModeManager.get(defaultColorMode) : defaultColorMode),
      colorMode = _React$useState[0],
      rawSetColorMode = _React$useState[1];

  var _useEnvironment = reactEnv.useEnvironment(),
      document = _useEnvironment.document;

  React__namespace.useEffect(function () {
    /**
     * Since we cannot initially retrieve localStorage to due above mentioned
     * reasons, do so after hydration.
     *
     * Priority:
     * - if `useSystemColorMode` is true system-color will be used as default - initial
     * colormode is the fallback if system color mode isn't resolved
     *
     * - if `--chakra-ui-color-mode` is defined through e.g. `ColorModeScript` this
     * will be used
     *
     * - if `colorModeManager` = `localStorage` and a value is defined for
     * `chakra-ui-color-mode` this will be used
     *
     * - if `initialColorMode` = `system` system-color will be used as default -
     * initial colormode is the fallback if system color mode isn't resolved
     *
     * - if `initialColorMode` = `'light'|'dark'` the corresponding value will be used
     */
    if (utils.isBrowser && colorModeManager.type === "localStorage") {
      var systemColorWithFallback = getColorScheme(defaultColorMode);

      if (useSystemColorMode) {
        return rawSetColorMode(systemColorWithFallback);
      }

      var rootGet = root.get();
      var colorManagerGet = colorModeManager.get();

      if (rootGet) {
        return rawSetColorMode(rootGet);
      }

      if (colorManagerGet) {
        return rawSetColorMode(colorManagerGet);
      }

      if (initialColorMode === "system") {
        return rawSetColorMode(systemColorWithFallback);
      }

      return rawSetColorMode(defaultColorMode);
    }
  }, [colorModeManager, useSystemColorMode, defaultColorMode, initialColorMode]);
  React__namespace.useEffect(function () {
    var isDark = colorMode === "dark";
    syncBodyClassName(isDark, document);
    root.set(isDark ? "dark" : "light");
  }, [colorMode, document]);
  var setColorMode = React__namespace.useCallback(function (value, isListenerEvent) {
    if (isListenerEvent === void 0) {
      isListenerEvent = false;
    }

    if (!isListenerEvent) {
      colorModeManager.set(value);
    } else if (colorModeManager.get() && !useSystemColorMode) return;

    rawSetColorMode(value);
  }, [colorModeManager, useSystemColorMode]);
  var toggleColorMode = React__namespace.useCallback(function () {
    setColorMode(colorMode === "light" ? "dark" : "light");
  }, [colorMode, setColorMode]);
  React__namespace.useEffect(function () {
    var shouldUseSystemListener = useSystemColorMode || initialColorMode === "system";
    var removeListener;

    if (shouldUseSystemListener) {
      removeListener = addListener(setColorMode);
    }

    return function () {
      if (removeListener && shouldUseSystemListener) {
        removeListener();
      }
    };
  }, [setColorMode, useSystemColorMode, initialColorMode]); // presence of `value` indicates a controlled context

  var context = React__namespace.useMemo(function () {
    return {
      colorMode: value != null ? value : colorMode,
      toggleColorMode: value ? utils.noop : toggleColorMode,
      setColorMode: value ? utils.noop : setColorMode
    };
  }, [colorMode, setColorMode, toggleColorMode, value]);
  return /*#__PURE__*/React__namespace.createElement(ColorModeContext.Provider, {
    value: context
  }, children);
}

if (utils.__DEV__) {
  ColorModeProvider.displayName = "ColorModeProvider";
}
/**
 * Locks the color mode to `dark`, without any way to change it.
 */


var DarkMode = function DarkMode(props) {
  var context = React__namespace.useMemo(function () {
    return {
      colorMode: "dark",
      toggleColorMode: utils.noop,
      setColorMode: utils.noop
    };
  }, []);
  return /*#__PURE__*/React__namespace.createElement(ColorModeContext.Provider, _extends({
    value: context
  }, props));
};

if (utils.__DEV__) {
  DarkMode.displayName = "DarkMode";
}
/**
 * Locks the color mode to `light` without any way to change it.
 */


var LightMode = function LightMode(props) {
  var context = React__namespace.useMemo(function () {
    return {
      colorMode: "light",
      toggleColorMode: utils.noop,
      setColorMode: utils.noop
    };
  }, []);
  return /*#__PURE__*/React__namespace.createElement(ColorModeContext.Provider, _extends({
    value: context
  }, props));
};

if (utils.__DEV__) {
  LightMode.displayName = "LightMode";
}
/**
 * Change value based on color mode.
 *
 * @param light the light mode value
 * @param dark the dark mode value
 *
 * @example
 *
 * ```js
 * const Icon = useColorModeValue(MoonIcon, SunIcon)
 * ```
 */


function useColorModeValue(light, dark) {
  var _useColorMode = useColorMode(),
      colorMode = _useColorMode.colorMode;

  return colorMode === "dark" ? dark : light;
}

function setScript(initialValue) {
  var mql = window.matchMedia("(prefers-color-scheme: dark)");
  var systemPreference = mql.matches ? "dark" : "light";
  var persistedPreference = systemPreference;

  try {
    persistedPreference = localStorage.getItem("chakra-ui-color-mode");
  } catch (error) {
    console.log("Chakra UI: localStorage is not available. Color mode persistence might not work as expected");
  }

  var colorMode;

  if (persistedPreference) {
    colorMode = persistedPreference;
  } else if (initialValue === "system") {
    colorMode = systemPreference;
  } else {
    colorMode = initialValue != null ? initialValue : systemPreference;
  }

  if (colorMode) {
    /**
     * Keep in sync with `root.set() {@file ./color-mode.utils.ts}
     */
    document.documentElement.style.setProperty("--chakra-ui-color-mode", colorMode);
    document.documentElement.setAttribute("data-theme", colorMode);
  }
}

/**
 * Script to add to the root of your application when using localStorage,
 * to help prevent flash of color mode that can happen during page load.
 */
var ColorModeScript = function ColorModeScript(props) {
  var _props$initialColorMo = props.initialColorMode,
      initialColorMode = _props$initialColorMo === void 0 ? "light" : _props$initialColorMo;
  var html = "(" + String(setScript) + ")('" + initialColorMode + "')";
  return /*#__PURE__*/React__namespace.createElement("script", {
    nonce: props.nonce,
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
};

exports.ColorModeContext = ColorModeContext;
exports.ColorModeProvider = ColorModeProvider;
exports.ColorModeScript = ColorModeScript;
exports.DarkMode = DarkMode;
exports.LightMode = LightMode;
exports.cookieStorageManager = cookieStorageManager;
exports.localStorageManager = localStorageManager;
exports.setScript = setScript;
exports.storageKey = storageKey;
exports.useColorMode = useColorMode;
exports.useColorModeValue = useColorModeValue;
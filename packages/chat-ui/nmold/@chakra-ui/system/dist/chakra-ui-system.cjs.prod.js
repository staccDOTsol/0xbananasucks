'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var colorMode = require('@chakra-ui/color-mode');
var styledSystem = require('@chakra-ui/styled-system');
var react = require('@emotion/react');
var utils = require('@chakra-ui/utils');
var React = require('react');
var isEqual = require('react-fast-compare');
var reactUtils = require('@chakra-ui/react-utils');
var _styled = require('@emotion/styled');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

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
var isEqual__default = /*#__PURE__*/_interopDefault(isEqual);
var _styled__default = /*#__PURE__*/_interopDefault(_styled);

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

var ThemeProvider = function ThemeProvider(props) {
  var cssVarsRoot = props.cssVarsRoot,
      theme = props.theme,
      children = props.children;
  var computedTheme = React__namespace.useMemo(function () {
    return styledSystem.toCSSVar(theme);
  }, [theme]);
  return /*#__PURE__*/React__namespace.createElement(react.ThemeProvider, {
    theme: computedTheme
  }, /*#__PURE__*/React__namespace.createElement(CSSVars, {
    root: cssVarsRoot
  }), children);
};
var CSSVars = function CSSVars(_ref) {
  var _ref$root = _ref.root,
      root = _ref$root === void 0 ? ":host, :root" : _ref$root;
  return /*#__PURE__*/React__namespace.createElement(react.Global, {
    styles: function styles(theme) {
      var _ref2;

      return _ref2 = {}, _ref2[root] = theme.__cssVars, _ref2;
    }
  });
};
function useTheme() {
  var theme = React__namespace.useContext(react.ThemeContext);

  if (!theme) {
    throw Error("useTheme: `theme` is undefined. Seems you forgot to wrap your app in `<ChakraProvider />` or `<ThemeProvider />`");
  }

  return theme;
}

var _createContext = reactUtils.createContext({
  name: "StylesContext",
  errorMessage: "useStyles: `styles` is undefined. Seems you forgot to wrap the components in `<StylesProvider />` "
}),
    StylesProvider = _createContext[0],
    useStyles = _createContext[1];
/**
 * Applies styles defined in `theme.styles.global` globally
 * using emotion's `Global` component
 */

var GlobalStyle = function GlobalStyle() {
  var _useColorMode = colorMode.useColorMode(),
      colorMode$1 = _useColorMode.colorMode;

  return /*#__PURE__*/React__namespace.createElement(react.Global, {
    styles: function styles(theme) {
      var styleObjectOrFn = utils.memoizedGet(theme, "styles.global");
      var globalStyles = utils.runIfFn(styleObjectOrFn, {
        theme: theme,
        colorMode: colorMode$1
      });
      if (!globalStyles) return undefined;
      var styles = styledSystem.css(globalStyles)(theme);
      return styles;
    }
  });
};

/**
 * Carefully selected html elements for chakra components.
 * This is mostly for `chakra.<element>` syntax.
 */
var domElements = ["a", "b", "article", "aside", "blockquote", "button", "caption", "cite", "circle", "code", "dd", "div", "dl", "dt", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "img", "input", "kbd", "label", "li", "main", "mark", "nav", "ol", "p", "path", "pre", "q", "rect", "s", "svg", "section", "select", "strong", "small", "span", "sub", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "tr", "ul"];
function omitThemingProps(props) {
  return utils.omit(props, ["styleConfig", "size", "variant", "colorScheme"]);
}

function useChakra() {
  var colorModeResult = colorMode.useColorMode();
  var theme = useTheme();
  return _extends({}, colorModeResult, {
    theme: theme
  });
}

var resolveBreakpointValue = function resolveBreakpointValue(theme, tokenValue, fallbackValue) {
  var _ref, _getValue;

  if (tokenValue === null) return tokenValue;

  var getValue = function getValue(val) {
    var _theme$__breakpoints, _theme$__breakpoints$;

    return (_theme$__breakpoints = theme.__breakpoints) == null ? void 0 : (_theme$__breakpoints$ = _theme$__breakpoints.asArray) == null ? void 0 : _theme$__breakpoints$[val];
  };

  return (_ref = (_getValue = getValue(tokenValue)) != null ? _getValue : getValue(fallbackValue)) != null ? _ref : fallbackValue;
}; // inspired from ./css.ts : resolveTokenValue


var resolveTokenValue = function resolveTokenValue(theme, tokenValue, fallbackValue) {
  var _ref2, _getValue2;

  if (tokenValue == null) return tokenValue;

  var getValue = function getValue(val) {
    var _theme$__cssMap, _theme$__cssMap$val;

    return (_theme$__cssMap = theme.__cssMap) == null ? void 0 : (_theme$__cssMap$val = _theme$__cssMap[val]) == null ? void 0 : _theme$__cssMap$val.value;
  };

  return (_ref2 = (_getValue2 = getValue(tokenValue)) != null ? _getValue2 : getValue(fallbackValue)) != null ? _ref2 : fallbackValue;
};

function useToken(scale, token, fallback) {
  var theme = useTheme();

  if (Array.isArray(token)) {
    var fallbackArr = [];

    if (fallback) {
      fallbackArr = Array.isArray(fallback) ? fallback : [fallback];
    }

    return token.map(function (token, index) {
      var _fallbackArr$index2;

      if (scale === "breakpoints") {
        var _fallbackArr$index;

        return resolveBreakpointValue(theme, token, (_fallbackArr$index = fallbackArr[index]) != null ? _fallbackArr$index : token);
      }

      var path = scale + "." + token;
      return resolveTokenValue(theme, path, (_fallbackArr$index2 = fallbackArr[index]) != null ? _fallbackArr$index2 : token);
    });
  }

  if (scale === "breakpoints") {
    return resolveBreakpointValue(theme, token, fallback);
  }

  var path = scale + "." + token;
  return resolveTokenValue(theme, path, fallback);
}
function useProps(themeKey, props) {
  var _theme$components, _styleConfig$defaultP;

  var _useChakra = useChakra(),
      theme = _useChakra.theme,
      colorMode = _useChakra.colorMode;

  var styleConfig = props.styleConfig || ((_theme$components = theme.components) == null ? void 0 : _theme$components[themeKey]);
  var defaultProps = (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {};

  var propsWithDefault = _extends({}, defaultProps, utils.filterUndefined(props));

  var stylesRef = React.useRef({});
  var mergedProps = utils.mergeWith({}, propsWithDefault, {
    theme: theme,
    colorMode: colorMode
  });
  var memoizedStyles = React.useMemo(function () {
    if (styleConfig) {
      var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes, _styleConfig$sizes2;

      var baseStyles = utils.runIfFn((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
      var variants = utils.runIfFn((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
      var sizes = utils.runIfFn((_styleConfig$sizes = (_styleConfig$sizes2 = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes2[mergedProps.size]) != null ? _styleConfig$sizes : {}, mergedProps);
      var styles = utils.mergeWith(baseStyles, sizes, variants);

      if (styleConfig.parts) {
        styleConfig.parts.forEach(function (part) {
          var _styles$part;

          styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
        });
      }

      var isStyleEqual = isEqual__default["default"](stylesRef.current, styles);

      if (!isStyleEqual) {
        stylesRef.current = styles;
      }
    }

    return stylesRef.current;
  }, [styleConfig, mergedProps]);
  return {
    styles: memoizedStyles,
    props: omitThemingProps(propsWithDefault)
  };
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

/**
 * List of props for emotion to omit from DOM.
 * It mostly consists of Chakra props
 */

var allPropNames = new Set([].concat(styledSystem.propNames, ["textStyle", "layerStyle", "apply", "isTruncated", "noOfLines", "focusBorderColor", "errorBorderColor", "as", "__css", "css", "sx"]));
/**
 * htmlWidth and htmlHeight is used in the <Image />
 * component to support the native `width` and `height` attributes
 *
 * https://github.com/chakra-ui/chakra-ui/issues/149
 */

var validHTMLProps = new Set(["htmlWidth", "htmlHeight", "htmlSize"]);
var shouldForwardProp = function shouldForwardProp(prop) {
  return validHTMLProps.has(prop) || !allPropNames.has(prop);
};

var _excluded$1 = ["theme", "css", "__css", "sx"],
    _excluded2 = ["baseStyle"];

/**
 * Style resolver function that manages how style props are merged
 * in combination with other possible ways of defining styles.
 *
 * For example, take a component defined this way:
 * ```jsx
 * <Box fontSize="24px" sx={{ fontSize: "40px" }}></Box>
 * ```
 *
 * We want to manage the priority of the styles properly to prevent unwanted
 * behaviors. Right now, the `sx` prop has the highest priority so the resolved
 * fontSize will be `40px`
 */
var toCSSObject = function toCSSObject(_ref) {
  var baseStyle = _ref.baseStyle;
  return function (props) {
    props.theme;
        var cssProp = props.css,
        __css = props.__css,
        sx = props.sx,
        rest = _objectWithoutPropertiesLoose(props, _excluded$1);

    var styleProps = utils.objectFilter(rest, function (_, prop) {
      return styledSystem.isStyleProp(prop);
    });
    var finalBaseStyle = utils.runIfFn(baseStyle, props);
    var finalStyles = Object.assign({}, __css, finalBaseStyle, utils.filterUndefined(styleProps), sx);
    var computedCSS = styledSystem.css(finalStyles)(props.theme);
    return cssProp ? [computedCSS, cssProp] : computedCSS;
  };
};
function styled(component, options) {
  var _ref2 = options != null ? options : {},
      baseStyle = _ref2.baseStyle,
      styledOptions = _objectWithoutPropertiesLoose(_ref2, _excluded2);

  if (!styledOptions.shouldForwardProp) {
    styledOptions.shouldForwardProp = shouldForwardProp;
  }

  var styleObject = toCSSObject({
    baseStyle: baseStyle
  });
  return _styled__default["default"](component, styledOptions)(styleObject);
}
var chakra = styled;
domElements.forEach(function (tag) {
  chakra[tag] = chakra(tag);
});

/**
 * All credit goes to Chance (Reach UI), Haz (Reakit) and (fluentui)
 * for creating the base type definitions upon which we improved on
 */
function forwardRef(component) {
  return /*#__PURE__*/React__namespace.forwardRef(component);
}

var _excluded = ["styleConfig"];
function useStyleConfig(themeKey, props, opts) {
  var _styleConfig$defaultP;

  if (props === void 0) {
    props = {};
  }

  if (opts === void 0) {
    opts = {};
  }

  var _props = props,
      styleConfigProp = _props.styleConfig,
      rest = _objectWithoutPropertiesLoose(_props, _excluded);

  var _useChakra = useChakra(),
      theme = _useChakra.theme,
      colorMode = _useChakra.colorMode;

  var themeStyleConfig = utils.memoizedGet(theme, "components." + themeKey);
  var styleConfig = styleConfigProp || themeStyleConfig;
  var mergedProps = utils.mergeWith({
    theme: theme,
    colorMode: colorMode
  }, (_styleConfig$defaultP = styleConfig == null ? void 0 : styleConfig.defaultProps) != null ? _styleConfig$defaultP : {}, utils.filterUndefined(utils.omit(rest, ["children"])));
  /**
   * Store the computed styles in a `ref` to avoid unneeded re-computation
   */

  var stylesRef = React.useRef({});

  if (styleConfig) {
    var _styleConfig$baseStyl, _styleConfig$variants, _styleConfig$variants2, _styleConfig$sizes$me, _styleConfig$sizes, _opts;

    var baseStyles = utils.runIfFn((_styleConfig$baseStyl = styleConfig.baseStyle) != null ? _styleConfig$baseStyl : {}, mergedProps);
    var variants = utils.runIfFn((_styleConfig$variants = (_styleConfig$variants2 = styleConfig.variants) == null ? void 0 : _styleConfig$variants2[mergedProps.variant]) != null ? _styleConfig$variants : {}, mergedProps);
    var sizes = utils.runIfFn((_styleConfig$sizes$me = (_styleConfig$sizes = styleConfig.sizes) == null ? void 0 : _styleConfig$sizes[mergedProps.size]) != null ? _styleConfig$sizes$me : {}, mergedProps);
    var styles = utils.mergeWith({}, baseStyles, sizes, variants);

    if ((_opts = opts) != null && _opts.isMultiPart && styleConfig.parts) {
      styleConfig.parts.forEach(function (part) {
        var _styles$part;

        styles[part] = (_styles$part = styles[part]) != null ? _styles$part : {};
      });
    }

    var isStyleEqual = isEqual__default["default"](stylesRef.current, styles);

    if (!isStyleEqual) {
      stylesRef.current = styles;
    }
  }

  return stylesRef.current;
}
function useMultiStyleConfig(themeKey, props) {
  return useStyleConfig(themeKey, props, {
    isMultiPart: true
  });
}

Object.defineProperty(exports, 'keyframes', {
  enumerable: true,
  get: function () { return react.keyframes; }
});
exports.CSSVars = CSSVars;
exports.GlobalStyle = GlobalStyle;
exports.StylesProvider = StylesProvider;
exports.ThemeProvider = ThemeProvider;
exports.chakra = chakra;
exports.forwardRef = forwardRef;
exports.omitThemingProps = omitThemingProps;
exports.shouldForwardProp = shouldForwardProp;
exports.styled = styled;
exports.toCSSObject = toCSSObject;
exports.useChakra = useChakra;
exports.useMultiStyleConfig = useMultiStyleConfig;
exports.useProps = useProps;
exports.useStyleConfig = useStyleConfig;
exports.useStyles = useStyles;
exports.useTheme = useTheme;
exports.useToken = useToken;
Object.keys(colorMode).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return colorMode[k]; }
  });
});
Object.keys(styledSystem).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () { return styledSystem[k]; }
  });
});
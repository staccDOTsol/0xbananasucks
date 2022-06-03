'use strict';

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

/**
 * useSafeLayoutEffect enables us to safely call `useLayoutEffect` on the browser
 * (for SSR reasons)
 *
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser.
 *
 * @see https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 */

var useSafeLayoutEffect = utils.isBrowser ? React__namespace.useLayoutEffect : React__namespace.useEffect;

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param fn the function to persist
 * @param deps the function dependency list
 */

function useCallbackRef(fn, deps) {
  if (deps === void 0) {
    deps = [];
  }

  var ref = React__namespace.useRef(fn);
  useSafeLayoutEffect(function () {
    ref.current = fn;
  }); // eslint-disable-next-line react-hooks/exhaustive-deps

  return React__namespace.useCallback(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return ref.current == null ? void 0 : ref.current.apply(ref, args);
  }, deps);
}

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param env the dom environment to execute against (defaults to `document`)
 * @param options the event listener options
 *
 * @internal
 */
function useEventListener(event, handler, env, options) {
  var listener = useCallbackRef(handler);
  React__namespace.useEffect(function () {
    var _runIfFn;

    var node = (_runIfFn = utils.runIfFn(env)) != null ? _runIfFn : document;

    if (!handler) {
      return;
    }

    node.addEventListener(event, listener, options);
    return function () {
      node.removeEventListener(event, listener, options);
    };
  }, [event, env, options, listener, handler]);
  return function () {
    var _runIfFn2;

    var node = (_runIfFn2 = utils.runIfFn(env)) != null ? _runIfFn2 : document;
    node.removeEventListener(event, listener, options);
  };
}

function useAnimationState(props) {
  var isOpen = props.isOpen,
      ref = props.ref;

  var _useState = React.useState(isOpen),
      mounted = _useState[0],
      setMounted = _useState[1];

  var _useState2 = React.useState(false),
      once = _useState2[0],
      setOnce = _useState2[1];

  React.useEffect(function () {
    if (!once) {
      setMounted(isOpen);
      setOnce(true);
    }
  }, [isOpen, once, mounted]);
  useEventListener("animationend", function () {
    setMounted(isOpen);
  }, function () {
    return ref.current;
  });
  var hidden = isOpen ? false : !mounted;
  return {
    present: !hidden,
    onComplete: function onComplete() {
      var _ref$current;

      var win = utils.getOwnerWindow(ref.current);
      var evt = new win.CustomEvent("animationend", {
        bubbles: true
      });
      (_ref$current = ref.current) == null ? void 0 : _ref$current.dispatchEvent(evt);
    }
  };
}

exports.useAnimationState = useAnimationState;
exports.useCallbackRef = useCallbackRef;
exports.useEventListener = useEventListener;
exports.useSafeLayoutEffect = useSafeLayoutEffect;

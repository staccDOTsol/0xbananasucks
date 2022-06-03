import { isBrowser, runIfFn, getOwnerWindow } from '@chakra-ui/utils';
import * as React from 'react';
import { useState, useEffect } from 'react';

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

var useSafeLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

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

  var ref = React.useRef(fn);
  useSafeLayoutEffect(function () {
    ref.current = fn;
  }); // eslint-disable-next-line react-hooks/exhaustive-deps

  return React.useCallback(function () {
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
  React.useEffect(function () {
    var _runIfFn;

    var node = (_runIfFn = runIfFn(env)) != null ? _runIfFn : document;

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

    var node = (_runIfFn2 = runIfFn(env)) != null ? _runIfFn2 : document;
    node.removeEventListener(event, listener, options);
  };
}

function useAnimationState(props) {
  var isOpen = props.isOpen,
      ref = props.ref;

  var _useState = useState(isOpen),
      mounted = _useState[0],
      setMounted = _useState[1];

  var _useState2 = useState(false),
      once = _useState2[0],
      setOnce = _useState2[1];

  useEffect(function () {
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

      var win = getOwnerWindow(ref.current);
      var evt = new win.CustomEvent("animationend", {
        bubbles: true
      });
      (_ref$current = ref.current) == null ? void 0 : _ref$current.dispatchEvent(evt);
    }
  };
}

export { useSafeLayoutEffect as a, useEventListener as b, useAnimationState as c, useCallbackRef as u };

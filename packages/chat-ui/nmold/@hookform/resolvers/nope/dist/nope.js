var r=require("@hookform/resolvers"),e=function r(e,o,t){return void 0===o&&(o={}),void 0===t&&(t=""),Object.keys(e).reduce(function(o,a){var i=t?t+"."+a:a,s=e[a];return"string"==typeof s?o[i]={message:s}:r(s,o,i),o},o)};exports.nopeResolver=function(o,t){return void 0===t&&(t={abortEarly:!1}),function(a,i,s){var n=o.validate(a,i,t);return n?{values:{},errors:r.toNestError(e(n),s)}:(s.shouldUseNativeValidation&&r.validateFieldsNatively({},s),{values:a,errors:{}})}};
//# sourceMappingURL=nope.js.map
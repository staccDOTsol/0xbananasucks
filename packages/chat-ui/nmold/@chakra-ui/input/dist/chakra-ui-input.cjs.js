'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./chakra-ui-input.cjs.prod.js");
} else {
  module.exports = require("./chakra-ui-input.cjs.dev.js");
}

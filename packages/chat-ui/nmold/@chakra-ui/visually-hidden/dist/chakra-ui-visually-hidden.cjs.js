'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./chakra-ui-visually-hidden.cjs.prod.js");
} else {
  module.exports = require("./chakra-ui-visually-hidden.cjs.dev.js");
}

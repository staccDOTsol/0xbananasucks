'use strict';

if (process.env.NODE_ENV === "production") {
  module.exports = require("./chakra-ui-table.cjs.prod.js");
} else {
  module.exports = require("./chakra-ui-table.cjs.dev.js");
}
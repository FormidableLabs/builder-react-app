"use strict";

/**
 * Example App Logic
 */
/*eslint-disable func-style*/

function getBase() {
  return "The time is " + new Date().toString();
}

module.exports = {
  getBase: getBase
};

"use strict";

var Util = require("../../../server/util");

describe("spec/server/util", function () {
  describe("Util", function () {
    it("should handle base case", function () {
      expect(Util.getBase()).to.equal("The time is " + new Date().toString());
    });
  });
});

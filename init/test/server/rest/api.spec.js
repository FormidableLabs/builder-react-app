"use strict";

// Wraps `superagent` with test methods.
// See: http://visionmedia.github.io/superagent/
// See: https://github.com/visionmedia/supertest
var request = require("supertest");
var httpConstants = require("../../../shared/constants").http;

describe("rest/api", function () {
  describe("base", function () {
    it("should return base response", function (done) {
      request(global.TEST_REST_BASE_URL)
        .get("api/base")
        .expect("content-type", /json/)
        .expect(httpConstants.OK)
        .expect(function (res) {
          if (!res.body.base) {
            throw new Error("missing base key");
          }
        })
        .end(done);
    });
  });
});

"use strict";

/**
 * Application functional tests
 *
 * **Note**: As opposed to client / server unit tests tha follow file structure
 * and server REST tests that follow the API, functional tests have a bit
 * looser organizational structure. Some time should be spent coming up with
 * a good file organizational / test suite naming hierachy for your specific
 * project.
 */
var adapter = global.adapter;

describe("func/application", function () {
  describe("home", function () {
    it("should load content", function () {
      return adapter.client
        .url(global.TEST_FUNC_BASE_URL)

        .getText(".e2e-content").then(function (text) {
          expect(text).to.include("The time is");
        });
    });
  });

  describe("<%= componentPath %>", function () {
    it("should load React page", function () {
      return adapter.client
        .url(global.TEST_FUNC_BASE_URL + "<%= componentPath %>")

        .getText("h2").then(function (text) {
          expect(text).to.include("React Page");
        });
    });
  });
});

/**
 * Client tests
 */
import React from "react";
import TestUtils from "react-addons-test-utils";
import ReactPage from "client/components/<%= componentPath %>";

describe("components/<%= componentPath %>", () => {
  it("has expected content", () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<ReactPage />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("h2");
    expect(output.props.children).to.contain("React Page");
  });
});

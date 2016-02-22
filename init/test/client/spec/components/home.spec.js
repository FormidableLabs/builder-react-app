/**
 * Client tests
 */
import React from "react";
import TestUtils from "react-addons-test-utils";
import { Home } from "client/components/home";

describe("components/home", () => {
  it("has expected content", () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(<Home base="Base content" />);
    const output = renderer.getRenderOutput();

    expect(output.type).to.equal("div");
    const [ h2, content ] = output.props.children;
    expect(h2.props.children).to.contain("Home");
    expect(content.props.children).to.contain("Base content");
  });
});

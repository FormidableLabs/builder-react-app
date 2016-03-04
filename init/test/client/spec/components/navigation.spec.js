/**
 * Client tests
 */
import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import Navigation from "client/components/navigation";
import { Link } from "react-router";

describe("components/navigation", () => {
  it("has expected content", () => {
    const page = TestUtils.renderIntoDocument(<Navigation />);
    const links = TestUtils.scryRenderedComponentsWithType(page, Link);

    const aTags = links.map((link) => {
      const a = TestUtils.findRenderedDOMComponentWithTag(link, "a");
      return ReactDOM.findDOMNode(a);
    });

    expect(aTags[0]).to.have.property("innerText", "Home");
    expect(aTags[1]).to.have.property("innerText", "React Page");
  });
});

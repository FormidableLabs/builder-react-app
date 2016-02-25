/**
 * Container page.
 */
import React from "react";
import Navigation from "../components/navigation";

class Page extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <h1><%= packageName %></h1>
        {this.props.children}
      </div>
    );
  }
}

Page.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ])
};

export default Page;

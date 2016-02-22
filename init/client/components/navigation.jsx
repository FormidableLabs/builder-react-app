import React from "react";
import { Link } from "react-router";

const listStyle = {
  listStyleType: "none",
  margin: 0,
  padding: 0
};

const listItemStyle = {
  marginRight: "1em",
  display: "inline-block"
};

class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <Link to="/">Home</Link>
          </li>

          <li style={listItemStyle}>
            <Link to="/<%= componentPath %>">React Page</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navigation;

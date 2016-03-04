import React from "react";
import { connect } from "react-redux";
import { fetchBase } from "../actions/base";

export class Home extends React.Component {
  componentDidMount() {
    if (!this.props.base) {
      this.props.dispatch(fetchBase());
    }
  }

  render() {
    const content = this.props.baseError ?
      `Error: ${this.props.baseError}` :
      this.props.base;
    return (
      <div>
        <h2>Home</h2>
        <p className="e2e-content">{content}</p>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: React.PropTypes.func,
  base: React.PropTypes.string,
  baseError: React.PropTypes.string
};

export default connect((state) => ({
  base: state.base.base,
  baseError: state.base.baseError
}))(Home);

import React from "react";
import PropTypes from "prop-types";


export default class Button extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    orange: PropTypes.bool,
    bbb: PropTypes.bool,
    wide: PropTypes.bool,
    clickHandler: PropTypes.func,
  };

  handleClick = () => {
    this.props.clickHandler(this.props.name);
  };

  render() {
    const className = [
      "component-button",
      this.props.orange ? "orange" : "",
      this.props.wide ? "wide" : "",
      this.props.bbb ? "bbb" : "",
    ];

    return (

      <div className={className.join(" ").trim()}>
        <button onClick={this.handleClick}>{this.props.name}</button>
      </div>
    );
  }
}

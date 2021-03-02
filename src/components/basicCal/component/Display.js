import React from "react";
import PropTypes from "prop-types";


export default class Display extends React.Component {
    static propTypes = {
        value: PropTypes.string,
    };


    render() {
        return (
            <div className="component-display">
                <div className="result">{this.props.value}</div>
            </div>
        );
    }
}
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
export const BUTTON_TYPE_LIST = ['default', 'danger', 'success'];

class Button extends React.Component {
    constructor(props) {
        super(props)
    }
    static propTypes = {
        type: PropTypes.oneOf(BUTTON_TYPE_LIST),
        onClick: PropTypes.func
    }
    static defaultProps = {
        type: 'default'
    }
    get compClass() {
        return `${this.props.className} ${this.props.type}-btn btn`;
    }
    render() {
        return (
            <button className={this.compClass} onClick={this.props.onClick}>
                <span>{this.props.word}</span>
            </button>
        )
    }
}
export default Button
import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';
import calculate from '../logic/calculate';
import './App.css';

export default class BasicCal extends React.Component {
    state = {
        total: null,
        next: null,
        operation: null,
        memory: null,
    };

    handleClick = (buttonName) => {
        this.setState(calculate(this.state, buttonName));
    };

    clearLastChar() {
        this.setState({
            next: this.state.next.substring(0, this.state.next.length - 1) || '0',
        });
    }

    handleKeyDown = (event) => {
        let { key } = event;

        if (key === 'Enter') key = '=';

        if (/\d/.test(key)) {
            event.preventDefault();
            this.setState(calculate(this.state, key));
        } else if (key === '*' || key === '-' || key === '+' || key === '/' || key === '=') {
            event.preventDefault();
            if (key === '*') {
                key = 'x';
            }
            this.setState(calculate(this.state, key));
        } else if (key === '.') {
            event.preventDefault();
            this.setState(calculate(this.state, '.'));
        } else if (key === '%') {
            event.preventDefault();
            this.setState(calculate(this.state, '%'));
        } else if (key === 'Backspace') {
            event.preventDefault();
            this.clearLastChar();
        }
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
            <div id='basicCal'>
                <div  className='component-app'>
                    <Display value={this.state.next || this.state.total || '0'} />
                    <ButtonPanel clickHandler={this.handleClick} />
                </div>
            </div>
        );
    }
}

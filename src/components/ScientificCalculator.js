import React, { Component } from 'react';
import './ScientificCalculator.css';
import PointTarget from 'react-point';

class AutoScalingText extends Component {
    state = {
        scale: 1,
    };

    componentDidUpdate() {
        const { scale } = this.state;
        const node = this.node;
        const parentNode = node.parentNode;
        const availableWidth = parentNode.offsetWidth;
        const actualWidth = node.offsetWidth;
        const actualScale = availableWidth / actualWidth;

        if (scale === actualScale) return;

        if (actualScale < 1) {
            this.setState({ scale: actualScale });
        } else if (scale < 1) {
            this.setState({ scale: 1 });
        }
    }

    render() {
        const { scale } = this.state;

        return (
            <div
                className='auto-scaling-text'
                style={{ transform: `scale(${scale},${scale})` }}
                ref={(node) => (this.node = node)}
            >
                {this.props.children}
            </div>
        );
    }
}

class CalculatorDisplay extends Component {
    render() {
        const { value, ...props } = this.props;
        const language = navigator.language || 'en-US';
        const escapedKeys = [' e ', 'E', '*', '(', ')', 'r', 'o'];
        let isNumeric = true;

        escapedKeys.forEach((key) => {
            if (value.includes(key)) isNumeric = false;
        });

        const parsedValue = isNumeric ? parseFloat(value) : value;

        let formattedValue = parsedValue.toLocaleString(language, {
            useGrouping: true,
            maximumFractionDigits: 10,
        });

        const match = value.match(/\.\d*?(0*)$/);

        if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];

        return (
            <div {...props}>
                <AutoScalingText>{formattedValue}</AutoScalingText>
            </div>
        );
    }
}

class CalculatorKey extends Component {
    render() {
        const { onPress, className, ...props } = this.props;

        return (
            <PointTarget onPoint={onPress}>
                <button className={`calculator-key ${className}`} {...props} />
            </PointTarget>
        );
    }
}

const CalculatorOperations = {
    '/': (prevValue, nextValue) => (nextValue === 0 ? 'error' : prevValue / nextValue),
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '=': (prevValue, nextValue) => nextValue,
    nthRoot: (prevValue, nextValue) => Math.pow(nextValue, 1 / prevValue),
    xPowY: (prevValue, nextValue) => Math.pow(prevValue, nextValue),
    yPowX: (prevValue, nextValue) => Math.pow(nextValue, prevValue),
    logY: (prevValue, nextValue) => Math.log(nextValue) / Math.log(prevValue),
};

class ScientificCalculator extends Component {
    state = {
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false,
        isDot: false,
        done: false,
        shift: false,
        degree: false,
        ee: false,
        isMemoryActive: false,
        isBracketsActive: false,
        isLeftBracket: false,
        isRightBracket: false,
        isDigit: false,
        isOperator: false,
        countBracket: 0,
        checkLeftBracket: false,
        memory: {
            memory_plus: 0,
            memory_minus: 0,
            memory_recall: null,
        },
    };

    degreeClick = () => {
        this.setState((state) => {
            return {
                degree: !state.degree,
            };
        });
    };

    shiftClick = () => {
        this.setState((state) => {
            return {
                shift: !state.shift,
            };
        });
    };

    clearAll() {
        this.setState({
            value: null,
            displayValue: '0',
            operator: null,
            waitingForOperand: false,
            isDot: false,
            done: false,
            ee: false,
            isMemoryActive: false,
            isBracketsActive: false,
            isRightBracket: false,
            isLeftBracket: false,
            isDigit: false,
            isOperator: false,
            countBracket: 0,
            checkLeftBracket: false,
        });
    }

    clearDisplay() {
        this.setState({
            displayValue: '0',
        });
    }

    clearLastChar() {
        const { displayValue } = this.state;

        this.setState({
            displayValue: displayValue.substring(0, displayValue.length - 1) || '0',
        });
    }

    toggleSign() {
        const { displayValue } = this.state;
        const newValue = parseFloat(displayValue) * -1;

        this.setState({
            displayValue: String(newValue),
        });
    }

    inputPercent() {
        const { displayValue } = this.state;
        const currentValue = parseFloat(displayValue);

        if (currentValue === 0) return;

        const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
        const newValue = parseFloat(displayValue) / 100;

        this.setState({
            displayValue: String(newValue.toFixed(fixedDigits.length + 2)),
            done: true,
        });
    }

    inputDot() {
        const {
            displayValue,
            waitingForOperand,
            isDot,
            isMemoryActive,
            isBracketsActive,
            countBracket,
            isOperator,
        } = this.state;

        if (waitingForOperand === true) {
            if (isBracketsActive === true && countBracket === 0) {
                this.setState({
                    displayValue: displayValue + '*0.',
                    waitingForOperand: false,
                });
            } else if (isBracketsActive === true && isOperator === true) {
                this.setState({
                    displayValue: displayValue + '0.',
                    waitingForOperand: false,
                });
            } else {
                this.setState({ displayValue: '0.', waitingForOperand: false });
            }
        } else if (isDot === true) {
            this.setState({
                displayValue: displayValue + '.',
                waitingForOperand: false,
                isDot: true,
            });
        } else if (isMemoryActive === true) {
            this.setState({
                displayValue: '0.',
                waitingForOperand: false,
                isDot: true,
            });
        } else if (!/\./.test(displayValue)) {
            this.setState({
                displayValue: displayValue + '.',
                waitingForOperand: false,
                isDot: true,
            });
        }
    }

    inputDigit(digit) {
        const { displayValue, waitingForOperand, isDot, done } = this.state;

        if (waitingForOperand) {
            this.setState({
                displayValue: String(digit),
                waitingForOperand: false,
                isDigit: true,
            });
        } else {
            const hasDot = displayValue.includes('.');
            const integer = displayValue.split('.')[0];

            if (!hasDot && integer.length >= 10) return;

            if (done === true) {
                this.clearAll();
                this.setState({
                    displayValue: String(digit),
                    isDigit: true,
                    isOperator: false,
                });
            } else if (isDot === true) {
                this.setState({ displayValue: displayValue + digit });
            } else {
                this.setState({
                    displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
                    isDigit: true,
                    isOperator: true,
                    checkLeftBracket: false,
                });
            }
        }
    }

    performOperation(nextOperator) {
        const {
            value,
            displayValue,
            operator,
            waitingForOperand,
            isMemoryActive,
            isBracketsActive,
            isDigit,
            isOperator,
            ee,
            countBracket,
        } = this.state;

        if (nextOperator === '=' && countBracket !== 0) {
            return this.setState({
                displayValue: 'error',
                isBracketsActive: false,
                done: true,
            });
        }

        if (isOperator === false) {
            return this.setState({ displayValue });
        }

        if (isBracketsActive === true && nextOperator === '=') {
            return this.setState({
                displayValue: String(eval(displayValue)),
                isBracketsActive: false,
                done: true,
            });
        } else if (isBracketsActive === true) {
            if (isDigit) {
                this.setState({
                    displayValue: displayValue + nextOperator,
                    isOperator: false,
                    isDigit: false,
                    checkLeftBracket: false,
                });
            }
        } else {
            const inputValue = parseFloat(displayValue);

            if (ee === true) {
                const currentValue = displayValue.replace(/\s/g, '');
                return this.setState({
                    displayValue: parseFloat(currentValue).toPrecision(),
                    done: true,
                    ee: false,
                });
            }

            if (value == null) {
                this.setState({
                    value: inputValue,
                });
            } else if (
                (operator && waitingForOperand === false) ||
                (operator && isMemoryActive === true)
            ) {
                const currentValue = parseFloat(value) || 0;
                const newValue = CalculatorOperations[operator](currentValue, inputValue);

                this.setState({
                    value: newValue,
                    displayValue: String(newValue),
                });
            }

            this.setState({
                waitingForOperand: true,
                operator: nextOperator,
            });
        }
    }

    keyDown = (event) => {
        let { key } = event;

        if (key === 'Enter') key = '=';

        if (/\d/.test(key)) {
            event.preventDefault();
            this.inputDigit(parseInt(key, 10));
        } else if (key in CalculatorOperations) {
            event.preventDefault();
            this.performOperation(key);
        } else if (key === '.') {
            event.preventDefault();
            this.inputDot();
        } else if (key === '%') {
            event.preventDefault();
            this.inputPercent();
        } else if (key === 'Backspace') {
            event.preventDefault();
            this.clearLastChar();
        } else if (key === 'Clear') {
            event.preventDefault();

            if (this.state.displayValue !== '0') {
                this.clearDisplay();
            } else {
                this.clearAll();
            }
        }
    };

    memoryClear() {
        this.setState((prevState) => ({
            memory: {
                ...prevState.memory,
                memory_plus: 0,
                memory_minus: 0,
                memory_recall: null,
            },
            isMemoryActive: false,
        }));
    }

    memoryPlus() {
        let temp = parseFloat(this.state.displayValue) + this.state.memory.memory_plus;
        this.setState((prevState) => ({
            memory: {
                ...prevState.memory,
                memory_plus: temp,
            },
            isMemoryActive: true,
        }));
    }

    memoryMinus() {
        let temp = parseInt(this.state.displayValue) + this.state.memory.memory_minus;
        this.setState((prevState) => ({
            memory: {
                ...prevState.memory,
                memory_minus: temp,
            },
            isMemoryActive: true,
        }));
    }

    memoryRecall() {
        const { isMemoryActive } = this.state;

        let temp = (this.state.memory.memory_plus - this.state.memory.memory_minus).toString();

        if (isMemoryActive) {
            this.setState({
                displayValue: temp,
                isMemoryActive: true,
            });
        } else {
            this.setState({
                displayValue: temp,
                isMemoryActive: false,
            });
        }
    }

    power2() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.pow(parseFloat(displayValue), 2)), done: true });
    }

    power3() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.pow(parseFloat(displayValue), 3)), done: true });
    }

    tenPowerX() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.pow(10, parseFloat(displayValue))), done: true });
    }

    twoPowerX() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.pow(2, parseFloat(displayValue))), done: true });
    }

    rand() {
        this.setState({ displayValue: String(Math.random()) });
    }

    sin() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.sin(displayValue)), done: true });
        } else {
            const result = String(Math.sin((parseFloat(displayValue) * Math.PI) / 180));
            this.setState({ displayValue: result, done: true });
        }
    }

    cos() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.cos(displayValue)), done: true });
        } else {
            const result = String(Math.cos((parseInt(displayValue) * Math.PI) / 180));
            this.setState({ displayValue: result, done: true });
        }
    }

    tan() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.tan(displayValue)), done: true });
        } else {
            if (displayValue === '90' || displayValue === '270') {
                this.setState({ displayValue: 'Not a number' });
            } else {
                const result = String(Math.tan((parseFloat(displayValue) * Math.PI) / 180));
                this.setState({ displayValue: result, done: true });
            }
        }
    }

    sinh() {
        const { displayValue } = this.state;
        const result = String(Math.sinh(parseFloat(displayValue)));
        this.setState({ displayValue: result, done: true });
    }

    cosh() {
        const { displayValue } = this.state;
        const result = String(Math.cosh(parseFloat(displayValue)));
        this.setState({ displayValue: result, done: true });
    }

    tanh() {
        const { displayValue } = this.state;
        const result = String(Math.tanh(parseFloat(displayValue)));
        this.setState({ displayValue: result, done: true });
    }

    sinInverse() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.asin(displayValue)), done: true });
        } else {
            const result = String((Math.asin(parseFloat(displayValue)) * 180) / Math.PI);
            this.setState({ displayValue: result, done: true });
        }
    }

    cosInverse() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.acos(displayValue)), done: true });
        } else {
            const result = String((Math.acos(parseFloat(displayValue)) * 180) / Math.PI);
            this.setState({ displayValue: result, done: true });
        }
    }

    tanInverse() {
        const { displayValue, degree } = this.state;

        if (degree === false) {
            this.setState({ displayValue: String(Math.atan(displayValue)), done: true });
        } else {
            const result = String((Math.atan(parseFloat(displayValue)) * 180) / Math.PI);
            this.setState({ displayValue: result, done: true });
        }
    }

    sinhInverse() {
        const { displayValue } = this.state;
        const result = String(Math.asinh(parseFloat(displayValue)));
        this.setState({ displayValue: result, done: true });
    }

    coshInverse() {
        const { displayValue } = this.state;
        const result = String(Math.acosh(parseFloat(displayValue)));
        this.setState({ displayValue: result, done: true });
    }

    tanhInverse() {
        const { displayValue } = this.state;
        const result = String(Math.atanh(parseFloat(displayValue)));
        this.setState({ displayValue: result, done: true });
    }

    squareRoot() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.sqrt(parseFloat(displayValue))), done: true });
    }

    cubeRoot() {
        const { displayValue } = this.state;
        this.setState({ displayValue: String(Math.cbrt(parseFloat(displayValue))), done: true });
    }

    factorial() {
        const { displayValue } = this.state;

        if (displayValue.indexOf('.') !== -1) {
            return this.setState({ displayValue: 'NaN' });
        }

        if (displayValue === '1' || displayValue === '-1') {
            return this.setState({ displayValue });
        } else if (parseInt(displayValue) > 1) {
            var result = 1;

            for (var i = 1; i <= parseInt(displayValue); ++i) {
                result *= i;
            }

            return this.setState({ displayValue: String(result), done: true });
        } else if (parseInt(displayValue) < -1) {
            var resultNegative = 1;

            for (var j = -1; j >= parseInt(displayValue); j--) {
                resultNegative *= j;
            }

            return this.setState({ displayValue: String(resultNegative), done: true });
        }
    }

    log10() {
        const { displayValue } = this.state;

        if (parseInt(displayValue) <= 0) {
            return this.setState({ displayValue: 'Not a Number' });
        }

        this.setState({ displayValue: String(Math.log10(parseFloat(displayValue))), done: true });
    }

    log2() {
        const { displayValue } = this.state;

        if (parseInt(displayValue) <= 0) {
            return this.setState({ displayValue: 'Not a Number' });
        }

        this.setState({ displayValue: String(Math.log2(parseFloat(displayValue))), done: true });
    }

    log() {
        const { displayValue } = this.state;

        if (parseInt(displayValue) <= 0) {
            return this.setState({ displayValue: 'Not a Number' });
        }

        this.setState({ displayValue: String(Math.log(parseFloat(displayValue))), done: true });
    }

    multiplicativeInverse() {
        const { displayValue } = this.state;

        if (displayValue === '0') {
            return this.setState({ displayValue: 'error', done: true });
        }

        const result = String(1 / displayValue);
        this.setState({ displayValue: result, done: true });
    }

    exponential() {
        const { displayValue } = this.state;

        if (displayValue === '0') {
            return this.setState({ displayValue: '1' });
        }

        const result = String(Math.exp(parseFloat(displayValue)));
        this.setState({ displayValue: result, done: true });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keyDown);
    }

    ee() {
        const { displayValue, done, ee } = this.state;

        if (done === false) {
            if (ee === true) {
                this.setState({ displayValue });
            } else {
                this.setState({ displayValue: displayValue + ' e ', ee: true });
            }
        }
    }

    leftBracket() {
        const { displayValue, isOperator, countBracket, checkLeftBracket } = this.state;

        if (displayValue === '0') {
            this.setState({
                displayValue: '(',
                isBracketsActive: true,
                isLeftBracket: true,
                isOperator: true,
                countBracket: countBracket + 1,
                checkLeftBracket: true,
            });
        } else if (isOperator === false || checkLeftBracket === true) {
            this.setState({
                displayValue: displayValue + '(',
                isBracketsActive: true,
                isLeftBracket: true,
                isOperator: true,
                countBracket: countBracket + 1,
                checkLeftBracket: true,
            });
        } else {
            this.setState({
                displayValue: displayValue + '*(',
                isBracketsActive: true,
                isLeftBracket: true,
                isOperator: true,
                countBracket: countBracket + 1,
                checkLeftBracket: true,
            });
        }
    }

    rightBracket() {
        const { displayValue, isLeftBracket, isDigit, countBracket } = this.state;

        if (isLeftBracket && isDigit) {
            this.setState({
                displayValue: displayValue + ')',
                countBracket: countBracket - 1,
            });
        }
    }

    render() {
        const { displayValue } = this.state;
        const clearDisplay = displayValue !== '0';
        const clearText = clearDisplay ? 'C' : 'AC';

        return (
            <div id='scientific-calculator'>
                <div className='calculator-body'>
                    <div class='resultContainer'>
                        <div class='result'>
                            <p>
                                <CalculatorDisplay value={displayValue} />
                            </p>
                        </div>
                    </div>
                    <div className='button'>
                        <div className='test'>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.leftBracket()}
                            >
                                (
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.rightBracket()}
                            >
                                )
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.memoryClear()}
                            >
                                mc
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.memoryPlus()}
                            >
                                m+
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.memoryMinus()}
                            >
                                m-
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.memoryRecall()}
                            >
                                mr
                            </CalculatorKey>
                            <CalculatorKey
                                className='clear'
                                style={{ backgroundColor: '#BB4444', color: '#F0F5F9' }}
                                onPress={() =>
                                    clearDisplay ? this.clearDisplay() : this.clearAll()
                                }
                            >
                                {clearText}
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.toggleSign()}
                            >
                                -/+
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputPercent()}
                            >
                                %
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.performOperation('/')}
                            >
                                ÷
                            </CalculatorKey>
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={this.shiftClick}
                                >
                                    2
                                    <sup>
                                        <small>nd</small>
                                    </sup>
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={this.shiftClick}
                                >
                                    1
                                    <sup>
                                        <small>st</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.power2()}
                            >
                                x
                                <sup>
                                    <small>2</small>
                                </sup>
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.power3()}
                            >
                                x
                                <sup>
                                    <small>3</small>
                                </sup>
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.performOperation('xPowY')}
                            >
                                x
                                <sup>
                                    <small>y</small>
                                </sup>
                            </CalculatorKey>
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.exponential()}
                                >
                                    e
                                    <sup>
                                        <small>x</small>
                                    </sup>
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.performOperation('yPowX')}
                                >
                                    y
                                    <sup>
                                        <small>x</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tenPowerX()}
                                >
                                    10
                                    <sup>
                                        <small>x</small>
                                    </sup>
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.twoPowerX()}
                                >
                                    2
                                    <sup>
                                        <small>x</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(7)}
                            >
                                7
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(8)}
                            >
                                8
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(9)}
                            >
                                9
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.performOperation('*')}
                            >
                                ×
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.multiplicativeInverse()}
                            >
                                1/x
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.squareRoot()}
                            >
                                <sup>
                                    <small>2</small>
                                </sup>
                                √
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.cubeRoot()}
                            >
                                <sup>
                                    <small>3</small>
                                </sup>
                                √
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.performOperation('nthRoot')}
                            >
                                <sup>
                                    <small>x</small>
                                </sup>
                                √
                            </CalculatorKey>
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.log()}
                                >
                                    ln
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.performOperation('logY')}
                                >
                                    log
                                    <sub>
                                        <small>y</small>
                                    </sub>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.log10()}
                                >
                                    log
                                    <sub>
                                        <small>10</small>
                                    </sub>
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.log2()}
                                >
                                    log
                                    <sub>
                                        <small>2</small>
                                    </sub>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(4)}
                            >
                                4
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(5)}
                            >
                                5
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(6)}
                            >
                                6
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.performOperation('-')}
                            >
                                −
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.factorial()}
                            >
                                x!
                            </CalculatorKey>
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.sin()}
                                >
                                    sin
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.sinInverse()}
                                >
                                    sin
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.cos()}
                                >
                                    cos
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.cosInverse()}
                                >
                                    cos
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tan()}
                                >
                                    tan
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tanhInverse()}
                                >
                                    tan
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(Math.exp(1))}
                            >
                                e
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.ee()}
                            >
                                EE
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(1)}
                            >
                                1
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(2)}
                            >
                                2
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(3)}
                            >
                                3
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.performOperation('+')}
                            >
                                +
                            </CalculatorKey>
                            {!this.state.degree ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={this.degreeClick}
                                >
                                    Rad
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={this.degreeClick}
                                >
                                    Deg
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.sinh()}
                                >
                                    sinh
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.sinhInverse()}
                                >
                                    sinh
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.cosh()}
                                >
                                    cosh
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.coshInverse()}
                                >
                                    cosh
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            {!this.state.shift ? (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tanh()}
                                >
                                    tanh
                                </CalculatorKey>
                            ) : (
                                <CalculatorKey
                                    style={{ backgroundColor: '#52616b' }}
                                    onPress={() => this.tanhInverse()}
                                >
                                    tanh
                                    <sup>
                                        <small>-1</small>
                                    </sup>
                                </CalculatorKey>
                            )}
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(Math.PI)}
                            >
                                π
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.rand()}
                            >
                                Rand
                            </CalculatorKey>
                            <CalculatorKey
                                className='zero'
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDigit(0)}
                            >
                                0
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#52616b' }}
                                onPress={() => this.inputDot()}
                            >
                                .
                            </CalculatorKey>
                            <CalculatorKey
                                style={{ backgroundColor: '#c9d6df', color: '#52616b' }}
                                onPress={() => this.performOperation('=')}
                            >
                                =
                            </CalculatorKey>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScientificCalculator;

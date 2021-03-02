import react, { Component } from 'react';
import Nav from './Nav';
import Body from './Body';
import { Container, Row, Col } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import './App.css';
import axios from 'axios';
import UrlService from '../services/UrlService';
import { Redirect } from 'react-router';
import SaveIcon from '@material-ui/icons/Save';

export default class randomizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            result: [],
            activeRandomizer: 1,
            qty: 0,
            tGenerator: false,
            customList: false,
        };
        this.handleSelectConverter = this.handleSelectConverter.bind(this);
    }

    handleSelectConverter(con) {
        this.setState({
            activeRandomizer: this.handleType(con),
        });
    }

    setResult(result) {
        this.setState({
            result: result,
        });
    }

    handleGetQty = (qty) => {
        this.setState({
            qty: qty,
        });
    };

    handleGetData = (items) => {
        this.setState({
            items,
        });
        axios
            .post(UrlService.handleRandomizer(), {
                type: this.state.activeRandomizer,
                data: { items, qty: this.state.qty },
            })
            .then((res) => {
                console.log(res);
                this.setResult(res.data.result);
                console.log(this.state.result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSave = () => {
        let data = {};
        if (this.state.tGenerator) {
            data = {
                type: this.state.activeRandomizer,
                data: {
                    items: this.state.items,
                    qty: this.state.activeRandomizer,
                    result: this.state.result,
                },
            };
        } else {
            data = {
                type: this.state.activeRandomizer,
                data: { items: this.state.items, result: this.state.result },
            };
        }
        console.log(data);

        axios
            .post(UrlService.SaveRandomizer(), data)
            .then((res) => {
                alert(res.data.message);
            })
            .catch((err) => {
                alert(err.response.data.message);
            });
    };

    handleType = (data) => {
        let type = null;
        this.setState({ tGenerator: false, customList: false, result: [], items: [] });
        switch (data) {
            case 'Random Picker':
                type = 1;
                break;
            case 'Custom List':
                type = 2;
                this.setState({
                    customList: true,
                });
                break;
            case 'Decision Maker':
                type = 3;
                break;
            case 'Name Picker':
                type = 4;
                break;
            case 'Team Generator':
                type = 5;
                this.setState({
                    tGenerator: true,
                });
                break;
            case 'Yes or No':
                type = 6;
                break;
            default:
                break;
        }
        return type;
    };

    render() {
        if (!this.props.user) {
            return <Redirect to='/SignIn' />;
        }
        return (
            <div className="randomizer-dev">
                <Row className='justify-content-end m-2'>
                    <Button
                        variant='contained'
                        size='meddium'
                        onClick={this.handleSave}
                        startIcon={<SaveIcon />}
                        style={{ margin: '20px 5px', outline: 'none' }}
                    >
                        Save
                    </Button>
                </Row>
                <div className='randomizer'>
                    <Row>
                        <Nav onSelectRandomizer={this.handleSelectConverter} />
                        <Body
                            onGetData={this.handleGetData}
                            teamGenerator={this.state.tGenerator}
                            customListItem={this.state.customList}
                            getResult={this.state.result}
                            onGetQty={this.handleGetQty}
                            getType={this.state.activeRandomizer}
                        />
                    </Row>
                </div>
            </div>
        );
    }
}

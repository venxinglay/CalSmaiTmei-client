import React, { useLayoutEffect } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTextareaValue: '',
            qty: React.createRef(),
            data: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const a = this.state.data;
        const b = a.split('\n').filter((item) => item !== '');

        if (this.props.teamGenerator) {
            this.props.onGetQty(this.state.qty.current.value);
            this.props.onGetData(b);
        } else {
            this.props.onGetData(b);
        }
        if (this.props.getType == 6) {
            this.setState({
                data: "Yes\nNo"
            })
        }

    }
    handleChange(event) {
        this.setState({ data: event.target.value });

    }
    render() {
        let shows;
        let teamGen;
        let picker;
        let customList;

        if (this.props.teamGenerator) {
            shows = (
                <div className="justify-content-center">
                    <label className='txt-group justify-content-center'>Groups </label>
                    <input type='number' ref={this.state.qty} className='input-qty' />
                </div>
            );

            teamGen = (
                <div className='result-body-teamgen'>
                    {this.props.getResult.map((item, index) => (
                        <ul key={index}>
                            <h5>Team {index + 1}</h5>
                            <li>{item.join(' /  ')}</li>
                        </ul>
                    ))}
                </div>
            );
        }


        picker = <div className='result-body'>{this.props.getResult}</div>;

        customList = (
            <div className='result-body-teamgen'>
                {this.props.getResult.map((item, index) => (
                    <ul key={index}>
                        {index + 1}. {item}
                    </ul>
                ))}
            </div>
        );
        return (
            <Form onSubmit={this.handleSubmit}>
                <Row className='randomizer-body'>
                    <Form.Group controlId='exampleForm.ControlTextarea1' className='result-item-nav'>
                        <Form.Label>ITEMS :</Form.Label>
                        <Form.Control
                            as='textarea'
                            rows={15}
                            className='item-body'
                            value={this.state.data}
                            onChange={this.handleChange}
                        // ref={this.state.data}
                        />
                    </Form.Group>
                    <Form.Group className='result-item-nav'>
                        <Form.Label>RESULT : </Form.Label>
                        {this.props.teamGenerator
                            ? teamGen
                            : this.props.customListItem
                                ? customList
                                : picker}
                        {/*<Form.Control readOnly rows={15} value={this.props.getResult}></Form.Control>*/}
                    </Form.Group>
                </Row>
                <Row className='justify-content-md-center body-sumbit'>
                    <Col md='auto'>{shows}</Col>
                    <Col md=' auto'>
                        <Button
                            as='input'
                            type='submit'
                            variant='secondary'
                            value='Submit'
                            className='submit'
                        />{' '}
                    </Col>
                </Row>
            </Form>
        );
    }
}

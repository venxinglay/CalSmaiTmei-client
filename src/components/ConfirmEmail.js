import React from 'react';
import './Authentication.css';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UrlService from './services/UrlService';

const ConfirmEmail = () => {
    const { register, handleSubmit, errors } = useForm({
        criteriaMode: 'all',
    });

    const onSubmit = (data) => {
        axios.post(UrlService.forgotUrl(), data).then((res) => {
            console.log(res);
            alert(res.data.message)
        }).catch((err) => {
            alert(err.response.data.message)
        });
    };

    return (
        <>
            <Container id='confirm-email'>
                <Row className='justify-content-center'>
                    <p className='form-title'>Reset Password</p>
                </Row>
                <Row className='justify-content-center paragraph'>
                    <p className='mb-5 form-subtitle'>Please enter your email</p>
                </Row>
                <Form fluid='md' onSubmit={handleSubmit(onSubmit)}>
                    <Row className='justify-content-center'>
                        <Col lg={5} md={8} sm={10} xs={11}>
                            <Form.Group className='label-text' controlId='formBasicEmail'>
                                <Form.Label className='form-label'>Email</Form.Label>
                                <div className='input-field'>
                                    <Form.Control
                                        autoComplete='off'
                                        ref={register({
                                            required: 'This is required.',
                                            pattern: {
                                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                                message: 'Invalid Email Address',
                                            },
                                        })}
                                        name='email'
                                        className='from-control'
                                        type='email'
                                        placeholder='Enter Email'
                                        required
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name='email'
                                        render={({ messages }) => {
                                            return messages
                                                ? Object.entries(messages).map(
                                                    ([type, message]) => (
                                                        <p style={{ color: 'red' }} key={type}>
                                                            {message}
                                                        </p>
                                                    )
                                                )
                                                : null;
                                        }}
                                    />
                                    <BsFillEnvelopeFill className='input-icon' />
                                </div>
                                <Form.Text className='text-muted'></Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row className='mb-4'>
                        <Col style={{ textAlign: 'center' }}>
                            <Button className='confirm-email-button' variant='white' type='submit'>
                                Send Password Reset Link
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
};

export default ConfirmEmail;

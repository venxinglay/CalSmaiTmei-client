import React, { useRef, useState } from 'react';
import './Authentication.css';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { BsFillEnvelopeFill, BsLockFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UrlService from './services/UrlService';

const ConfirmPassword = (props) => {
    const { register, handleSubmit, errors, watch } = useForm({
        criteriaMode: 'all',
        defaultValues: {
            token: props.match.params.token,
        }
    });

    // Handle Reset Password
    const onSubmit = (data) => {
        axios.post(UrlService.resetPasswordUrl(), data).then((res) => {
            alert(res.data.message)
        }).catch((err) => {
            alert(err.response.data.message)
        });
    };


    const password = useRef({});
    password.current = watch('password', '');

    return (
        <>
            <Container id='confirm-password'>
                <Row className='justify-content-center'>
                    <p className='form-title'>Reset Password</p>
                </Row>
                <Row className='justify-content-center paragraph'>
                    <p className='mb-5 form-subtitle'>Please enter your new password</p>
                </Row>
                <Form fluid='md' onSubmit={handleSubmit(onSubmit)}>

                    <Row className='justify-content-center'>
                        <Col lg={5} md={8} sm={10} xs={11}>
                            <Form.Group className='label-text'>
                                <Form.Label className='form-label'>New Password</Form.Label>
                                <div className='input-field'>
                                    <Form.Control
                                        autoComplete='off'
                                        name='token'
                                        type='hidden'
                                        ref={register}
                                    />
                                    <Form.Control
                                        autoComplete='off'
                                        name='password'
                                        type='password'
                                        ref={register({
                                            required: 'This is required.',
                                            minLength: {
                                                value: 8,
                                                message: 'Password must have at least 8 characters',
                                            },
                                            maxLength: {
                                                value: 20,
                                                message:
                                                    'Password must have less than 20 characters',
                                            },
                                        })}
                                        required
                                        placeholder='Enter password'
                                    />
                                    {errors.password && (
                                        <p style={{ color: 'red' }}>{errors.password.message}</p>
                                    )}
                                    <BsLockFill className='input-icon'></BsLockFill>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='justify-content-center mb-3'>
                        <Col lg={5} md={8} sm={10} xs={11}>
                            <Form.Group className='label-text'>
                                <Form.Label className='form-label'>Confirm Password</Form.Label>
                                <div className='input-field'>
                                    <Form.Control
                                        autoComplete='off'
                                        required
                                        placeholder='Confirm Password'
                                        name='password_confirmation'
                                        type='password'
                                        ref={register({
                                            validate: (value) =>
                                                value === password.current ||
                                                'The passwords do not match',
                                        })}
                                    />
                                    {errors.password_repeat && (
                                        <p style={{ color: 'red' }}>
                                            {errors.password_repeat.message}
                                        </p>
                                    )}
                                    <BsLockFill className='input-icon'></BsLockFill>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <br></br>
                    <Row className='mb-4'>
                        <Col style={{ textAlign: 'center' }}>
                            <Button className='confirm-password-button' variant='white' type='submit'>
                                Reset Password
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
};

export default ConfirmPassword;

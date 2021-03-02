import React, { useRef } from 'react';

import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { BsFillEnvelopeFill, BsLockFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UrlService from './services/UrlService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = (props) => {
    const { register, handleSubmit, errors, watch } = useForm({
        criteriaMode: 'all',
    });

    const history = useHistory();
    const onSubmit = (data) => {

        axios.post(UrlService.registerUrl(), data).then(
            res => {
                if (res.data.user) {
                    localStorage.setItem('access_token', res.data.access_token);
                    props.setUser(res.data.user);
                    history.push('/randomizer')
                }

            }
        ).catch(
            err => {
                alert(err.response.data.errors.email.join(', '))
            }
        )
    }

    const password = useRef({});
    password.current = watch('password', '');

    return (
        <>
            <Container id='sign-up'>
                <Row className='justify-content-center'>
                    <p className='form-title'>Sign Up</p>
                </Row>
                <Row className='justify-content-center paragraph'>
                    <p className='mb-5 form-subtitle'>Create Your Free Account</p>
                </Row>
                <Form fluid='md' onSubmit={handleSubmit(onSubmit)}>
                    <Row className='justify-content-center'>
                        <Col lg={5} md={8} sm={10} xs={11}>
                            <Form.Group className='label-text'>
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
                                    {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

                                    <BsFillEnvelopeFill className='input-icon' />
                                </div>
                                <Form.Text className='text-muted'></Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col lg={5} md={8} sm={10} xs={11}>
                            <Form.Group className='label-text'>
                                <Form.Label className='form-label'>Password</Form.Label>
                                <div className='input-field'>
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
                                                message: 'Password must have less than 20 characters',
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
                                                value === password.current || 'The passwords do not match',
                                        })}
                                    />
                                    {errors.password_confirmation && (
                                        <p style={{ color: 'red' }}>{errors.password_confirmation.message}</p>
                                    )}
                                    <BsLockFill className='input-icon'></BsLockFill>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col style={{ textAlign: 'center' }}>
                            Already have an account?
                            <Link
                                to='/signin'
                                style={{
                                    color: '#52616b',
                                    fontWeight: '600px',
                                    marginLeft: '5px',
                                    textDecoration: 'none',
                                }}>
                                Sign In
                            </Link>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col style={{ textAlign: 'center' }}>
                            <Button className='sign-button' variant='white' type='submit'>
                                Sign Up
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
};

export default SignUp;
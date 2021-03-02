import '../App.css';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { BsFillEnvelopeFill, BsLockFill } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import UrlService from './services/UrlService'
import axios from "axios"







const SignIn = (props) => {
    const history = useHistory();
    const { register, handleSubmit, errors } = useForm({
        criteriaMode: 'all',
    });

    //Handle Login
    async function onSubmit(data) {
        axios.post(UrlService.loginUrl(), data).then(
            res => {
                if (res.data.user) {
                    localStorage.setItem('access_token', res.data.access_token);
                    props.setUser(res.data.user);
                    history.push('/randomizer')
                }

            }
        ).catch(
            err => {
                console.log(err)
                alert(err.response.data.message)
            }
        )
    }

    return (
        <>
            <Container id='sign-in'>
                <Row className='justify-content-center'>
                    <p className='form-title'>Sign In</p>
                </Row>
                <Row className='justify-content-center paragraph'>
                    <p className='mb-5 form-subtitle'>Let's Get Started</p>
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
                                                ? Object.entries(messages).map(([type, message]) => (
                                                    <p style={{ color: 'red' }} key={type}>
                                                        {message}
                                                    </p>
                                                ))
                                                : null;
                                        }}
                                    />
                                    <BsFillEnvelopeFill className='input-icon' />
                                </div>
                                <Form.Text className='text-muted'></Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='justify-content-center'>
                        <Col lg={5} md={8} sm={10} xs={11}>
                            <Form.Group className='label-text' controlId='formBasicPassword'>
                                <Form.Label className='form-label'>Password</Form.Label>
                                <div className='input-field'>
                                    <Form.Control
                                        className='from-control'
                                        type='password'
                                        placeholder='Enter Password'
                                        name='password'
                                        ref={register({
                                            required: 'This is required.'
                                        })}
                                        required
                                    />
                                    <BsLockFill className='input-icon'></BsLockFill>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mb-4 mt-3'>
                        <Col style={{ textAlign: 'center' }}>
                            <Link
                                to='/password/forgot'
                                style={{
                                    fontSize: '800',
                                }}>
                                Forgotten Password?
                            </Link>
                        </Col>
                    </Row>
                    <Row className='mb-4 mt-3'>
                        <Col style={{ textAlign: 'center' }}>
                            Don't have an account yet?
                            <Link
                                to='/signup'
                                style={{
                                    fontSize: '800',
                                    color: '#52616b',
                                    marginLeft: '5px',
                                    textDecoration: 'none',
                                }}>
                                Sign Up
                            </Link>
                        </Col>
                    </Row>
                    <Row className='mb-4'>
                        <Col style={{ textAlign: 'center' }}>
                            <Button className='sign-button' variant='white' type='submit'>
                                Sign In
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </>
    );
};

export default SignIn;
import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import MainScreen from '../../components/MainScreen/MainScreen';
import axios from 'axios';

const RegisterScreen = () => {
  const [loading, setLoading] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [cnfpassword, setCnfpassword] = useState();
  const [message, setMessage] = useState();
  const [error, setError] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cnfpassword) {
      setMessage('Password do not match');
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };

        setLoading(true);
        const { data } = await axios.post(
          '/api/users',
          {
            name,
            email,
            password,
          },
          config
        );
        localStorage.setItem('userInfo', JSON.stringify(data));
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError('Already Exists');
      }
    }
    // console.log(name, email, password, cnfpassword);
  };

  return (
    <MainScreen title='LOGIN'>
      <div className='loginContainer'>
        {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
        {loading && <Loading />}
        {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              value={name}
              placeholder='Username'
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              value={email}
              placeholder='Enter email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              value={cnfpassword}
              placeholder='Retype-password'
              onChange={(e) => setCnfpassword(e.target.value)}
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
};

export default RegisterScreen;

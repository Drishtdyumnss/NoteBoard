import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../actions/userActions';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loading from '../../components/Loading/Loading';
import MainScreen from '../../components/MainScreen/MainScreen';

const RegisterScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [cnfpassword, setCnfpassword] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) navigate('/mynotes');
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== cnfpassword) setMessage('Passwords do not match');
    else {
      dispatch(register(name, email, password, 'this is pic'));
    }
  };

  return (
    <MainScreen title='REGISTER'>
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

import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <Spinner animation='border' role='status' variant='info'>
      <span className='visually-hidden'></span>
    </Spinner>
  );
};
export default Loading;

import React, { Fragment } from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = (props) => {
  const { variant, children } = props;
  return (
    <Fragment>
      <Alert key={variant} variant={variant}>
        {children}
      </Alert>
    </Fragment>
  );
};

export default ErrorMessage;

import React, { useState } from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './forgotPassword.css';
import { resetErrorMessage, forgotPassword } from '../../store/actions/auth';

function ForgotPassword(props) {
  const [email, setEmail] = useState('');

  function validateForm() {
    return email.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.forgotPassword(email);
  }

  let errorMessage = null;
  let successMessage = null;
  if (props.error) {
    errorMessage = message.error(props.error);
    props.resetErrorMessage();
  }
  if (props.message) {
    successMessage = message.success(props.message);
    props.resetErrorMessage();
  }

  return (
    <div className="ForgotPassword">
      <form onSubmit={handleSubmit}>
        {successMessage}
        {errorMessage}
        <FormGroup controlId="email">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <Button
          block
          disabled={!validateForm() || props.pending}
          type="submit"
          variant="warning"
        >
          {props.pending ? 'Loading…' : 'SEND'}
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = state => ({
  pending: state.authReducer.pending,
  message: state.authReducer.message,
  error: state.authReducer.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      forgotPassword,
      resetErrorMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

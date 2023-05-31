import React, { useState } from 'react';
import styles from '../styles/login.module.css';
import { useToasts } from 'react-toast-notifications';
import {login} from '../api/';

function Login() {
  //custom hook to take form input and set state
  function useFormInput(initialValue){
    const [value, setValue] = useState(initialValue);
    
    const handleChange = (e) => {
      setValue(e.target.value);
    }

    return {
      value,
      onChange: handleChange
    }
  }

  //set the state
  const email = useFormInput('');
  const password = useFormInput('');
  const [loggingIn, setLoggingIn] = useState(false);
  const {addToast} = useToasts();  //hook for setting up notifications

  //function to submit login details from form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggingIn(true);

    //if email/password field is blank display notification
    if(!email.value || !password.value){
      return addToast('Please enter both email and password!', {
        appearance: 'error'
        // autoDismiss: true
      });
    }

    //get the response from login API
    const response = await login(email.value, password.value);

    //if data is fetched successfully
    if(response.success){
      addToast('Logged in successfully!!', {
        appearence: 'success'
      });
    }else{
      addToast(response.message, {
        appearance: 'error'
      });
    }

    setLoggingIn(false);
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
         <input type='email' name='email' placeholder='Enter email' {...email} />
      </div>
      <div className={styles.field}>
        <input type='password' name='password' placeholder='Enter password' {...password} />
      </div>
      <div className={styles.field}>
        <button disabled={loggingIn}> 
          {loggingIn ? 'Logging In...' : 'LogIn'}
        </button>
      </div>
    </form>
  );
}

export default Login;
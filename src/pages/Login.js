import React from 'react';
import styles from '../styles/login.module.css';

function Login() {
  return (
    <form className={styles.loginForm}>
      <span className={styles.loginSignupHeader}>Log In</span>
      <div className={styles.field}>
         <input type='email' name='email' placeholder='Enter email' required />
      </div>
      <div className={styles.field}>
        <input type='password' name='password' placeholder='Enter password' required />
      </div>
      <div className={styles.field}>
        <button>LogIn</button>
      </div>
    </form>
  );
}

export default Login;
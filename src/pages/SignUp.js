import React, {useState} from 'react'
import styles from '../styles/signIn.module.css';
import { useAuth } from '../hooks';
import { useToasts } from 'react-toast-notifications';
import {useNavigate, Navigate} from 'react-router-dom';

function SignUp() {
  //custom hook to set the state of sign up form data
  const useSignupData = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
      setValue(e.target.value);
    }

    return {
      value,
      onChange: handleChange
    }
  }

  //set the states
  const name = useSignupData('');
  const email = useSignupData('');
  const password = useSignupData('');
  const confirmPassword = useSignupData('');
  const [isSigningup, setSigningup] = useState(false);
  const {addToast} = useToasts();  //for notifications
  const navigate = useNavigate();   //for redirecting
  const auth = useAuth();  //for using global states/functions

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSigningup(true);

    let error = false;
    //if any field data is missing
    if(!name.value || !email.value || !password.value || !confirmPassword.value){
      addToast('Please fill all the mandatory fields', {
        appearance: 'error'
      });
      error = true;
    }

    //if password does not match
    if(password.value !== confirmPassword.value && !error){
      addToast('Password do not match!', {
        appearance: 'error'
      });
      error = true;
    }

    if (error) {
      return setSigningup(false);
    }

    //create a mew user object
    const newUser = {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
    };
    //get the response from server after signing up
    const response = await auth.signup(newUser);

    if(response.success){
      console.log(response.data);
      navigate('/login');  //pushes the login page to stack and redirects it
      addToast('Signed up Successfully, Please login to continue!', {
        appearance: 'success'
      });
    }else{
      addToast(`${response.message}`, {
        appearance: 'error'
      });
    }

    setSigningup(false);
  };

  //if user is logged in, login page not accessible(redirect to home)
  if(auth.user){
    return <Navigate replace to='/' />
  }

  return (
    <form className={styles.signupForm} onSubmit={handleSubmit}>
      <span className={styles.signupHeader}>Sign Up</span>
      <div className={styles.field}>
         <input type='text' name='name' placeholder='Enter name' {...name} />
      </div>
      <div className={styles.field}>
         <input type='email' name='email' placeholder='Enter email' {...email} />
      </div>
      <div className={styles.field}>
        <input type='password' name='password' placeholder='Enter password' {...password} />
      </div>
      <div className={styles.field}>
        <input type='password' name='confirm_password' placeholder='Confirm password' {...confirmPassword} />
      </div>
      <div className={styles.field}>
        <button disabled={isSigningup}> 
          {isSigningup ? 'Signing up...' : 'Sign Up'}
        </button>
      </div>
    </form>
  )
}

export default SignUp;
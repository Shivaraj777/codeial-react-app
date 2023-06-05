import React from 'react'
import styles from '../styles/navbar.module.css';
import UserPicture from '../images/man.png';
import {Link} from 'react-router-dom';
import { useAuth } from '../hooks';

function Navbar() {
  const auth = useAuth();

  return (
    <div className={styles.nav}>
      <div className={styles.leftNav}>
        <Link to='/'>
          <img alt='app-logo' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' />
        </Link>
      </div>
      <div className={styles.rightNav}>
        { auth.user && <div className={styles.user}>    {/* if user is logged in show the user details in navbar */}
          <a href='/'>
            <img src={UserPicture} alt='user-dp' className={styles.userDp}/>
          </a>
          <span>{auth.user.name}</span>
        </div> }
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? ( 
              <>
                <li onClick={auth.logout}>
                  <Link to='/'>Logout</Link>
                </li>
              </>) : (
              <>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/sign-up'>Sign Up</Link>
                </li>
              </>)}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;

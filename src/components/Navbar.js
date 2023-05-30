import React from 'react'
import styles from '../styles/navbar.module.css';
import UserPicture from '../images/man.png';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div className={styles.nav}>
      {/* left section of Navbar */}
      <div className={styles.leftNav}>
        <Link to='/'>
          <img alt='app-logo' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' />
        </Link>
      </div>
      {/* right section of nav bar */}
      <div className={styles.rightNav}>
        <div className={styles.user}>
          <a href='/'>
            <img src={UserPicture} alt='user-dp' className={styles.userDp}/>
          </a>
          <span>Shivaraj</span>
        </div>
        <div className={styles.navLinks}>
          <ul>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/'>Logout</Link>
            </li>
            <li>
              <Link to='/'>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;

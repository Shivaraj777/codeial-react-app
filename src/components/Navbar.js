import React from 'react'
import styles from '../styles/navbar.module.css';
import UserPicture from '../images/man.png';

function Navbar() {
  return (
    <div className={styles.nav}>
      {/* left section of Navbar */}
      <div className={styles.leftNav}>
        <a href='/'>
          <img alt='app-logo' src='https://ninjasfiles.s3.amazonaws.com/0000000000003454.png' />
        </a>
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
              <a href='/'>Login</a>
            </li>
            <li>
              <a href='/'>Logout</a>
            </li>
            <li>
              <a href='/'>Register</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar;

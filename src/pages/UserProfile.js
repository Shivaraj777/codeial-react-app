import React from 'react'
import styles from '../styles/settings.module.css';
import UserPicture from '../images/man.png';
import { useLocation } from 'react-router-dom';
// import { useAuth } from '../hooks';
// import {useToasts} from 'react-toast-notifications';
// import {Navigate} from 'react-router-dom';

function UserProfile() {
  //set the state
  const location = useLocation(); //get the details passed as state in Link component and store in location
  console.log(location);
  const {user} = location.state ? location.state : {};

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src={UserPicture} alt='profile-pic' />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div> {/* Shorthand for ternary operator*/}
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>  
      </div>
      <div className={styles.btnGrp}>
        <button className={`button ${styles.saveBtn}`}>Add Friend</button>
        <button className={`button ${styles.saveBtn}`}>Remove Friend</button>
      </div>
    </div>
  )
}

export default UserProfile;
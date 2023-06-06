import React, {useState} from 'react'
import styles from '../styles/settings.module.css';
import UserPicture from '../images/man.png';
import { useAuth } from '../hooks';

function Settings() {
  //set the state
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src={UserPicture} alt='profile-pic' />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div> {/* Shorthand for ternary operator*/}
      </div>
      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {!editMode ? 
          <div className={styles.fieldValue}>{auth.user?.name}</div>  : 
          <input type='text' name='name' value={name} onChange={(e) => {setName(e.target.value)}} />
        }
      </div>
      {editMode && (  //if editMode is enabled user should be able to update the details
      <>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Password</div>
          <input type='password' name='password' placeholder='Enter new password' value={password} onChange={(e) => {setPassword(e.target.value)}} />
        </div>
        <div className={styles.field}>
          <div className={styles.fieldLabel}>Confirm Password</div>
          <input type='password' name='confirm-password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} />
        </div>
      </>)}
      <div className={styles.btnGrp}>
        {editMode ? (
        <>
          <button class={`button ${styles.saveBtn}`}>
            {savingForm ? 'Saving Profile...' : 'Save Profile'}
          </button>
          <button class={`button ${styles.goBack}`} onClick={() => {setEditMode(false)}}>Discard</button>
        </>) : (
        <>
          <button class={`button ${styles.editBtn}`} onClick={() => {setEditMode(true)}}>Edit Profile</button>
        </>)}
      </div>
    </div>
  )
}

export default Settings;
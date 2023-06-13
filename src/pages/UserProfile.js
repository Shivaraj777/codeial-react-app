import React, { useEffect, useState } from 'react'
import styles from '../styles/settings.module.css';
import UserPicture from '../images/man.png';
import { useParams, useNavigate } from 'react-router-dom';
import { addFriend, getUserProfile, unFriend } from '../api';
import {useToasts} from 'react-toast-notifications';
import { Loader } from '../components';
import { useAuth } from '../hooks';
// import {Navigate} from 'react-router-dom';
// import { useLocation } from 'react-router-dom';


function UserProfile() {
  //set the state
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);  //for enabling/disabling buttons
  const {userId} = useParams();   //get the params from url
  const {addToast} = useToasts();
  const navigate = useNavigate();   //used to navigate to the required page
  const auth = useAuth();

  //side Effect for fetching user data
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUserProfile(userId);

      if(response.success){
        setUser(response.data.user);
        setLoading(false);
      }else{
        addToast(response.message, {
          appearance: 'error'
        });
        return navigate('/');
      }
    }

    getUserInfo();
    // setLoading(false);
  }, [userId, addToast, navigate]);

  //check if the user is friend of logged-in user
  const checkFriendShip = () => {
    const friends = auth.user.friends;
    const friendsId = friends.map((friend) => friend.to_user._id);
    const index = friendsId.indexOf(userId);
    // console.log(index);

    return (index === -1) ? false : true;
  }
  const isFriend = checkFriendShip();

  //function to add a friend
  const handleAddFriendClick = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);

    if(response.success){
      const {friendship} = response.data;
      auth.updateUserFriends(true, friendship);
      addToast('Friend added successfully!', {
        appearance: 'success'
      });
    }else{
      addToast(response.message, {
        appearance: 'error'
      });
    }

    setRequestInProgress(false);
  }

  //function to remove a friend
  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);
    const response = await unFriend(userId);

    if(response.success){
      const friendship = auth.user.friends.filter((friend) => friend.to_user._id === userId);
      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend removed successfully!', {
        appearance: 'success'
      });
    }else{
      addToast(response.message, {
        appearance: 'error'
      });
    }

    setRequestInProgress(false);
  }

  //const location = useLocation(); //get the details passed as state in Link component and store in location
  // console.log(location);
  // const {user} = location.state ? location.state : {};

  if(loading){
    return <Loader />;
  }

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
        {!(userId === auth.user._id) && (!isFriend ? 
          <button className={`button ${styles.saveBtn}`} onClick={handleAddFriendClick} disabled={requestInProgress}>
            {requestInProgress ? 'Adding Friend...' : 'Add Friend'}
          </button> : 
          <button className={`button ${styles.saveBtn}`} onClick={handleRemoveFriendClick} disabled={requestInProgress}>
            {requestInProgress ? 'Removing Friend...' : 'Remove Friend'}
          </button>)
        }
      </div>
    </div>
  )
}

export default UserProfile;
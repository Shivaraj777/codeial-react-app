import React from 'react'
import styles from '../styles/home.module.css';
import { useAuth } from '../hooks';
import { Link } from 'react-router-dom';
import FriendPicture from '../images/man.png';

function FriendsList() {
  const auth = useAuth();
  const {friends = []} = auth.user; //if friends array is empty, an empty friends array will be created

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>No Friends found!</div>
      )}

      {friends && friends.map((friend) => 
        <div key={`friend-${friend._id}`}>
          <Link className={styles.friendsItem} to={`/users/${friend.to_user._id}`}>
            <div className={styles.friendsImg}>
              <img src={FriendPicture} alt='friend-img' />
            </div>
            <div className={styles.friendsName}>{friend.to_user.name}</div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default FriendsList;
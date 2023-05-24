import React from 'react'
import styles from '../styles/home.module.css';
import UserPicture from '../images/man.png';
import Like from '../images/heart.png';
import Comment from '../images/chat-bubble.png';

function Home() {
  return (
    <div className={styles.postsList}>
      <div className={styles.postWrapper}>
        <div className={styles.postHeader}>
          <div className={styles.postAvatar}>
            <img
              src={UserPicture}
              alt="user-pic"
            />
            <div>
              <span className={styles.postAuthor}>Shivaraj</span>
              <span className={styles.postTime}>a minute ago</span>
            </div>
          </div>
          <div className={styles.postContent}>Post Content</div>

          <div className={styles.postActions}>
            <div className={styles.postLike}>
              <img
                src={Like}
                alt="likes-icon"
              />
              <span>5</span>
            </div>

            <div className={styles.postCommentsIcon}>
              <img
                src={Comment}
                alt="comments-icon"
              />
              <span>2</span>
            </div>
          </div>
          <div className={styles.postCommentBox}>
            <input placeholder="Start typing a comment" />
          </div>

          <div className={styles.postCommentsList}>
            <div className={styles.postCommentsItem}>
              <div className={styles.postCommentHeader}>
                <span className={styles.postCommentAuthor}>Bill</span>
                <span className={styles.postCommentTime}>a minute ago</span>
                <span className={styles.postCommentLikes}>22</span>
              </div>

              <div className={styles.postCommentContent}>Random comment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;